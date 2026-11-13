(() => {
  'use strict';

  const { PUZZLES, LOCATIONS } = window.NIGHTFALL_DATA;

  const MAX_GUESSES = 6;
  const BASE_ZOOM = 8; // 1x crop at z=8, zooming out 1 level per wrong guess (2x linear)
  const SPAN_PX_AT_ZOOM = 360;
  const CANVAS_SIZE = 512;
  const EARTH_CIRCUMFERENCE_KM = 40075.017;
  const STORAGE_KEY = 'nightfall_save_v1';
  const EPOCH_DATE_UTC = Date.UTC(2026, 0, 1);

  const NASA_VIIRS_URL = (z, y, x) =>
    `https://gibs.earthdata.nasa.gov/wmts/epsg3857/best/VIIRS_CityLights_2012/default/2012-04-19/GoogleMapsCompatible_Level8/${z}/${y}/${x}.jpg`;
  const CARTO_DARK_URL = (z, y, x) =>
    `https://basemaps.cartocdn.com/dark_all/${z}/${x}/${y}.png`;

  // DOM References
  const canvas = document.getElementById('nightfall-canvas');
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  const offscreenCanvas = document.createElement('canvas');
  offscreenCanvas.width = CANVAS_SIZE;
  offscreenCanvas.height = CANVAS_SIZE;
  const offCtx = offscreenCanvas.getContext('2d', { willReadFrequently: true });

  const viewportSquare = document.getElementById('viewport-square');
  const puzzleBadge = document.getElementById('puzzle-badge');
  const zoomReadout = document.getElementById('zoom-readout');
  const spanReadout = document.getElementById('span-readout');
  const scaleBarLabel = document.getElementById('scale-bar-label');
  const satSourceTag = document.getElementById('sat-source-tag');
  const spectrumPill = document.getElementById('spectrum-pill');
  const spectrumLabel = document.getElementById('spectrum-label');
  const zoomStepBtns = Array.from(document.querySelectorAll('.zoom-step'));

  const guessSection = document.getElementById('guess-section');
  const guessForm = document.getElementById('guess-form');
  const attemptLabel = document.getElementById('attempt-label');
  const skipZoomBtn = document.getElementById('skip-zoom-btn');
  const guessInput = document.getElementById('guess-input');
  const suggestionsList = document.getElementById('suggestions-list');
  const guessError = document.getElementById('guess-error');

  const revealCard = document.getElementById('reveal-card');
  const revealStatusBadge = document.getElementById('reveal-status-badge');
  const revealCoords = document.getElementById('reveal-coords');
  const revealTitle = document.getElementById('reveal-title');
  const revealMeta = document.getElementById('reveal-meta');
  const revealExplanation = document.getElementById('reveal-explanation');
  const shareBtn = document.getElementById('share-btn');
  const toggleContextBtn = document.getElementById('toggle-context-btn');
  const nextPuzzleBtn = document.getElementById('next-puzzle-btn');

  const guessesList = document.getElementById('guesses-list');
  const toastEl = document.getElementById('toast');

  const statsDialog = document.getElementById('stats-dialog');
  const archiveDialog = document.getElementById('archive-dialog');
  const archiveList = document.getElementById('archive-list');
  const playDailyBtn = document.getElementById('play-daily-btn');
  const playRandomBtn = document.getElementById('play-random-btn');

  // State
  let saveStore = loadSaveStore();
  let currentPuzzle = getDailyPuzzle();
  let isDailyMode = true;
  let roundState = getOrCreateRoundState(currentPuzzle.id);

  let viewedStep = getInitialViewedStep();
  let animatedZoom = BASE_ZOOM - viewedStep;
  let zoomAnimRaf = null;
  let isGuessingActive = false;
  let showMapContext = false;

  let filteredSuggestions = [];
  let activeSuggestionIdx = -1;
  let selectedCandidate = null;
  let toastTimer = null;

  // Tile Cache
  const viirsTileCache = new Map();
  const contextTileCache = new Map();
  let viirsCorsBlocked = false;

  // Deduplicated search index
  const SEARCH_ITEMS = buildSearchIndex();

  function buildSearchIndex() {
    const seen = new Set();
    const items = [];
    for (const loc of LOCATIONS) {
      const key = `${loc.name.toLowerCase()}|${loc.country.toLowerCase()}`;
      if (seen.has(key)) continue;
      seen.add(key);
      items.push(loc);
    }
    return items;
  }

  function getTodayKey() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  function getDailyNumber() {
    const now = new Date();
    const todayUtc = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    const diffDays = Math.max(0, Math.floor((todayUtc - EPOCH_DATE_UTC) / 86400000));
    return diffDays + 1;
  }

  function getDailyPuzzle() {
    const dayNum = getDailyNumber();
    const idx = (dayNum - 1) % PUZZLES.length;
    return PUZZLES[idx];
  }

  function loadSaveStore() {
    const fallback = {
      stats: {
        played: 0,
        won: 0,
        streak: 0,
        bestStreak: 0,
        distribution: [0, 0, 0, 0, 0, 0],
        lastCompletedDaily: null,
      },
      rounds: {},
    };
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return fallback;
      const parsed = JSON.parse(raw);
      return {
        stats: { ...fallback.stats, ...(parsed.stats || {}) },
        rounds: parsed.rounds || {},
      };
    } catch {
      return fallback;
    }
  }

  function persistSaveStore() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(saveStore));
    } catch {
      // Ignore storage quota errors in restricted browsing contexts
    }
  }

  function roundKey(puzzleId) {
    return isDailyMode && puzzleId === getDailyPuzzle().id
      ? `daily:${getTodayKey()}:${puzzleId}`
      : `archive:${puzzleId}`;
  }

  function getOrCreateRoundState(puzzleId) {
    const key = roundKey(puzzleId);
    if (!saveStore.rounds[key]) {
      saveStore.rounds[key] = {
        puzzleId,
        guesses: [],
        status: 'playing', // 'playing' | 'won' | 'lost'
      };
    }
    return saveStore.rounds[key];
  }

  function getUnlockedMaxStep() {
    if (roundState.status !== 'playing') return MAX_GUESSES - 1;
    return Math.min(MAX_GUESSES - 1, roundState.guesses.length);
  }

  function getInitialViewedStep() {
    if (roundState.status === 'won') {
      return Math.min(MAX_GUESSES - 1, Math.max(0, roundState.guesses.length - 1));
    }
    return getUnlockedMaxStep();
  }

  // --- Geodesy & Web Mercator Math ---
  function toRad(deg) {
    return (deg * Math.PI) / 180;
  }

  function haversineKm(lat1, lon1, lat2, lon2) {
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return 2 * R * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  function compassBearing(lat1, lon1, lat2, lon2) {
    const phi1 = toRad(lat1);
    const phi2 = toRad(lat2);
    const dLam = toRad(lon2 - lon1);
    const y = Math.sin(dLam) * Math.cos(phi2);
    const x =
      Math.cos(phi1) * Math.sin(phi2) -
      Math.sin(phi1) * Math.cos(phi2) * Math.cos(dLam);
    const deg = ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
    const dirs = [
      { label: 'N', arrow: '↑' },
      { label: 'NE', arrow: '↗' },
      { label: 'E', arrow: '→' },
      { label: 'SE', arrow: '↘' },
      { label: 'S', arrow: '↓' },
      { label: 'SW', arrow: '↙' },
      { label: 'W', arrow: '←' },
      { label: 'NW', arrow: '↖' },
    ];
    const idx = Math.round(deg / 45) % 8;
    return dirs[idx];
  }

  function latLonToWorldPx(lat, lon, z) {
    const scale = 256 * Math.pow(2, z);
    const x = ((lon + 180) / 360) * scale;
    const clampedLat = Math.max(-85.05112878, Math.min(85.05112878, lat));
    const sinLat = Math.sin(toRad(clampedLat));
    const y =
      (0.5 - Math.log((1 + sinLat) / (1 - sinLat)) / (4 * Math.PI)) * scale;
    return [x, y];
  }

  function formatCoords(lat, lon) {
    const latHem = lat >= 0 ? 'N' : 'S';
    const lonHem = lon >= 0 ? 'E' : 'W';
    return `${Math.abs(lat).toFixed(2)}° ${latHem}, ${Math.abs(lon).toFixed(2)}° ${lonHem}`;
  }

  // --- Seeded PRNG for Procedural Satellite Light Details ---
  function mulberry32(seed) {
    let a = seed >>> 0;
    return function () {
      let t = (a += 0x6d2b79f5);
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function getTileEntry(cache, urlBuilder, z, y, x, useCors) {
    const key = `${z}/${y}/${x}`;
    const existing = cache.get(key);
    if (existing) return existing;

    const entry = { status: 'loading', img: null };
    cache.set(key, entry);

    const img = new Image();
    if (useCors) img.crossOrigin = 'anonymous';
    img.decoding = 'async';
    img.onload = () => {
      entry.status = 'loaded';
      entry.img = img;
      scheduleRender();
    };
    img.onerror = () => {
      entry.status = 'error';
      scheduleRender();
    };
    img.src = urlBuilder(z, y, x);
    return entry;
  }

  let renderQueued = false;
  function scheduleRender() {
    if (renderQueued) return;
    renderQueued = true;
    requestAnimationFrame(() => {
      renderQueued = false;
      renderViewport();
    });
  }

  function animateToZoom(targetZoom) {
    if (zoomAnimRaf) cancelAnimationFrame(zoomAnimRaf);
    const startZoom = animatedZoom;
    const delta = targetZoom - startZoom;
    if (Math.abs(delta) < 0.005) {
      animatedZoom = targetZoom;
      renderViewport();
      return;
    }

    const duration = 560;
    const startTime = performance.now();

    function tick(now) {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      animatedZoom = startZoom + delta * eased;
      renderViewport();
      if (t < 1) {
        zoomAnimRaf = requestAnimationFrame(tick);
      } else {
        animatedZoom = targetZoom;
        zoomAnimRaf = null;
        renderViewport();
      }
    }

    zoomAnimRaf = requestAnimationFrame(tick);
  }

  /**
   * Transform NASA VIIRS tiles into pitch-black background + vintage yellow/white light pollution.
   */
  function applyNightfallShader(imageData, yellowMode, boostYellow) {
    const d = imageData.data;
    const boost = boostYellow ? 1.18 : 1.0;

    for (let i = 0; i < d.length; i += 4) {
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];

      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      const warmth = Math.max(0, (r + g) * 0.5 - b);
      const signal = Math.max(lum - 26, warmth * 1.45 - 15);

      if (signal <= 2) {
        d[i] = 0;
        d[i + 1] = 0;
        d[i + 2] = 0;
        d[i + 3] = 255;
        continue;
      }

      const t = Math.min(1, Math.pow(signal / 172, 0.76) * boost);

      if (yellowMode) {
        // Vintage amber -> saturated yellow -> warm white-yellow metropolitan cores
        if (t < 0.45) {
          const u = t / 0.45;
          d[i] = Math.round(215 * u);
          d[i + 1] = Math.round(145 * u);
          d[i + 2] = Math.round(14 * u);
        } else if (t < 0.82) {
          const u = (t - 0.45) / 0.37;
          d[i] = Math.round(215 + 40 * u);
          d[i + 1] = Math.round(145 + 75 * u);
          d[i + 2] = Math.round(14 + 62 * u);
        } else {
          const u = (t - 0.82) / 0.18;
          d[i] = 255;
          d[i + 1] = Math.round(220 + 28 * u);
          d[i + 2] = Math.round(76 + 148 * u);
        }
      } else {
        // Warm vintage white-gold post-reveal
        d[i] = Math.round(255 * Math.min(1, t * 1.08));
        d[i + 1] = Math.round(244 * t);
        d[i + 2] = Math.round(205 * Math.pow(t, 1.15));
      }
      d[i + 3] = 255;
    }
    return imageData;
  }

  /**
   * Procedural satellite light synthesizer: ensures crisp, multi-scale city clusters,
   * corridors, and global neighbor cities render immediately while NASA tiles load or offline.
   */
  function renderProceduralLights(targetCtx, minX, minY, spanWorldPx, tileZ, yellowMode, boostYellow) {
    targetCtx.fillStyle = '#000000';
    targetCtx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    const project = (lat, lon) => {
      const [wx, wy] = latLonToWorldPx(lat, lon, tileZ);
      return [
        ((wx - minX) / spanWorldPx) * CANVAS_SIZE,
        ((wy - minY) / spanWorldPx) * CANVAS_SIZE,
      ];
    };

    const kmPerPx =
      (spanWorldPx / (256 * Math.pow(2, tileZ))) *
      EARTH_CIRCUMFERENCE_KM *
      Math.cos(toRad(currentPuzzle.lat)) /
      CANVAS_SIZE;

    const drawGlowSpot = (px, py, radiusPx, intensity) => {
      if (px < -radiusPx * 2 || px > CANVAS_SIZE + radiusPx * 2 || py < -radiusPx * 2 || py > CANVAS_SIZE + radiusPx * 2) {
        return;
      }
      const r = Math.max(1.2, radiusPx);
      const grad = targetCtx.createRadialGradient(px, py, 0, px, py, r);
      const alpha = Math.min(1, intensity * (boostYellow ? 1.16 : 1));
      if (yellowMode) {
        grad.addColorStop(0, `rgba(255, 248, 212, ${alpha})`);
        grad.addColorStop(0.28, `rgba(255, 224, 110, ${alpha * 0.88})`);
        grad.addColorStop(0.65, `rgba(235, 168, 28, ${alpha * 0.36})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      } else {
        grad.addColorStop(0, `rgba(255, 252, 240, ${alpha})`);
        grad.addColorStop(0.35, `rgba(255, 228, 138, ${alpha * 0.72})`);
        grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }
      targetCtx.fillStyle = grad;
      targetCtx.beginPath();
      targetCtx.arc(px, py, r, 0, Math.PI * 2);
      targetCtx.fill();
    };

    targetCtx.save();
    targetCtx.globalCompositeOperation = 'lighter';

    const rng = mulberry32(currentPuzzle.id * 9187 + 1337);
    const { hubs = [], filaments = [] } = currentPuzzle.morphology || {};

    // 1. Filaments (rivers, coastlines, rail strings, highways) with beaded micro-settlements
    for (const line of filaments) {
      for (let i = 0; i < line.length - 1; i++) {
        const [latA, lonA] = line[i];
        const [latB, lonB] = line[i + 1];
        const steps = 16;
        for (let s = 0; s <= steps; s++) {
          const u = s / steps;
          const lat = latA + (latB - latA) * u + (rng() - 0.5) * 0.05;
          const lon = lonA + (lonB - lonA) * u + (rng() - 0.5) * 0.05;
          const [px, py] = project(lat, lon);
          const beadR = (3.8 + rng() * 5.5) / Math.max(0.35, kmPerPx);
          drawGlowSpot(px, py, Math.min(18, Math.max(1.3, beadR)), 0.18 + rng() * 0.24);
        }
      }
    }

    // 2. Primary puzzle urban hubs + satellite towns scatter
    for (const [hLat, hLon, strength, radiusKm] of hubs) {
      const [hx, hy] = project(hLat, hLon);
      const radiusPx = Math.min(84, Math.max(2.2, radiusKm / kmPerPx));
      drawGlowSpot(hx, hy, radiusPx, strength * 0.92);
      drawGlowSpot(hx, hy, radiusPx * 0.38, Math.min(1, strength * 1.1));

      // Satellite suburb speckles around each hub
      const subCount = Math.round(10 * strength);
      for (let k = 0; k < subCount; k++) {
        const ang = rng() * Math.PI * 2;
        const distDeg = (0.04 + rng() * 0.32) * (radiusKm / 18);
        const sLat = hLat + Math.sin(ang) * distDeg * 0.8;
        const sLon = hLon + Math.cos(ang) * distDeg;
        const [sx, sy] = project(sLat, sLon);
        drawGlowSpot(sx, sy, Math.max(1.2, radiusPx * (0.14 + rng() * 0.2)), strength * (0.28 + rng() * 0.35));
      }
    }

    // 3. Neighboring global cities from gazetteer so 4x..32x zoom-outs show real neighboring clusters
    for (const loc of LOCATIONS) {
      if (loc.puzzleId === currentPuzzle.id) continue;
      const dist = haversineKm(currentPuzzle.lat, currentPuzzle.lon, loc.lat, loc.lon);
      if (dist < 45) continue;
      const [lx, ly] = project(loc.lat, loc.lon);
      if (lx < -30 || lx > CANVAS_SIZE + 30 || ly < -30 || ly > CANVAS_SIZE + 30) continue;
      const cityR = Math.min(26, Math.max(1.6, 13 / kmPerPx));
      drawGlowSpot(lx, ly, cityR, 0.55);
      // Tiny nearby constellation
      const localRng = mulberry32(Math.abs(Math.round(loc.lat * 1000 + loc.lon * 777)));
      for (let j = 0; j < 4; j++) {
        const dx = (localRng() - 0.5) * cityR * 1.9;
        const dy = (localRng() - 0.5) * cityR * 1.9;
        drawGlowSpot(lx + dx, ly + dy, Math.max(1.1, cityR * 0.35), 0.25);
      }
    }

    targetCtx.restore();
  }

  function renderViewport() {
    const zFloat = animatedZoom;
    const tileZ = Math.max(2, Math.min(8, Math.ceil(zFloat)));
    const zoomDelta = tileZ - zFloat;
    const spanWorldPx = SPAN_PX_AT_ZOOM * Math.pow(2, zoomDelta);
    const halfSpan = spanWorldPx / 2;

    const [cx, cy] = latLonToWorldPx(currentPuzzle.lat, currentPuzzle.lon, tileZ);
    const minX = cx - halfSpan;
    const maxX = cx + halfSpan;
    const minY = cy - halfSpan;
    const maxY = cy + halfSpan;

    const nTiles = Math.pow(2, tileZ);
    const txMin = Math.floor(minX / 256);
    const txMax = Math.floor(maxX / 256);
    const tyMin = Math.max(0, Math.floor(minY / 256));
    const tyMax = Math.min(nTiles - 1, Math.floor(maxY / 256));

    // Fetch NASA GIBS VIIRS tiles
    let allLoaded = true;
    let anyError = false;
    const tileRecords = [];

    for (let ty = tyMin; ty <= tyMax; ty++) {
      for (let tx = txMin; tx <= txMax; tx++) {
        const wrappedTx = ((tx % nTiles) + nTiles) % nTiles;
        const entry = getTileEntry(viirsTileCache, NASA_VIIRS_URL, tileZ, ty, wrappedTx, !viirsCorsBlocked);
        if (entry.status === 'loading') allLoaded = false;
        if (entry.status === 'error') anyError = true;
        tileRecords.push({ tx, ty, entry });
      }
    }

    const yellowMode = roundState.status === 'playing' || !showMapContext;
    const boostYellow = roundState.status === 'playing' && isGuessingActive;

    // 1. Optional post-game dark map context layer underneath
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    if (roundState.status !== 'playing' && showMapContext) {
      for (let ty = tyMin; ty <= tyMax; ty++) {
        for (let tx = txMin; tx <= txMax; tx++) {
          const wrappedTx = ((tx % nTiles) + nTiles) % nTiles;
          const mapEntry = getTileEntry(contextTileCache, CARTO_DARK_URL, tileZ, ty, wrappedTx, true);
          if (mapEntry.status === 'loaded' && mapEntry.img) {
            const dx = ((tx * 256 - minX) / spanWorldPx) * CANVAS_SIZE;
            const dy = ((ty * 256 - minY) / spanWorldPx) * CANVAS_SIZE;
            const dw = (256 / spanWorldPx) * CANVAS_SIZE;
            ctx.globalAlpha = 0.85;
            ctx.drawImage(mapEntry.img, dx, dy, dw, dw);
            ctx.globalAlpha = 1;
          }
        }
      }
    }

    // 2. Render NASA VIIRS tiles if available & loaded; otherwise crisp procedural synthesizer
    if (allLoaded && !anyError && !viirsCorsBlocked) {
      offCtx.fillStyle = '#000000';
      offCtx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
      for (const rec of tileRecords) {
        if (!rec.entry.img) continue;
        const dx = ((rec.tx * 256 - minX) / spanWorldPx) * CANVAS_SIZE;
        const dy = ((rec.ty * 256 - minY) / spanWorldPx) * CANVAS_SIZE;
        const dw = (256 / spanWorldPx) * CANVAS_SIZE;
        offCtx.drawImage(rec.entry.img, dx, dy, dw, dw);
      }

      try {
        const imgData = offCtx.getImageData(0, 0, CANVAS_SIZE, CANVAS_SIZE);
        applyNightfallShader(imgData, yellowMode, boostYellow);
        offCtx.putImageData(imgData, 0, 0);

        ctx.save();
        if (roundState.status !== 'playing' && showMapContext) {
          ctx.globalCompositeOperation = 'screen';
        }
        ctx.drawImage(offscreenCanvas, 0, 0);
        ctx.restore();
        satSourceTag.textContent = 'VIIRS · NASA GIBS';
      } catch {
        viirsCorsBlocked = true;
        renderProceduralLights(offCtx, minX, minY, spanWorldPx, tileZ, yellowMode, boostYellow);
        ctx.save();
        if (roundState.status !== 'playing' && showMapContext) {
          ctx.globalCompositeOperation = 'screen';
        }
        ctx.drawImage(offscreenCanvas, 0, 0);
        ctx.restore();
        satSourceTag.textContent = 'VIIRS · SYNTH';
      }
    } else {
      renderProceduralLights(offCtx, minX, minY, spanWorldPx, tileZ, yellowMode, boostYellow);
      ctx.save();
      if (roundState.status !== 'playing' && showMapContext) {
        ctx.globalCompositeOperation = 'screen';
      }
      ctx.drawImage(offscreenCanvas, 0, 0);
      ctx.restore();
      satSourceTag.textContent = anyError ? 'VIIRS · OFFLINE' : 'VIIRS · STREAM';
    }

    // 3. Post-game target & guess telemetry vectors on canvas
    if (roundState.status !== 'playing') {
      drawPostGameMarkers(minX, minY, spanWorldPx, tileZ);
    }

    updateScaleTelemetry(zFloat);
  }

  function drawPostGameMarkers(minX, minY, spanWorldPx, tileZ) {
    const project = (lat, lon) => {
      const [wx, wy] = latLonToWorldPx(lat, lon, tileZ);
      return [
        ((wx - minX) / spanWorldPx) * CANVAS_SIZE,
        ((wy - minY) / spanWorldPx) * CANVAS_SIZE,
      ];
    };

    const [tx, ty] = project(currentPuzzle.lat, currentPuzzle.lon);

    ctx.save();
    // Lines from guesses to target
    roundState.guesses.forEach((g, idx) => {
      if (g.skipped || typeof g.lat !== 'number') return;
      const [gx, gy] = project(g.lat, g.lon);
      ctx.strokeStyle = g.isWin ? 'rgba(184, 224, 108, 0.7)' : 'rgba(244, 239, 225, 0.35)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.beginPath();
      ctx.moveTo(gx, gy);
      ctx.lineTo(tx, ty);
      ctx.stroke();
      ctx.setLineDash([]);

      // Guess pin
      ctx.fillStyle = g.isWin ? '#b8e06c' : '#f4efe1';
      ctx.beginPath();
      ctx.arc(gx, gy, 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = '600 11px "DM Mono", monospace';
      ctx.fillStyle = '#030303';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(String(idx + 1), gx, gy + 0.5);
    });

    // Target reticle
    ctx.strokeStyle = '#ffe885';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(tx, ty, 12, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(tx, ty, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffe885';
    ctx.fill();
    ctx.restore();
  }

  function updateScaleTelemetry(zFloat) {
    const spanKm = Math.max(
      10,
      Math.round(
        (SPAN_PX_AT_ZOOM / (256 * Math.pow(2, zFloat))) *
          EARTH_CIRCUMFERENCE_KM *
          Math.cos(toRad(currentPuzzle.lat))
      )
    );
    const barKm = Math.max(5, Math.round((spanKm * (46 / 512)) / 5) * 5);
    const factor = Math.pow(2, viewedStep);
    zoomReadout.textContent = viewedStep === 0 ? '1× CROP' : `${factor}× ZOOM OUT`;
    spanReadout.textContent = `~${spanKm.toLocaleString()} KM SPAN`;
    scaleBarLabel.textContent = `${barKm.toLocaleString()} KM`;
  }

  // --- UI Rendering ---
  function renderUI() {
    const daily = getDailyPuzzle();
    if (isDailyMode && currentPuzzle.id === daily.id) {
      puzzleBadge.textContent = `#${String(getDailyNumber()).padStart(3, '0')} · DAILY`;
    } else {
      puzzleBadge.textContent = `#${String(currentPuzzle.id).padStart(3, '0')} · ARCHIVE`;
    }

    const maxUnlocked = getUnlockedMaxStep();
    zoomStepBtns.forEach((btn, idx) => {
      const unlocked = idx <= maxUnlocked;
      btn.disabled = !unlocked;
      btn.classList.toggle('is-unlocked', unlocked);
      btn.classList.toggle('is-active', idx === viewedStep);
    });

    // Spectrum indicator
    const guessingBoost = roundState.status === 'playing' && isGuessingActive;
    viewportSquare.classList.toggle('is-guessing', guessingBoost);
    spectrumPill.classList.toggle('is-boosted', guessingBoost);
    spectrumLabel.textContent = guessingBoost
      ? 'GUESSING · +YELLOW'
      : roundState.status === 'playing'
      ? 'YELLOW SPECTRUM'
      : showMapContext
      ? 'BORDER OVERLAY'
      : 'YELLOW SPECTRUM';

    // Form vs Reveal card
    const isPlaying = roundState.status === 'playing';
    guessSection.hidden = !isPlaying;
    revealCard.hidden = isPlaying;

    if (isPlaying) {
      const nextNum = roundState.guesses.length + 1;
      attemptLabel.textContent = `GUESS ${nextNum} OF ${MAX_GUESSES}`;
      skipZoomBtn.hidden = nextNum >= MAX_GUESSES;
    } else {
      const won = roundState.status === 'won';
      revealStatusBadge.textContent = won
        ? `FINGERPRINT MATCHED · ${roundState.guesses.length}/${MAX_GUESSES}`
        : 'SIGNAL LOST · TARGET REVEALED';
      revealStatusBadge.classList.toggle('is-loss', !won);
      revealCoords.textContent = formatCoords(currentPuzzle.lat, currentPuzzle.lon);
      revealTitle.textContent = currentPuzzle.name;
      revealMeta.textContent = `${currentPuzzle.country} · ${currentPuzzle.region} · ${currentPuzzle.patternTag}`;
      revealExplanation.textContent = currentPuzzle.explanation;
      toggleContextBtn.setAttribute('aria-pressed', String(showMapContext));
      toggleContextBtn.textContent = showMapContext ? 'Map Borders: On' : 'Map Borders: Off';
    }

    renderGuessesList();
  }

  function renderGuessesList() {
    guessesList.innerHTML = '';
    for (let i = 0; i < MAX_GUESSES; i++) {
      const li = document.createElement('li');
      const g = roundState.guesses[i];

      if (!g) {
        li.className = 'guess-row is-empty';
        const idxSpan = document.createElement('span');
        idxSpan.className = 'guess-idx';
        idxSpan.textContent = String(i + 1).padStart(2, '0');

        const emptySpan = document.createElement('span');
        emptySpan.className = 'guess-empty-label';
        emptySpan.textContent =
          i === 0 ? '1× CROP · AWAITING GUESS' : `${Math.pow(2, i)}× ZOOM OUT`;

        li.append(idxSpan, emptySpan);
      } else {
        li.className = `guess-row${g.isWin ? ' is-win' : ''}`;
        const idxSpan = document.createElement('span');
        idxSpan.className = 'guess-idx';
        idxSpan.textContent = String(i + 1).padStart(2, '0');

        const nameSpan = document.createElement('span');
        nameSpan.className = 'guess-name';
        nameSpan.textContent = g.skipped ? 'Zoomed out 2× (Skipped)' : g.name;

        const distSpan = document.createElement('span');
        distSpan.className = 'guess-dist';
        distSpan.textContent = g.skipped
          ? '—'
          : g.isWin
          ? `${Math.round(g.distanceKm)} km`
          : `${Math.round(g.distanceKm).toLocaleString()} km`;

        const dirSpan = document.createElement('span');
        dirSpan.className = `guess-dir${g.isWin ? ' is-match' : ''}`;
        dirSpan.textContent = g.skipped
          ? `→ ${Math.pow(2, Math.min(MAX_GUESSES - 1, i + 1))}×`
          : g.isWin
          ? '✓ MATCH'
          : `${g.arrow} ${g.dir}`;

        li.append(idxSpan, nameSpan, distSpan, dirSpan);
      }
      guessesList.appendChild(li);
    }
  }

  // --- Guessing & Search Logic ---
  function normalizeStr(s) {
    return s
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }

  function findSuggestions(query) {
    const q = normalizeStr(query);
    if (!q) return [];

    const scored = [];
    for (const loc of SEARCH_ITEMS) {
      const nName = normalizeStr(loc.name);
      const nCountry = normalizeStr(loc.country);
      const nRegion = normalizeStr(loc.region);
      const aliases = (loc.aliases || []).map(normalizeStr);

      let score = -1;
      if (nName === q) score = 100;
      else if (nName.startsWith(q)) score = 85;
      else if (nName.includes(q)) score = 70;
      else if (aliases.some((a) => a.startsWith(q))) score = 60;
      else if (aliases.some((a) => a.includes(q)) || nCountry.startsWith(q)) score = 50;
      else if (nCountry.includes(q) || nRegion.includes(q)) score = 30;

      if (score > 0) scored.push({ loc, score });
    }

    scored.sort((a, b) => b.score - a.score || a.loc.name.localeCompare(b.loc.name));
    return scored.slice(0, 8).map((s) => s.loc);
  }

  function renderSuggestions() {
    suggestionsList.innerHTML = '';
    if (filteredSuggestions.length === 0) {
      suggestionsList.hidden = true;
      guessInput.setAttribute('aria-expanded', 'false');
      activeSuggestionIdx = -1;
      return;
    }

    filteredSuggestions.forEach((loc, idx) => {
      const li = document.createElement('li');
      li.className = 'suggestion-item';
      li.role = 'option';
      li.id = `sugg-opt-${idx}`;
      li.setAttribute('aria-selected', String(idx === activeSuggestionIdx));

      const nameEl = document.createElement('span');
      nameEl.textContent = loc.name;

      const metaEl = document.createElement('span');
      metaEl.className = 'suggestion-region';
      metaEl.textContent = loc.country === loc.name ? loc.region : loc.country;

      li.append(nameEl, metaEl);

      li.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Keep focus until click fires
      });
      li.addEventListener('click', () => {
        selectSuggestion(loc);
        guessInput.focus();
      });
      suggestionsList.appendChild(li);
    });

    suggestionsList.hidden = false;
    guessInput.setAttribute('aria-expanded', 'true');
  }

  function selectSuggestion(loc) {
    selectedCandidate = loc;
    guessInput.value = loc.name;
    filteredSuggestions = [];
    activeSuggestionIdx = -1;
    renderSuggestions();
    clearError();
  }

  function clearError() {
    guessError.textContent = '';
    guessInput.classList.remove('has-error');
  }

  function showError(msg) {
    guessError.textContent = msg;
    guessInput.classList.add('has-error');
  }

  function isCorrectMatch(loc, puzzle) {
    if (loc.puzzleId === puzzle.id) return true;
    const dist = haversineKm(loc.lat, loc.lon, puzzle.lat, puzzle.lon);
    if (dist <= (puzzle.winRadiusKm || 230)) return true;

    const qName = normalizeStr(loc.name);
    const aliases = (puzzle.aliases || []).map(normalizeStr);
    return aliases.includes(qName);
  }

  function submitLocationGuess(loc) {
    if (roundState.status !== 'playing') return;

    const dist = haversineKm(loc.lat, loc.lon, currentPuzzle.lat, currentPuzzle.lon);
    const bearing = compassBearing(loc.lat, loc.lon, currentPuzzle.lat, currentPuzzle.lon);
    const isWin = isCorrectMatch(loc, currentPuzzle);

    roundState.guesses.push({
      name: loc.name,
      lat: loc.lat,
      lon: loc.lon,
      distanceKm: dist,
      dir: bearing.label,
      arrow: bearing.arrow,
      isWin,
      skipped: false,
    });

    finalizeTurn(isWin);
  }

  function skipAndZoomOut() {
    if (roundState.status !== 'playing') return;
    if (roundState.guesses.length >= MAX_GUESSES - 1) return;

    roundState.guesses.push({
      name: 'Zoomed out',
      skipped: true,
      isWin: false,
    });
    finalizeTurn(false);
  }

  function finalizeTurn(isWin) {
    guessInput.value = '';
    selectedCandidate = null;
    filteredSuggestions = [];
    renderSuggestions();
    clearError();

    if (isWin) {
      roundState.status = 'won';
      recordStats(true, roundState.guesses.length);
    } else if (roundState.guesses.length >= MAX_GUESSES) {
      roundState.status = 'lost';
      recordStats(false, MAX_GUESSES);
    } else {
      // Wrong guess zooms out 2x
      viewedStep = getUnlockedMaxStep();
      animateToZoom(BASE_ZOOM - viewedStep);
    }

    persistSaveStore();
    renderUI();
    renderViewport();
  }

  function recordStats(won, guessesCount) {
    const s = saveStore.stats;
    s.played += 1;
    if (won) {
      s.won += 1;
      s.streak += 1;
      if (s.streak > s.bestStreak) s.bestStreak = s.streak;
      s.distribution[guessesCount - 1] += 1;
    } else {
      s.streak = 0;
    }
  }

  // --- Dialogs & Share ---
  function renderStatsDialog() {
    const s = saveStore.stats;
    document.getElementById('stat-played').textContent = String(s.played);
    document.getElementById('stat-win-pct').textContent =
      s.played > 0 ? `${Math.round((s.won / s.played) * 100)}%` : '0%';
    document.getElementById('stat-streak').textContent = String(s.streak);
    document.getElementById('stat-best-streak').textContent = String(s.bestStreak);

    const barsContainer = document.getElementById('dist-bars');
    barsContainer.innerHTML = '';
    const maxVal = Math.max(1, ...s.distribution);

    s.distribution.forEach((count, idx) => {
      const row = document.createElement('div');
      row.className = 'dist-row';

      const lbl = document.createElement('span');
      lbl.textContent = `${Math.pow(2, idx)}×`;

      const track = document.createElement('div');
      track.className = 'dist-track';

      const fill = document.createElement('div');
      fill.className = 'dist-fill';
      fill.style.inlineSize = `${Math.max(8, Math.round((count / maxVal) * 100))}%`;
      fill.textContent = String(count);

      track.appendChild(fill);
      row.append(lbl, track);
      barsContainer.appendChild(row);
    });
  }

  function renderArchiveDialog() {
    const daily = getDailyPuzzle();
    archiveList.innerHTML = '';

    PUZZLES.forEach((p) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = `archive-btn${p.id === currentPuzzle.id ? ' is-current' : ''}`;

      const archRound = saveStore.rounds[`archive:${p.id}`];
      const dailyRound =
        p.id === daily.id ? saveStore.rounds[`daily:${getTodayKey()}:${p.id}`] : null;
      const done = archRound?.status === 'won' || dailyRound?.status === 'won';
      const failed = archRound?.status === 'lost' || dailyRound?.status === 'lost';

      const left = document.createElement('span');
      left.className = 'archive-title';
      left.textContent =
        done || failed || p.id === currentPuzzle.id && roundState.status !== 'playing'
          ? `#${String(p.id).padStart(2, '0')} · ${p.name}`
          : `#${String(p.id).padStart(2, '0')} · ${p.patternTag}`;

      const right = document.createElement('span');
      right.className = 'archive-tag';
      right.textContent = done
        ? '✓ SOLVED'
        : failed
        ? '✕ REVEALED'
        : p.id === daily.id
        ? 'TODAY'
        : 'PLAY';

      btn.append(left, right);
      btn.addEventListener('click', () => {
        loadPuzzle(p, p.id === daily.id);
        archiveDialog.close();
      });

      li.appendChild(btn);
      archiveList.appendChild(li);
    });
  }

  function loadPuzzle(puzzle, dailyFlag = false) {
    currentPuzzle = puzzle;
    isDailyMode = dailyFlag;
    roundState = getOrCreateRoundState(puzzle.id);
    showMapContext = false;
    viewedStep = getInitialViewedStep();
    animatedZoom = BASE_ZOOM - viewedStep;
    selectedCandidate = null;
    guessInput.value = '';
    clearError();
    renderSuggestions();
    renderUI();
    renderViewport();
  }

  function showToast(message) {
    toastEl.textContent = message;
    toastEl.hidden = false;
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.hidden = true;
    }, 2400);
  }

  async function shareResult() {
    const won = roundState.status === 'won';
    const score = won ? `${roundState.guesses.length}/${MAX_GUESSES}` : `X/${MAX_GUESSES}`;
    const blocks = roundState.guesses
      .map((g) => (g.isWin ? '🟡' : '⬛'))
      .join('');
    const label = isDailyMode ? `Daily #${getDailyNumber()}` : `Archive #${currentPuzzle.id}`;
    const text = `Nightfall (${label}) ${score}\n${blocks}\nLight Pollution Fingerprints`;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(text);
        showToast('Result copied to clipboard');
      } else {
        showToast(text);
      }
    } catch {
      showToast('Copy failed — screenshot telemetry');
    }
  }

  // --- Event Listeners ---
  zoomStepBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const step = Number(btn.dataset.step);
      if (step <= getUnlockedMaxStep()) {
        viewedStep = step;
        renderUI();
        animateToZoom(BASE_ZOOM - step);
      }
    });
  });

  guessInput.addEventListener('focus', () => {
    isGuessingActive = true;
    renderUI();
    renderViewport();
  });

  guessInput.addEventListener('blur', () => {
    setTimeout(() => {
      isGuessingActive = false;
      renderUI();
      renderViewport();
      // Validate on blur only if user typed non-matching text
      const val = guessInput.value.trim();
      if (val && !selectedCandidate && findSuggestions(val).length === 0) {
        showError('No matching city, region, or country found.');
      }
    }, 200);
  });

  document.addEventListener('pointerdown', (e) => {
    if (!e.target.closest('.combobox-wrap')) {
      if (!suggestionsList.hidden) {
        filteredSuggestions = [];
        renderSuggestions();
      }
    }
  });

  guessInput.addEventListener('input', () => {
    selectedCandidate = null;
    clearError();
    filteredSuggestions = findSuggestions(guessInput.value);
    activeSuggestionIdx = filteredSuggestions.length > 0 ? 0 : -1;
    renderSuggestions();
  });

  guessInput.addEventListener('keydown', (e) => {
    if (suggestionsList.hidden || filteredSuggestions.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeSuggestionIdx = (activeSuggestionIdx + 1) % filteredSuggestions.length;
      renderSuggestions();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeSuggestionIdx =
        (activeSuggestionIdx - 1 + filteredSuggestions.length) % filteredSuggestions.length;
      renderSuggestions();
    } else if (e.key === 'Escape') {
      filteredSuggestions = [];
      renderSuggestions();
    } else if (e.key === 'Enter' && activeSuggestionIdx >= 0) {
      e.preventDefault();
      const chosen = filteredSuggestions[activeSuggestionIdx];
      selectSuggestion(chosen);
      submitLocationGuess(chosen);
    }
  });

  guessForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (roundState.status !== 'playing') return;

    if (selectedCandidate) {
      submitLocationGuess(selectedCandidate);
      return;
    }

    const raw = guessInput.value.trim();
    if (!raw) {
      showError('Enter a city, region, or country before guessing.');
      guessInput.focus();
      return;
    }

    const matches = findSuggestions(raw);
    if (matches.length === 0) {
      showError('Location not recognized. Pick a suggestion from the list.');
      guessInput.focus();
      return;
    }

    const exact = matches.find((m) => normalizeStr(m.name) === normalizeStr(raw));
    const chosen = exact || matches[0];
    selectSuggestion(chosen);
    submitLocationGuess(chosen);
  });

  skipZoomBtn.addEventListener('click', skipAndZoomOut);

  shareBtn.addEventListener('click', shareResult);

  toggleContextBtn.addEventListener('click', () => {
    showMapContext = !showMapContext;
    renderUI();
    renderViewport();
  });

  nextPuzzleBtn.addEventListener('click', () => {
    const candidates = PUZZLES.filter((p) => p.id !== currentPuzzle.id);
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    loadPuzzle(pick, false);
  });

  playDailyBtn.addEventListener('click', () => {
    loadPuzzle(getDailyPuzzle(), true);
    archiveDialog.close();
  });

  playRandomBtn.addEventListener('click', () => {
    const unsolved = PUZZLES.filter((p) => {
      const r = saveStore.rounds[`archive:${p.id}`];
      return p.id !== currentPuzzle.id && (!r || r.status === 'playing');
    });
    const pool = unsolved.length > 0 ? unsolved : PUZZLES.filter((p) => p.id !== currentPuzzle.id);
    const pick = pool[Math.floor(Math.random() * pool.length)];
    loadPuzzle(pick, false);
    archiveDialog.close();
  });

  // Refresh dialog contents when opened
  document.querySelector('button[commandfor="stats-dialog"]').addEventListener('click', renderStatsDialog);
  document.querySelector('button[commandfor="archive-dialog"]').addEventListener('click', renderArchiveDialog);

  // --- Modern Web Guidance Fallbacks ---
  // 1. <dialog closedby="any"> fallback for browsers without native closedBy support
  if (!('closedBy' in HTMLDialogElement.prototype)) {
    document.querySelectorAll('dialog').forEach((dialog) => {
      dialog.addEventListener('click', (event) => {
        if (event.target !== dialog) return;
        const rect = dialog.getBoundingClientRect();
        const isDialogContent =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (isDialogContent) return;
        dialog.close();
      });
    });
  }

  // 2. Invoker Commands (commandfor / command) fallback for browsers lacking commandForElement
  if (!('commandForElement' in HTMLButtonElement.prototype)) {
    import('https://esm.run/invokers-polyfill').catch(() => {
      // Offline / CSP fallback handled cleanly by delegated listener below
    });
    document.addEventListener('click', (event) => {
      if ('commandForElement' in HTMLButtonElement.prototype) return;
      const button = event.composedPath().find((el) => el.matches?.('button[commandfor]'));
      if (!button) return;
      const target = document.getElementById(button.getAttribute('commandfor'));
      const command = button.getAttribute('command');
      if (!target || !command) return;
      if (command === 'show-modal' && typeof target.showModal === 'function') {
        target.showModal();
      } else if (command === 'close' && typeof target.close === 'function') {
        target.close();
      }
    });
  }

  // Initial Boot
  renderUI();
  renderViewport();
})();
