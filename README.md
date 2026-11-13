# Nightfall — Light Pollution Fingerprints

**Nightfall** is a minimalist, mobile-first daily geography game where players identify world regions purely from human light pollution patterns.

## Gameplay
- **Pitch-Black Crop:** Start with a tight `1×` nighttime satellite crop showing only glowing yellow and vintage-white light pollution—no borders, coastlines, or labels.
- **2× Zoom-Out Mechanics:** Every wrong guess gives Haversine distance and compass bearing telemetry and zooms out by **2×** (`1×` → `2×` → `4×` → `8×` → `16×` → `32×`), gradually revealing surrounding darkness and neighboring settlement clusters.
- **Yellow Spectrum Guessing:** Settlement lights glow in vintage yellow during guessing and intensify while typing or selecting a region.
- **Daily & Archive Modes:** Features 30 curated light-pollution fingerprints (river deltas, transcontinental railways, mountain-rimmed basins, offshore gas flares, and coastal corridors) plus a 240+ location global gazetteer.

## Imagery & Architecture
- **Satellite Tiles:** Streams NASA GIBS `VIIRS_CityLights_2012` Web Mercator (`EPSG:3857`) tiles and applies an offscreen canvas pixel shader (`applyNightfallShader`) to crush ocean/land background noise to pure `#000000` black and color-grade urban luminosity in vintage yellow and warm white.
- **Procedural Fallback:** Includes a seeded multi-scale procedural light synthesizer (`renderProceduralLights`) so the viewport remains sharp and playable instantaneously while tiles stream or when offline.
- **Zero-Build Static App:** Pure HTML, CSS, and vanilla JavaScript (`index.html`, `styles.css`, `puzzles.js`, `app.js`).

## Local Development
Serve the directory with any static HTTP server:

```sh
python3 -m http.server 8123
```

Then open `http://localhost:8123` in your browser.
