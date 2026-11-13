/**
 * Nightfall — Curated Light Pollution Fingerprints & World Gazetteer
 * Coordinates use WGS84 (lat, lon).
 */

const PUZZLES = [
  {
    id: 1,
    slug: 'nile-river-delta',
    name: 'Nile River & Delta',
    country: 'Egypt',
    region: 'North Africa',
    lat: 30.45,
    lon: 31.15,
    winRadiusKm: 250,
    patternTag: 'River Valley & Delta',
    aliases: ['Egypt', 'Cairo', 'Nile', 'Nile Delta', 'Nile Valley', 'Alexandria'],
    explanation:
      'Nearly 95% of Egypt’s population lives within a narrow ribbon along the Nile and its triangular delta. Seen from orbit, Cairo forms the blazing stem of a glowing lotus leaf floating in the pitch-black Sahara.',
    morphology: {
      hubs: [
        [30.04, 31.24, 1.0, 26], // Cairo
        [31.20, 29.92, 0.72, 18], // Alexandria
        [30.79, 31.00, 0.62, 16], // Tanta
        [31.04, 31.38, 0.56, 15], // Mansoura
        [30.59, 31.50, 0.50, 14], // Zagazig
        [29.31, 30.84, 0.42, 12], // Faiyum
        [27.18, 31.18, 0.45, 13], // Asyut
        [25.69, 32.64, 0.36, 10], // Luxor
        [31.26, 32.30, 0.44, 11], // Port Said
      ],
      filaments: [
        // Nile stem south
        [[30.04, 31.24], [29.07, 31.10], [28.11, 30.75], [27.18, 31.18], [26.56, 31.70], [25.69, 32.64], [24.09, 32.90]],
        // Rosetta & Damietta Delta branches + coastal arc
        [[30.15, 31.15], [30.79, 31.00], [31.20, 29.92]],
        [[30.15, 31.25], [30.59, 31.50], [31.04, 31.38], [31.42, 31.81]],
        [[31.20, 29.92], [31.42, 31.00], [31.42, 31.81], [31.26, 32.30]],
      ],
    },
  },
  {
    id: 2,
    slug: 'trans-siberian-corridor',
    name: 'Trans-Siberian Railway (Novosibirsk–Krasnoyarsk)',
    country: 'Russia',
    region: 'Siberia, Eurasia',
    lat: 55.55,
    lon: 87.20,
    winRadiusKm: 320,
    patternTag: 'Transcontinental Rail String',
    aliases: ['Russia', 'Siberia', 'Novosibirsk', 'Krasnoyarsk', 'Kemerovo', 'Tomsk', 'Trans-Siberian Railway'],
    explanation:
      'Across the vast darkness of Siberia, cities bead along the Trans-Siberian Railway like pearls on an incandescent wire. Branch spurs connect coal and industrial basins in Kemerovo and Tomsk while surrounding taiga stays completely dark.',
    morphology: {
      hubs: [
        [55.01, 82.93, 0.92, 22], // Novosibirsk
        [56.49, 84.95, 0.60, 15], // Tomsk
        [55.35, 86.09, 0.68, 16], // Kemerovo
        [53.76, 87.12, 0.62, 15], // Novokuznetsk
        [56.01, 92.85, 0.85, 20], // Krasnoyarsk
        [56.27, 90.50, 0.40, 11], // Achinsk
        [55.00, 73.37, 0.78, 18], // Omsk
      ],
      filaments: [
        [[55.00, 73.37], [55.35, 78.30], [55.01, 82.93], [55.68, 84.40], [56.06, 86.06], [56.21, 87.75], [56.27, 90.50], [56.01, 92.85], [55.80, 95.70]],
        [[55.68, 84.40], [56.49, 84.95]],
        [[55.80, 85.60], [55.35, 86.09], [53.76, 87.12]],
      ],
    },
  },
  {
    id: 3,
    slug: 'java-island-belt',
    name: 'Java Island Volcanic Belt',
    country: 'Indonesia',
    region: 'Southeast Asia',
    lat: -7.02,
    lon: 109.15,
    winRadiusKm: 280,
    patternTag: 'Saturated Volcanic Island',
    aliases: ['Indonesia', 'Java', 'Jakarta', 'Bandung', 'Semarang', 'Surabaya', 'Yogyakarta'],
    explanation:
      'Home to over 150 million people, Java glows end-to-end as a dense volcanic island chain bordered sharply by dark equatorial seas. Strings of towns weave around dark circular cones where steep volcanoes rise above cultivated valleys.',
    morphology: {
      hubs: [
        [-6.21, 106.85, 1.0, 28], // Jakarta
        [-6.91, 107.61, 0.82, 20], // Bandung
        [-6.73, 108.56, 0.56, 14], // Cirebon
        [-6.97, 110.42, 0.72, 18], // Semarang
        [-7.80, 110.36, 0.68, 17], // Yogyakarta
        [-7.57, 110.82, 0.64, 16], // Surakarta
        [-7.25, 112.75, 0.90, 23], // Surabaya
        [-7.98, 112.63, 0.60, 15], // Malang
      ],
      filaments: [
        [[-6.12, 106.15], [-6.21, 106.85], [-6.73, 108.56], [-6.87, 109.13], [-6.97, 110.42], [-6.89, 111.65], [-7.25, 112.75]],
        [[-6.21, 106.85], [-6.91, 107.61], [-7.33, 108.22], [-7.43, 109.24], [-7.80, 110.36], [-7.57, 110.82], [-7.63, 111.52], [-7.25, 112.75]],
      ],
    },
  },
  {
    id: 4,
    slug: 'po-river-valley',
    name: 'Po River Valley (Padan Plain)',
    country: 'Italy',
    region: 'Southern Europe',
    lat: 45.28,
    lon: 9.85,
    winRadiusKm: 220,
    patternTag: 'Alpine-Rimmed Basin',
    aliases: ['Italy', 'Milan', 'Turin', 'Bologna', 'Venice', 'Verona', 'Po Valley', 'Northern Italy'],
    explanation:
      'The Po Valley forms an unmistakable glowing triangle bounded to the north and west by the pitch-black wall of the Alps. Industrial corridors linking Turin, Milan, Verona, Venice, and Bologna trace historic Roman roads across the flat plain.',
    morphology: {
      hubs: [
        [45.46, 9.19, 1.0, 26], // Milan
        [45.07, 7.69, 0.80, 20], // Turin
        [45.69, 9.67, 0.64, 16], // Bergamo
        [45.54, 10.21, 0.62, 15], // Brescia
        [45.44, 10.99, 0.60, 15], // Verona
        [45.41, 11.88, 0.62, 15], // Padua
        [45.44, 12.32, 0.56, 14], // Venice
        [44.49, 11.34, 0.68, 17], // Bologna
        [44.41, 8.93, 0.54, 14], // Genoa
      ],
      filaments: [
        [[45.07, 7.69], [45.46, 9.19], [45.69, 9.67], [45.54, 10.21], [45.44, 10.99], [45.41, 11.88], [45.44, 12.32]],
        [[45.46, 9.19], [45.05, 9.70], [44.80, 10.33], [44.65, 10.92], [44.49, 11.34], [44.06, 12.57]],
        [[45.07, 7.69], [44.91, 8.61], [44.41, 8.93]],
      ],
    },
  },
  {
    id: 5,
    slug: 'northeast-megalopolis',
    name: 'Northeast Megalopolis (BosWash)',
    country: 'United States',
    region: 'North America',
    lat: 40.42,
    lon: -74.45,
    winRadiusKm: 240,
    patternTag: 'Atlantic Coastal Corridor',
    aliases: ['United States', 'USA', 'New York', 'NYC', 'Philadelphia', 'Boston', 'Washington DC', 'New Jersey', 'Baltimore'],
    explanation:
      'Running northeast along the Atlantic fall line from Washington to Boston, this continuous urban chain illuminates one of Earth’s brightest coastal corridors. Dark water cuts cleanly along Long Island Sound, Delaware Bay, and the Atlantic shore.',
    morphology: {
      hubs: [
        [40.71, -74.01, 1.0, 32], // NYC
        [39.95, -75.16, 0.88, 24], // Philadelphia
        [39.29, -76.61, 0.72, 18], // Baltimore
        [38.91, -77.04, 0.85, 22], // Washington DC
        [42.36, -71.06, 0.82, 21], // Boston
        [41.31, -72.92, 0.56, 15], // New Haven
        [41.82, -71.41, 0.58, 15], // Providence
        [40.60, -75.49, 0.55, 14], // Allentown
      ],
      filaments: [
        [[38.91, -77.04], [39.29, -76.61], [39.74, -75.54], [39.95, -75.16], [40.22, -74.76], [40.71, -74.01], [41.31, -72.92], [41.82, -71.41], [42.36, -71.06]],
        [[40.71, -74.01], [40.82, -73.12], [40.92, -72.66]],
      ],
    },
  },
  {
    id: 6,
    slug: 'indo-gangetic-plain',
    name: 'Indo-Gangetic Plain (Delhi–Agra)',
    country: 'India',
    region: 'South Asia',
    lat: 28.45,
    lon: 77.65,
    winRadiusKm: 280,
    patternTag: 'Himalayan Foothill Plain',
    aliases: ['India', 'New Delhi', 'Delhi', 'Agra', 'Jaipur', 'Lucknow', 'Chandigarh', 'Uttar Pradesh'],
    explanation:
      'Hundreds of millions of people blanket the fertile alluvial plains of the Yamuna and Ganges rivers in an immense galaxy of towns. Just to the northeast, light stops dead against the jagged wall of the Himalayas and Tibetan Plateau.',
    morphology: {
      hubs: [
        [28.61, 77.21, 1.0, 30], // Delhi
        [28.98, 77.71, 0.62, 16], // Meerut
        [27.18, 78.01, 0.68, 18], // Agra
        [26.91, 75.79, 0.72, 18], // Jaipur
        [30.73, 76.78, 0.64, 16], // Chandigarh
        [30.90, 75.86, 0.60, 15], // Ludhiana
        [26.45, 80.33, 0.70, 18], // Kanpur
        [26.85, 80.95, 0.74, 19], // Lucknow
      ],
      filaments: [
        [[30.90, 75.86], [30.34, 76.38], [29.39, 76.97], [28.61, 77.21], [27.89, 78.08], [27.18, 78.01], [26.45, 80.33], [26.85, 80.95]],
        [[28.61, 77.21], [28.98, 77.71], [29.95, 78.16], [30.32, 78.03]],
        [[28.61, 77.21], [27.56, 76.63], [26.91, 75.79]],
      ],
    },
  },
  {
    id: 7,
    slug: 'korean-peninsula-dmz',
    name: 'Korean Peninsula & DMZ',
    country: 'South Korea',
    region: 'East Asia',
    lat: 37.55,
    lon: 127.08,
    winRadiusKm: 230,
    patternTag: 'Geopolitical Light Cliff',
    aliases: ['South Korea', 'Korea', 'Seoul', 'Incheon', 'Busan', 'Pyongyang', 'DMZ'],
    explanation:
      'Perhaps Earth’s starkest nighttime contrast: South Korea blazes like a bright island disconnected from mainland Asia. Immediately north of Seoul’s sprawling ring, the Demilitarized Zone drops abruptly into near-total darkness.',
    morphology: {
      hubs: [
        [37.57, 126.98, 1.0, 29], // Seoul
        [37.46, 126.71, 0.80, 20], // Incheon
        [37.26, 127.03, 0.74, 18], // Suwon
        [36.35, 127.38, 0.64, 16], // Daejeon
        [35.87, 128.60, 0.68, 17], // Daegu
        [35.18, 129.08, 0.84, 21], // Busan
        [35.16, 126.85, 0.56, 14], // Gwangju
        [39.04, 125.76, 0.22, 8], // Pyongyang (dim)
      ],
      filaments: [
        [[37.57, 126.98], [37.26, 127.03], [36.81, 127.15], [36.35, 127.38], [36.12, 128.34], [35.87, 128.60], [35.18, 129.08]],
        [[36.35, 127.38], [35.82, 127.15], [35.16, 126.85]],
      ],
    },
  },
  {
    id: 8,
    slug: 'pearl-river-delta',
    name: 'Pearl River Delta (Greater Bay)',
    country: 'China',
    region: 'East Asia',
    lat: 22.72,
    lon: 113.68,
    winRadiusKm: 210,
    patternTag: 'Hyper-Luminous Estuary Web',
    aliases: ['China', 'Hong Kong', 'Shenzhen', 'Guangzhou', 'Macau', 'Dongguan', 'Zhuhai', 'Greater Bay Area'],
    explanation:
      'Guangzhou, Dongguan, Shenzhen, Hong Kong, and Macau fuse into a single super-bright estuarine ring wrapping the Pearl River mouth. Dark wooded hills carve sharp shadows right inside the heart of the megacity.',
    morphology: {
      hubs: [
        [23.13, 113.26, 0.96, 25], // Guangzhou
        [23.02, 113.75, 0.88, 22], // Dongguan
        [22.54, 114.06, 0.98, 25], // Shenzhen
        [22.32, 114.17, 0.94, 23], // Hong Kong
        [23.02, 113.12, 0.78, 19], // Foshan
        [22.52, 113.38, 0.68, 16], // Zhongshan
        [22.27, 113.58, 0.62, 15], // Zhuhai/Macau
        [23.11, 114.42, 0.62, 15], // Huizhou
      ],
      filaments: [
        [[23.13, 113.26], [23.02, 113.75], [22.54, 114.06], [22.32, 114.17]],
        [[23.13, 113.26], [23.02, 113.12], [22.52, 113.38], [22.27, 113.58]],
      ],
    },
  },
  {
    id: 9,
    slug: 'strait-of-gibraltar',
    name: 'Strait of Gibraltar & Costa del Sol',
    country: 'Spain / Morocco',
    region: 'Mediterranean / North Africa',
    lat: 36.12,
    lon: -5.42,
    winRadiusKm: 210,
    patternTag: 'Intercontinental Strait',
    aliases: ['Spain', 'Morocco', 'Gibraltar', 'Tangier', 'Malaga', 'Marbella', 'Ceuta', 'Cadiz'],
    explanation:
      'Two continents face each other across a 14-kilometer dark channel of water. Bright coastal beads trace Spain’s Costa del Sol and Cádiz Bay to the north while Tangier and Tétouan trace Morocco’s Rif coast to the south.',
    morphology: {
      hubs: [
        [36.14, -5.35, 0.66, 15], // Gibraltar / Algeciras
        [36.72, -4.42, 0.88, 22], // Malaga
        [36.51, -4.88, 0.66, 16], // Marbella
        [36.53, -6.29, 0.64, 15], // Cadiz
        [35.76, -5.83, 0.78, 19], // Tangier
        [35.59, -5.36, 0.56, 14], // Tetouan / Ceuta
        [37.39, -5.98, 0.84, 21], // Seville
      ],
      filaments: [
        [[36.72, -4.42], [36.51, -4.88], [36.42, -5.15], [36.14, -5.35], [36.53, -6.29]],
        [[35.76, -5.83], [35.89, -5.31], [35.59, -5.36], [35.17, -5.27]],
      ],
    },
  },
  {
    id: 10,
    slug: 'buenos-aires-pampas',
    name: 'Buenos Aires & Pampas Spokes',
    country: 'Argentina',
    region: 'South America',
    lat: -34.62,
    lon: -58.48,
    winRadiusKm: 240,
    patternTag: 'Radial Highway Spokes',
    aliases: ['Argentina', 'Buenos Aires', 'La Plata', 'Rosario', 'Uruguay', 'Montevideo'],
    explanation:
      'Pinned cleanly against the dark funnel of the Río de la Plata estuary, Buenos Aires radiates straight golden highway spokes across the flat Pampas grasslands like a half-cut spiderweb.',
    morphology: {
      hubs: [
        [-34.60, -58.38, 1.0, 30], // Buenos Aires
        [-34.92, -57.95, 0.68, 16], // La Plata
        [-34.42, -58.95, 0.50, 12], // Pilar / Lujan
        [-32.95, -60.64, 0.76, 18], // Rosario
        [-34.90, -56.16, 0.68, 16], // Montevideo (across estuary)
      ],
      filaments: [
        [[-34.60, -58.38], [-34.05, -59.03], [-33.33, -60.22], [-32.95, -60.64]],
        [[-34.60, -58.38], [-34.56, -59.10], [-34.58, -60.95]],
        [[-34.60, -58.38], [-35.02, -59.26], [-35.56, -60.17]],
        [[-34.60, -58.38], [-34.92, -57.95], [-35.58, -58.01], [-38.00, -57.54]],
      ],
    },
  },
  {
    id: 11,
    slug: 'flemish-diamond-randstad',
    name: 'Benelux Highway Lattice (Randstad–Flanders)',
    country: 'Netherlands / Belgium',
    region: 'Western Europe',
    lat: 51.55,
    lon: 4.55,
    winRadiusKm: 220,
    patternTag: 'Lit Motorway Network',
    aliases: ['Netherlands', 'Belgium', 'Amsterdam', 'Rotterdam', 'Brussels', 'Antwerp', 'The Hague', 'Utrecht', 'Benelux'],
    explanation:
      'Belgium and the Netherlands illuminate nearly every kilometer of motorway, weaving Antwerp, Brussels, Rotterdam, and Amsterdam into Europe’s brightest highway lattice, dotted offshore by bright North Sea shipping and platforms.',
    morphology: {
      hubs: [
        [52.37, 4.90, 0.92, 22], // Amsterdam
        [51.92, 4.48, 0.90, 22], // Rotterdam
        [52.07, 4.30, 0.78, 18], // The Hague
        [52.09, 5.12, 0.74, 17], // Utrecht
        [51.22, 4.40, 0.88, 22], // Antwerp
        [50.85, 4.35, 0.94, 24], // Brussels
        [51.05, 3.72, 0.68, 16], // Ghent
        [51.44, 5.47, 0.72, 17], // Eindhoven
      ],
      filaments: [
        [[52.37, 4.90], [52.07, 4.30], [51.92, 4.48], [51.22, 4.40], [50.85, 4.35]],
        [[52.37, 4.90], [52.09, 5.12], [51.44, 5.47], [50.85, 5.69]],
        [[51.22, 4.40], [51.05, 3.72], [50.63, 3.06]],
        [[50.85, 4.35], [50.63, 5.57]],
      ],
    },
  },
  {
    id: 12,
    slug: 'honshu-taiheiyo-belt',
    name: 'Taiheiyō Belt (Tokyo–Fuji–Nagoya)',
    country: 'Japan',
    region: 'East Asia',
    lat: 35.38,
    lon: 138.75,
    winRadiusKm: 230,
    patternTag: 'Mountain-Carved Megalopolis',
    aliases: ['Japan', 'Tokyo', 'Yokohama', 'Nagoya', 'Shizuoka', 'Osaka', 'Mount Fuji', 'Honshu'],
    explanation:
      'Tokyo Bay forms a colossal glowing basin bounded by the Pacific Ocean and sharp mountain walls. Tracing westward along Suruga Bay, coastal cities wrap cleanly around the perfectly dark circle of Mount Fuji.',
    morphology: {
      hubs: [
        [35.68, 139.77, 1.0, 34], // Tokyo
        [35.44, 139.64, 0.88, 24], // Yokohama
        [35.61, 140.11, 0.74, 18], // Chiba
        [35.86, 139.65, 0.78, 19], // Saitama
        [35.10, 138.86, 0.56, 14], // Numazu
        [34.98, 138.38, 0.66, 16], // Shizuoka
        [34.71, 137.73, 0.64, 16], // Hamamatsu
        [35.18, 136.91, 0.92, 25], // Nagoya
      ],
      filaments: [
        [[35.68, 139.77], [35.44, 139.64], [35.25, 139.15], [35.10, 138.86], [34.98, 138.38], [34.71, 137.73], [35.18, 136.91]],
        [[35.68, 139.77], [35.66, 138.57], [36.23, 137.97]],
      ],
    },
  },
  {
    id: 13,
    slug: 'persian-gulf-flares',
    name: 'Persian Gulf Coast (Abu Dhabi–Dubai)',
    country: 'United Arab Emirates',
    region: 'Middle East',
    lat: 24.85,
    lon: 54.85,
    winRadiusKm: 220,
    patternTag: 'Desert Coast & Offshore Flares',
    aliases: ['United Arab Emirates', 'UAE', 'Dubai', 'Abu Dhabi', 'Sharjah', 'Qatar', 'Doha', 'Persian Gulf'],
    explanation:
      'Ultra-bright linear coastal strips trace artificial islands and expressways between Abu Dhabi, Dubai, and Sharjah. Out in the pitch-black Persian Gulf, solitary pinpricks mark offshore oil platforms and gas flares.',
    morphology: {
      hubs: [
        [25.20, 55.27, 0.98, 24], // Dubai
        [24.45, 54.38, 0.88, 21], // Abu Dhabi
        [25.35, 55.42, 0.76, 17], // Sharjah
        [24.21, 55.74, 0.56, 13], // Al Ain
        [25.79, 55.94, 0.48, 11], // Ras Al Khaimah
        // Offshore gas flares
        [25.05, 53.55, 0.45, 5],
        [25.55, 53.95, 0.42, 4],
        [24.85, 52.88, 0.44, 5],
        [25.29, 51.53, 0.84, 19], // Doha
      ],
      filaments: [
        [[24.45, 54.38], [24.85, 54.85], [25.20, 55.27], [25.35, 55.42], [25.79, 55.94]],
        [[24.45, 54.38], [24.21, 55.74]],
        [[25.20, 55.27], [24.21, 55.74]],
      ],
    },
  },
  {
    id: 14,
    slug: 'fergana-valley',
    name: 'Fergana Valley',
    country: 'Uzbekistan / Kyrgyzstan',
    region: 'Central Asia',
    lat: 40.68,
    lon: 71.75,
    winRadiusKm: 230,
    patternTag: 'Mountain-Locked Oasis Bowl',
    aliases: ['Uzbekistan', 'Kyrgyzstan', 'Tajikistan', 'Fergana', 'Andijan', 'Namangan', 'Tashkent', 'Osh'],
    explanation:
      'Cradled high between the Tian Shan and Pamir-Alay ranges, the Fergana Valley glows like a self-contained almond-shaped constellation. Outside its irrigated perimeter, high alpine peaks plunge straight into Central Asian darkness.',
    morphology: {
      hubs: [
        [40.78, 72.34, 0.76, 16], // Andijan
        [41.00, 71.67, 0.74, 16], // Namangan
        [40.38, 71.78, 0.72, 15], // Fergana
        [40.53, 70.94, 0.64, 14], // Kokand
        [40.53, 72.80, 0.62, 14], // Osh
        [40.28, 69.62, 0.58, 13], // Khujand
        [41.30, 69.24, 0.88, 22], // Tashkent
      ],
      filaments: [
        [[40.28, 69.62], [40.53, 70.94], [40.38, 71.78], [40.78, 72.34], [40.53, 72.80]],
        [[40.53, 70.94], [41.00, 71.67], [40.78, 72.34]],
        [[41.30, 69.24], [40.85, 69.60], [40.53, 70.94]],
      ],
    },
  },
  {
    id: 15,
    slug: 'florida-peninsula',
    name: 'South Florida & Peninsula Outline',
    country: 'United States',
    region: 'North America',
    lat: 26.85,
    lon: -80.95,
    winRadiusKm: 240,
    patternTag: 'Hollow Coastal Peninsula',
    aliases: ['United States', 'USA', 'Florida', 'Miami', 'Tampa', 'Orlando', 'Fort Lauderdale', 'Naples'],
    explanation:
      'Miami, Fort Lauderdale, and Palm Beach trace a razor-sharp eastern wall pressed between the Atlantic and the dark Everglades swamp. Across the dark interior around Lake Okeechobee, a twin luminous chain hugs the Gulf coast.',
    morphology: {
      hubs: [
        [25.76, -80.19, 1.0, 26], // Miami
        [26.12, -80.14, 0.88, 21], // Fort Lauderdale
        [26.71, -80.05, 0.78, 18], // West Palm Beach
        [26.64, -81.87, 0.72, 17], // Fort Myers
        [26.14, -81.79, 0.60, 14], // Naples
        [27.95, -82.46, 0.90, 23], // Tampa
        [28.54, -81.38, 0.88, 22], // Orlando
      ],
      filaments: [
        [[25.47, -80.48], [25.76, -80.19], [26.12, -80.14], [26.71, -80.05], [27.45, -80.33], [28.08, -80.61]],
        [[26.14, -81.79], [26.64, -81.87], [27.34, -82.53], [27.95, -82.46]],
        [[27.95, -82.46], [28.20, -81.95], [28.54, -81.38]],
      ],
    },
  },
  {
    id: 16,
    slug: 'perth-swan-plain',
    name: 'Perth & Swan Coastal Plain',
    country: 'Australia',
    region: 'Oceania',
    lat: -31.98,
    lon: 115.86,
    winRadiusKm: 240,
    patternTag: 'Isolated Continental Fringe',
    aliases: ['Australia', 'Perth', 'Western Australia', 'Fremantle', 'Mandurah'],
    explanation:
      'One of the most isolated major cities on Earth, Perth forms a solitary North-South ribbon along the Indian Ocean shore. Zooming out reveals thousands of kilometers of empty Australian Outback to the east.',
    morphology: {
      hubs: [
        [-31.95, 115.86, 0.95, 24], // Perth
        [-32.06, 115.75, 0.62, 15], // Fremantle
        [-31.75, 115.77, 0.58, 14], // Joondalup
        [-32.53, 115.72, 0.52, 13], // Mandurah
        [-33.33, 115.64, 0.42, 10], // Bunbury
        [-30.75, 121.47, 0.34, 8], // Kalgoorlie
      ],
      filaments: [
        [[-31.50, 115.62], [-31.75, 115.77], [-31.95, 115.86], [-32.28, 115.75], [-32.53, 115.72], [-33.33, 115.64]],
        [[-31.95, 115.86], [-31.65, 116.66], [-31.48, 118.28]],
      ],
    },
  },
  {
    id: 17,
    slug: 'bosphorus-marmara',
    name: 'Istanbul & Bosphorus Strait',
    country: 'Turkey',
    region: 'Europe / Western Asia',
    lat: 40.98,
    lon: 29.05,
    winRadiusKm: 210,
    patternTag: 'Strait Crossing Metropolis',
    aliases: ['Turkey', 'Istanbul', 'Bosphorus', 'Marmara', 'Bursa', 'Izmit'],
    explanation:
      'Split down its bright core by the dark S-curve of the Bosphorus Strait, Istanbul bridges Europe and Asia with one unmistakable silhouette. Neighboring industrial belts wrap around the eastern tip of the Sea of Marmara.',
    morphology: {
      hubs: [
        [41.01, 28.98, 1.0, 29], // Istanbul
        [40.77, 29.92, 0.72, 17], // Izmit
        [40.18, 29.06, 0.76, 19], // Bursa
        [40.98, 27.51, 0.48, 12], // Tekirdag
        [40.66, 29.27, 0.50, 12], // Yalova
        [41.16, 27.80, 0.54, 13], // Corlu
      ],
      filaments: [
        [[41.16, 27.80], [41.01, 28.98], [40.88, 29.25], [40.77, 29.92], [40.78, 30.40]],
        [[40.77, 29.92], [40.43, 29.15], [40.18, 29.06]],
      ],
    },
  },
  {
    id: 18,
    slug: 'suez-canal-corridor',
    name: 'Suez Canal & Red Sea Bifurcation',
    country: 'Egypt',
    region: 'North Africa / Sinai',
    lat: 30.42,
    lon: 32.36,
    winRadiusKm: 210,
    patternTag: 'Shipping Canal Axis',
    aliases: ['Egypt', 'Suez', 'Suez Canal', 'Port Said', 'Ismailia', 'Sinai', 'Cairo'],
    explanation:
      'Running ruler-straight from the Mediterranean at Port Said down to Suez Bay, the illuminated canal slices cleanly between the fertile Nile Delta and the pitch-black Sinai desert mountains.',
    morphology: {
      hubs: [
        [31.26, 32.30, 0.68, 15], // Port Said
        [30.60, 32.27, 0.66, 15], // Ismailia
        [29.97, 32.55, 0.70, 16], // Suez
        [30.04, 31.24, 0.96, 25], // Cairo (to the west)
        [30.59, 31.50, 0.62, 15], // Zagazig
      ],
      filaments: [
        [[31.26, 32.30], [30.85, 32.31], [30.60, 32.27], [30.25, 32.35], [29.97, 32.55]],
        [[30.04, 31.24], [30.30, 31.74], [30.60, 32.27]],
        [[30.04, 31.24], [30.00, 31.90], [29.97, 32.55]],
      ],
    },
  },
  {
    id: 19,
    slug: 'california-central-valley',
    name: 'San Francisco Bay & Central Valley',
    country: 'United States',
    region: 'North America',
    lat: 37.68,
    lon: -121.38,
    winRadiusKm: 230,
    patternTag: 'Bay & Trough Corridor',
    aliases: ['United States', 'USA', 'California', 'San Francisco', 'Sacramento', 'San Jose', 'Oakland', 'Fresno'],
    explanation:
      'Glowing clusters ring the dark waters of San Francisco Bay before spilling eastward through the Altamont Pass into California’s long agricultural valley, bordered tightly on the east by the pitch-black Sierra Nevada.',
    morphology: {
      hubs: [
        [37.77, -122.42, 0.92, 22], // SF
        [37.80, -122.27, 0.84, 20], // Oakland / East Bay
        [37.34, -121.89, 0.90, 22], // San Jose
        [38.58, -121.49, 0.84, 21], // Sacramento
        [37.96, -121.29, 0.68, 16], // Stockton
        [37.64, -121.00, 0.64, 15], // Modesto
        [36.74, -119.79, 0.72, 17], // Fresno
      ],
      filaments: [
        [[38.58, -121.49], [37.96, -121.29], [37.64, -121.00], [37.30, -120.48], [36.74, -119.79]],
        [[37.77, -122.42], [37.80, -122.27], [38.25, -122.04], [38.58, -121.49]],
        [[37.80, -122.27], [37.68, -121.77], [37.96, -121.29]],
      ],
    },
  },
  {
    id: 20,
    slug: 'st-lawrence-corridor',
    name: 'St. Lawrence River Corridor',
    country: 'Canada',
    region: 'North America',
    lat: 45.95,
    lon: -73.02,
    winRadiusKm: 240,
    patternTag: 'Boreal River Valley',
    aliases: ['Canada', 'Montreal', 'Quebec', 'Quebec City', 'Ottawa', 'St Lawrence'],
    explanation:
      'Montreal glows brightest on its river island before twin illuminated ribbons trace both banks of the St. Lawrence northeast toward Quebec City, slicing straight through the dark Canadian Shield and Appalachian forests.',
    morphology: {
      hubs: [
        [45.50, -73.57, 0.96, 25], // Montreal
        [46.81, -71.21, 0.74, 18], // Quebec City
        [46.34, -72.54, 0.56, 13], // Trois-Rivieres
        [45.40, -71.89, 0.50, 12], // Sherbrooke
        [45.42, -75.70, 0.78, 19], // Ottawa
      ],
      filaments: [
        [[45.50, -73.57], [46.04, -73.12], [46.34, -72.54], [46.81, -71.21]],
        [[45.50, -73.57], [45.63, -72.95], [45.40, -71.89]],
        [[45.50, -73.57], [45.42, -75.70]],
      ],
    },
  },
  {
    id: 21,
    slug: 'malacca-singapore',
    name: 'Singapore & Strait of Malacca',
    country: 'Singapore / Malaysia',
    region: 'Southeast Asia',
    lat: 1.52,
    lon: 103.65,
    winRadiusKm: 210,
    patternTag: 'Maritime Choke Point',
    aliases: ['Singapore', 'Malaysia', 'Johor Bahru', 'Kuala Lumpur', 'Malacca', 'Batam'],
    explanation:
      'At the southern tip of the Malay Peninsula, Singapore and Johor Bahru form an intensely bright diamond framed by dark shipping lanes and illuminated anchorages across the Singapore Strait.',
    morphology: {
      hubs: [
        [1.35, 103.82, 1.0, 25], // Singapore
        [1.49, 103.74, 0.82, 19], // Johor Bahru
        [1.13, 104.05, 0.56, 13], // Batam
        [1.85, 102.93, 0.50, 12], // Batu Pahat
        [2.19, 102.25, 0.62, 15], // Malacca
        [3.14, 101.69, 0.92, 23], // Kuala Lumpur
      ],
      filaments: [
        [[1.35, 103.82], [1.49, 103.74], [1.85, 102.93], [2.19, 102.25], [2.73, 101.94], [3.14, 101.69]],
      ],
    },
  },
  {
    id: 22,
    slug: 'lake-victoria-basin',
    name: 'Lake Victoria Basin',
    country: 'Uganda / Kenya / Tanzania',
    region: 'East Africa',
    lat: -0.35,
    lon: 33.15,
    winRadiusKm: 260,
    patternTag: 'Equatorial Lake Shore',
    aliases: ['Uganda', 'Kenya', 'Tanzania', 'Kampala', 'Kisumu', 'Mwanza', 'Lake Victoria', 'Entebbe'],
    explanation:
      'Human settlements wrap around the northern and eastern coves of Lake Victoria like delicate amber embers circling a dark inland ocean, linking Kampala, Jinja, and Kisumu.',
    morphology: {
      hubs: [
        [0.35, 32.58, 0.80, 19], // Kampala
        [0.44, 33.20, 0.52, 12], // Jinja
        [-0.09, 34.77, 0.58, 13], // Kisumu
        [0.51, 35.27, 0.50, 12], // Eldoret
        [-2.52, 32.90, 0.58, 13], // Mwanza
        [-1.33, 31.81, 0.36, 9], // Bukoba
      ],
      filaments: [
        [[0.35, 32.58], [0.44, 33.20], [0.68, 34.18], [-0.09, 34.77], [0.51, 35.27]],
      ],
    },
  },
  {
    id: 23,
    slug: 'gauteng-gold-reef',
    name: 'Gauteng & Witwatersrand Gold Reef',
    country: 'South Africa',
    region: 'Southern Africa',
    lat: -26.05,
    lon: 28.08,
    winRadiusKm: 230,
    patternTag: 'Inland Mineral Plateau',
    aliases: ['South Africa', 'Johannesburg', 'Pretoria', 'Soweto', 'Gauteng'],
    explanation:
      'High on South Africa’s Highveld far from any ocean, Johannesburg, Soweto, and the East/West Rand form an elongated golden reef tracing gold-bearing geology, paired tightly with Pretoria to the north.',
    morphology: {
      hubs: [
        [-26.20, 28.05, 0.98, 25], // Johannesburg
        [-25.75, 28.19, 0.86, 21], // Pretoria
        [-26.25, 27.86, 0.72, 17], // Soweto
        [-26.18, 28.32, 0.68, 16], // Ekurhuleni / Benoni
        [-26.67, 27.93, 0.56, 13], // Vereeniging
        [-25.67, 27.24, 0.50, 12], // Rustenburg
      ],
      filaments: [
        [[-26.18, 27.70], [-26.20, 28.05], [-26.18, 28.45]],
        [[-26.20, 28.05], [-25.98, 28.13], [-25.75, 28.19]],
        [[-26.20, 28.05], [-26.67, 27.93]],
      ],
    },
  },
  {
    id: 24,
    slug: 'andean-valleys-colombia',
    name: 'Sabana de Bogotá & Andean Valleys',
    country: 'Colombia',
    region: 'South America',
    lat: 5.15,
    lon: -74.75,
    winRadiusKm: 240,
    patternTag: 'Parallel Mountain Valleys',
    aliases: ['Colombia', 'Bogota', 'Medellin', 'Cali', 'Pereira', 'Manizales'],
    explanation:
      'Three jagged Andean mountain cordilleras split Colombia’s population into parallel high-altitude islands of light—Bogotá on its eastern plateau, and Medellín and the Coffee Axis strung along western valleys.',
    morphology: {
      hubs: [
        [4.71, -74.07, 0.96, 25], // Bogota
        [6.24, -75.58, 0.84, 21], // Medellin
        [4.81, -75.69, 0.60, 14], // Pereira
        [5.07, -75.52, 0.54, 13], // Manizales
        [4.44, -75.23, 0.54, 13], // Ibague
        [3.45, -76.53, 0.78, 19], // Cali
      ],
      filaments: [
        [[4.71, -74.07], [4.30, -74.80], [4.44, -75.23], [4.81, -75.69], [5.07, -75.52], [6.24, -75.58]],
        [[4.81, -75.69], [4.09, -76.20], [3.45, -76.53]],
      ],
    },
  },
  {
    id: 25,
    slug: 'santiago-central-valley',
    name: 'Santiago Basin & Central Valley',
    country: 'Chile',
    region: 'South America',
    lat: -33.45,
    lon: -70.75,
    winRadiusKm: 220,
    patternTag: 'Cordillera-Trapped Corridor',
    aliases: ['Chile', 'Santiago', 'Valparaiso', 'Vina del Mar', 'Rancagua'],
    explanation:
      'Trapped between the pitch-black Pacific Ocean and the sheer wall of the high Andes, Santiago shines inside an enclosed basin linked northwest through coastal hills to the twin ports of Valparaíso and Viña del Mar.',
    morphology: {
      hubs: [
        [-33.45, -70.67, 0.98, 25], // Santiago
        [-33.05, -71.62, 0.72, 17], // Valparaiso / Vina
        [-34.17, -70.74, 0.54, 13], // Rancagua
        [-32.83, -70.60, 0.44, 11], // Los Andes
        [-35.43, -71.66, 0.48, 12], // Talca
      ],
      filaments: [
        [[-33.05, -71.62], [-33.30, -71.15], [-33.45, -70.67]],
        [[-33.45, -70.67], [-34.17, -70.74], [-34.98, -71.24], [-35.43, -71.66]],
      ],
    },
  },
  {
    id: 26,
    slug: 'bakken-shale-flares',
    name: 'Bakken Shale Gas Flares (Williston Basin)',
    country: 'United States',
    region: 'North Dakota, North America',
    lat: 48.05,
    lon: -103.25,
    winRadiusKm: 260,
    patternTag: 'Rural Oilfield Flare Constellation',
    aliases: ['United States', 'USA', 'North Dakota', 'Bakken', 'Williston', 'Minot', 'Montana'],
    explanation:
      'Across sparsely populated prairie where almost no big cities exist, thousands of natural gas flares from Bakken shale oil wells create a surreal pixelated sprawl rivaling a major metropolitan area.',
    morphology: {
      hubs: [
        [48.15, -103.62, 0.76, 15], // Williston
        [47.80, -103.28, 0.68, 14], // Watford City
        [48.32, -102.38, 0.64, 13], // Stanley
        [48.23, -101.30, 0.62, 14], // Minot
        [46.88, -102.79, 0.52, 12], // Dickinson
        // Dispersed rural wellpad flare dots
        [47.92, -102.85, 0.58, 6],
        [48.28, -103.10, 0.55, 6],
        [47.65, -103.60, 0.52, 6],
        [48.42, -102.75, 0.50, 5],
        [47.98, -103.90, 0.48, 5],
        [48.10, -102.50, 0.54, 6],
      ],
      filaments: [
        [[48.15, -103.62], [48.32, -102.38], [48.23, -101.30]],
        [[48.15, -103.62], [47.80, -103.28], [46.88, -102.79]],
      ],
    },
  },
  {
    id: 27,
    slug: 'iceland-reykjavik',
    name: 'Iceland Southwest (Reykjavík Peninsula)',
    country: 'Iceland',
    region: 'North Atlantic / Europe',
    lat: 64.08,
    lon: -21.85,
    winRadiusKm: 230,
    patternTag: 'Sub-Arctic Island Cluster',
    aliases: ['Iceland', 'Reykjavik', 'Keflavik', 'Akureyri'],
    explanation:
      'Hovering near the Arctic Circle, Iceland’s warmth and geothermal power pool almost entirely onto the southwestern Reykjanes Peninsula and Faxaflói Bay, surrounded by sheer North Atlantic blackness.',
    morphology: {
      hubs: [
        [64.15, -21.94, 0.88, 19], // Reykjavik
        [64.00, -22.56, 0.58, 12], // Keflavik
        [63.93, -21.00, 0.48, 10], // Selfoss
        [64.32, -22.07, 0.44, 10], // Akranes
        [65.68, -18.09, 0.46, 10], // Akureyri
      ],
      filaments: [
        [[64.00, -22.56], [64.15, -21.94], [63.93, -21.00]],
        [[64.15, -21.94], [64.32, -22.07], [64.54, -21.92]],
      ],
    },
  },
  {
    id: 28,
    slug: 'upper-rhine-graben',
    name: 'Upper Rhine Graben (Frankfurt–Basel)',
    country: 'Germany / France / Switzerland',
    region: 'Central Europe',
    lat: 49.05,
    lon: 8.42,
    winRadiusKm: 220,
    patternTag: 'Rift Valley Corridor',
    aliases: ['Germany', 'France', 'Switzerland', 'Frankfurt', 'Mannheim', 'Strasbourg', 'Basel', 'Karlsruhe', 'Stuttgart'],
    explanation:
      'Bounded cleanly by the dark forests of the Vosges and Black Forest mountains, a straight north-south river trough funnels lights from Frankfurt and Mannheim past Karlsruhe and Strasbourg down to Basel.',
    morphology: {
      hubs: [
        [50.11, 8.68, 0.94, 24], // Frankfurt
        [49.49, 8.47, 0.82, 19], // Mannheim
        [49.01, 8.40, 0.72, 17], // Karlsruhe
        [48.57, 7.75, 0.72, 17], // Strasbourg
        [47.56, 7.59, 0.70, 17], // Basel
        [48.78, 9.18, 0.86, 21], // Stuttgart
        [47.99, 7.84, 0.54, 13], // Freiburg
      ],
      filaments: [
        [[50.11, 8.68], [49.49, 8.47], [49.01, 8.40], [48.57, 7.75], [47.99, 7.84], [47.56, 7.59]],
        [[49.01, 8.40], [48.78, 9.18]],
      ],
    },
  },
  {
    id: 29,
    slug: 'hejaz-corridor',
    name: 'Hejaz Pilgrimage Corridor (Jeddah–Mecca)',
    country: 'Saudi Arabia',
    region: 'Middle East',
    lat: 21.48,
    lon: 39.55,
    winRadiusKm: 220,
    patternTag: 'Desert Port & Mountain Shrine',
    aliases: ['Saudi Arabia', 'Jeddah', 'Mecca', 'Makkah', 'Medina', 'Taif', 'Hejaz'],
    explanation:
      'Along the Red Sea coast, Jeddah stretches north-south like a glowing shoreline spine before an intensely lit pilgrimage highway cuts inland through pitch-black Hejaz mountains to Mecca and Taif.',
    morphology: {
      hubs: [
        [21.49, 39.19, 0.94, 23], // Jeddah
        [21.39, 39.86, 0.92, 22], // Mecca
        [21.27, 40.42, 0.64, 15], // Taif
        [24.47, 39.61, 0.80, 19], // Medina
        [24.09, 38.06, 0.54, 13], // Yanbu
      ],
      filaments: [
        [[21.49, 39.19], [21.39, 39.86], [21.27, 40.42]],
        [[21.49, 39.19], [22.80, 39.03], [24.47, 39.61]],
      ],
    },
  },
  {
    id: 30,
    slug: 'auckland-isthmus',
    name: 'Auckland Isthmus & Waikato',
    country: 'New Zealand',
    region: 'Oceania',
    lat: -36.98,
    lon: 174.82,
    winRadiusKm: 220,
    patternTag: 'Twin-Harbor Isthmus',
    aliases: ['New Zealand', 'Auckland', 'Hamilton', 'Tauranga', 'North Island'],
    explanation:
      'Pinched tightly between the Waitematā and Manukau harbors on New Zealand’s North Island, Auckland’s lights narrow across a volcanic isthmus before trailing south down the Waikato River valley.',
    morphology: {
      hubs: [
        [-36.85, 174.76, 0.92, 22], // Auckland
        [-37.79, 175.28, 0.62, 15], // Hamilton
        [-37.69, 176.17, 0.56, 14], // Tauranga
        [-35.73, 174.32, 0.42, 10], // Whangarei
        [-38.14, 176.25, 0.44, 10], // Rotorua
      ],
      filaments: [
        [[-36.85, 174.76], [-37.21, 174.90], [-37.79, 175.28], [-37.69, 176.17]],
        [[-36.85, 174.76], [-36.40, 174.66], [-35.73, 174.32]],
      ],
    },
  },
];

/**
 * Comprehensive global gazetteer (240+ countries, regions, and major cities)
 * for autocomplete guessing, Haversine distance, and compass bearing feedback.
 */
const LOCATIONS = [
  // Include all puzzle locations directly
  ...PUZZLES.map((p) => ({
    name: p.name,
    country: p.country,
    region: p.region,
    lat: p.lat,
    lon: p.lon,
    puzzleId: p.id,
    aliases: p.aliases,
  })),

  // Major Countries & Territories + Distinctive Cities
  { name: 'Egypt', country: 'Egypt', region: 'North Africa', lat: 26.82, lon: 30.80 },
  { name: 'Cairo', country: 'Egypt', region: 'North Africa', lat: 30.04, lon: 31.24 },
  { name: 'Alexandria', country: 'Egypt', region: 'North Africa', lat: 31.20, lon: 29.92 },
  { name: 'Russia', country: 'Russia', region: 'Eurasia', lat: 61.52, lon: 105.32 },
  { name: 'Moscow', country: 'Russia', region: 'Eastern Europe', lat: 55.76, lon: 37.62 },
  { name: 'Saint Petersburg', country: 'Russia', region: 'Eastern Europe', lat: 59.93, lon: 30.36 },
  { name: 'Novosibirsk', country: 'Russia', region: 'Siberia', lat: 55.01, lon: 82.93 },
  { name: 'Krasnoyarsk', country: 'Russia', region: 'Siberia', lat: 56.01, lon: 92.85 },
  { name: 'Irkutsk', country: 'Russia', region: 'Siberia', lat: 52.29, lon: 104.28 },
  { name: 'Vladivostok', country: 'Russia', region: 'Far East', lat: 43.12, lon: 131.89 },
  { name: 'Yekaterinburg', country: 'Russia', region: 'Urals', lat: 56.84, lon: 60.60 },
  { name: 'Indonesia', country: 'Indonesia', region: 'Southeast Asia', lat: -0.79, lon: 113.92 },
  { name: 'Jakarta', country: 'Indonesia', region: 'Southeast Asia', lat: -6.21, lon: 106.85 },
  { name: 'Surabaya', country: 'Indonesia', region: 'Southeast Asia', lat: -7.25, lon: 112.75 },
  { name: 'Bandung', country: 'Indonesia', region: 'Southeast Asia', lat: -6.91, lon: 107.61 },
  { name: 'Italy', country: 'Italy', region: 'Southern Europe', lat: 41.87, lon: 12.57 },
  { name: 'Milan', country: 'Italy', region: 'Southern Europe', lat: 45.46, lon: 9.19 },
  { name: 'Rome', country: 'Italy', region: 'Southern Europe', lat: 41.90, lon: 12.50 },
  { name: 'Turin', country: 'Italy', region: 'Southern Europe', lat: 45.07, lon: 7.69 },
  { name: 'Naples', country: 'Italy', region: 'Southern Europe', lat: 40.85, lon: 14.27 },
  { name: 'Venice', country: 'Italy', region: 'Southern Europe', lat: 45.44, lon: 12.32 },
  { name: 'United States', country: 'United States', region: 'North America', lat: 39.83, lon: -98.58 },
  { name: 'New York City', country: 'United States', region: 'North America', lat: 40.71, lon: -74.01 },
  { name: 'Boston', country: 'United States', region: 'North America', lat: 42.36, lon: -71.06 },
  { name: 'Philadelphia', country: 'United States', region: 'North America', lat: 39.95, lon: -75.16 },
  { name: 'Washington, D.C.', country: 'United States', region: 'North America', lat: 38.91, lon: -77.04 },
  { name: 'Chicago', country: 'United States', region: 'North America', lat: 41.88, lon: -87.63 },
  { name: 'Los Angeles', country: 'United States', region: 'North America', lat: 34.05, lon: -118.24 },
  { name: 'San Francisco', country: 'United States', region: 'North America', lat: 37.77, lon: -122.42 },
  { name: 'Sacramento', country: 'United States', region: 'North America', lat: 38.58, lon: -121.49 },
  { name: 'Miami', country: 'United States', region: 'North America', lat: 25.76, lon: -80.19 },
  { name: 'Orlando', country: 'United States', region: 'North America', lat: 28.54, lon: -81.38 },
  { name: 'Tampa', country: 'United States', region: 'North America', lat: 27.95, lon: -82.46 },
  { name: 'Houston', country: 'United States', region: 'North America', lat: 29.76, lon: -95.37 },
  { name: 'Dallas', country: 'United States', region: 'North America', lat: 32.78, lon: -96.80 },
  { name: 'Atlanta', country: 'United States', region: 'North America', lat: 33.75, lon: -84.39 },
  { name: 'Seattle', country: 'United States', region: 'North America', lat: 47.61, lon: -122.33 },
  { name: 'Denver', country: 'United States', region: 'North America', lat: 39.74, lon: -104.99 },
  { name: 'Phoenix', country: 'United States', region: 'North America', lat: 33.45, lon: -112.07 },
  { name: 'Las Vegas', country: 'United States', region: 'North America', lat: 36.17, lon: -115.14 },
  { name: 'Minneapolis', country: 'United States', region: 'North America', lat: 44.98, lon: -93.27 },
  { name: 'Detroit', country: 'United States', region: 'North America', lat: 42.33, lon: -83.05 },
  { name: 'Anchorage', country: 'United States', region: 'Alaska', lat: 61.22, lon: -149.90 },
  { name: 'Honolulu', country: 'United States', region: 'Hawaii', lat: 21.31, lon: -157.86 },
  { name: 'North Dakota', country: 'United States', region: 'North America', lat: 47.55, lon: -101.00 },
  { name: 'Florida', country: 'United States', region: 'North America', lat: 27.66, lon: -81.52 },
  { name: 'California', country: 'United States', region: 'North America', lat: 36.78, lon: -119.42 },
  { name: 'India', country: 'India', region: 'South Asia', lat: 20.59, lon: 78.96 },
  { name: 'New Delhi', country: 'India', region: 'South Asia', lat: 28.61, lon: 77.21 },
  { name: 'Mumbai', country: 'India', region: 'South Asia', lat: 19.08, lon: 72.88 },
  { name: 'Bengaluru', country: 'India', region: 'South Asia', lat: 12.97, lon: 77.59 },
  { name: 'Kolkata', country: 'India', region: 'South Asia', lat: 22.57, lon: 88.36 },
  { name: 'Chennai', country: 'India', region: 'South Asia', lat: 13.08, lon: 80.27 },
  { name: 'Hyderabad', country: 'India', region: 'South Asia', lat: 17.39, lon: 78.49 },
  { name: 'South Korea', country: 'South Korea', region: 'East Asia', lat: 35.91, lon: 127.77 },
  { name: 'Seoul', country: 'South Korea', region: 'East Asia', lat: 37.57, lon: 126.98 },
  { name: 'Busan', country: 'South Korea', region: 'East Asia', lat: 35.18, lon: 129.08 },
  { name: 'North Korea', country: 'North Korea', region: 'East Asia', lat: 40.34, lon: 127.51 },
  { name: 'Pyongyang', country: 'North Korea', region: 'East Asia', lat: 39.04, lon: 125.76 },
  { name: 'China', country: 'China', region: 'East Asia', lat: 35.86, lon: 104.20 },
  { name: 'Hong Kong', country: 'China', region: 'East Asia', lat: 22.32, lon: 114.17 },
  { name: 'Shenzhen', country: 'China', region: 'East Asia', lat: 22.54, lon: 114.06 },
  { name: 'Guangzhou', country: 'China', region: 'East Asia', lat: 23.13, lon: 113.26 },
  { name: 'Beijing', country: 'China', region: 'East Asia', lat: 39.90, lon: 116.41 },
  { name: 'Shanghai', country: 'China', region: 'East Asia', lat: 31.23, lon: 121.47 },
  { name: 'Chengdu', country: 'China', region: 'East Asia', lat: 30.57, lon: 104.07 },
  { name: 'Chongqing', country: 'China', region: 'East Asia', lat: 29.56, lon: 106.55 },
  { name: 'Wuhan', country: 'China', region: 'East Asia', lat: 30.59, lon: 114.31 },
  { name: 'Xi’an', country: 'China', region: 'East Asia', lat: 34.34, lon: 108.94 },
  { name: 'Harbin', country: 'China', region: 'East Asia', lat: 45.80, lon: 126.53 },
  { name: 'Spain', country: 'Spain', region: 'Southern Europe', lat: 40.46, lon: -3.75 },
  { name: 'Madrid', country: 'Spain', region: 'Southern Europe', lat: 40.42, lon: -3.70 },
  { name: 'Barcelona', country: 'Spain', region: 'Southern Europe', lat: 41.39, lon: 2.17 },
  { name: 'Seville', country: 'Spain', region: 'Southern Europe', lat: 37.39, lon: -5.98 },
  { name: 'Malaga', country: 'Spain', region: 'Southern Europe', lat: 36.72, lon: -4.42 },
  { name: 'Morocco', country: 'Morocco', region: 'North Africa', lat: 31.79, lon: -7.09 },
  { name: 'Tangier', country: 'Morocco', region: 'North Africa', lat: 35.76, lon: -5.83 },
  { name: 'Casablanca', country: 'Morocco', region: 'North Africa', lat: 33.57, lon: -7.59 },
  { name: 'Argentina', country: 'Argentina', region: 'South America', lat: -38.42, lon: -63.62 },
  { name: 'Buenos Aires', country: 'Argentina', region: 'South America', lat: -34.60, lon: -58.38 },
  { name: 'Cordoba', country: 'Argentina', region: 'South America', lat: -31.42, lon: -64.18 },
  { name: 'Rosario', country: 'Argentina', region: 'South America', lat: -32.95, lon: -60.64 },
  { name: 'Netherlands', country: 'Netherlands', region: 'Western Europe', lat: 52.13, lon: 5.29 },
  { name: 'Amsterdam', country: 'Netherlands', region: 'Western Europe', lat: 52.37, lon: 4.90 },
  { name: 'Rotterdam', country: 'Netherlands', region: 'Western Europe', lat: 51.92, lon: 4.48 },
  { name: 'Belgium', country: 'Belgium', region: 'Western Europe', lat: 50.50, lon: 4.47 },
  { name: 'Brussels', country: 'Belgium', region: 'Western Europe', lat: 50.85, lon: 4.35 },
  { name: 'Antwerp', country: 'Belgium', region: 'Western Europe', lat: 51.22, lon: 4.40 },
  { name: 'Japan', country: 'Japan', region: 'East Asia', lat: 36.20, lon: 138.25 },
  { name: 'Tokyo', country: 'Japan', region: 'East Asia', lat: 35.68, lon: 139.77 },
  { name: 'Osaka', country: 'Japan', region: 'East Asia', lat: 34.69, lon: 135.50 },
  { name: 'Nagoya', country: 'Japan', region: 'East Asia', lat: 35.18, lon: 136.91 },
  { name: 'Sapporo', country: 'Japan', region: 'East Asia', lat: 43.06, lon: 141.35 },
  { name: 'Fukuoka', country: 'Japan', region: 'East Asia', lat: 33.59, lon: 130.40 },
  { name: 'United Arab Emirates', country: 'UAE', region: 'Middle East', lat: 23.42, lon: 53.85 },
  { name: 'Dubai', country: 'UAE', region: 'Middle East', lat: 25.20, lon: 55.27 },
  { name: 'Abu Dhabi', country: 'UAE', region: 'Middle East', lat: 24.45, lon: 54.38 },
  { name: 'Qatar', country: 'Qatar', region: 'Middle East', lat: 25.35, lon: 51.18 },
  { name: 'Doha', country: 'Qatar', region: 'Middle East', lat: 25.29, lon: 51.53 },
  { name: 'Uzbekistan', country: 'Uzbekistan', region: 'Central Asia', lat: 41.38, lon: 64.59 },
  { name: 'Tashkent', country: 'Uzbekistan', region: 'Central Asia', lat: 41.30, lon: 69.24 },
  { name: 'Kyrgyzstan', country: 'Kyrgyzstan', region: 'Central Asia', lat: 41.20, lon: 74.77 },
  { name: 'Bishkek', country: 'Kyrgyzstan', region: 'Central Asia', lat: 42.87, lon: 74.57 },
  { name: 'Australia', country: 'Australia', region: 'Oceania', lat: -25.27, lon: 133.78 },
  { name: 'Perth', country: 'Australia', region: 'Oceania', lat: -31.95, lon: 115.86 },
  { name: 'Sydney', country: 'Australia', region: 'Oceania', lat: -33.87, lon: 151.21 },
  { name: 'Melbourne', country: 'Australia', region: 'Oceania', lat: -37.81, lon: 144.96 },
  { name: 'Brisbane', country: 'Australia', region: 'Oceania', lat: -27.47, lon: 153.03 },
  { name: 'Adelaide', country: 'Australia', region: 'Oceania', lat: -34.93, lon: 138.60 },
  { name: 'Turkey', country: 'Turkey', region: 'Middle East / Europe', lat: 38.96, lon: 35.24 },
  { name: 'Istanbul', country: 'Turkey', region: 'Middle East / Europe', lat: 41.01, lon: 28.98 },
  { name: 'Ankara', country: 'Turkey', region: 'Middle East', lat: 39.93, lon: 32.86 },
  { name: 'Izmir', country: 'Turkey', region: 'Middle East', lat: 38.42, lon: 27.14 },
  { name: 'Canada', country: 'Canada', region: 'North America', lat: 56.13, lon: -106.35 },
  { name: 'Montreal', country: 'Canada', region: 'North America', lat: 45.50, lon: -73.57 },
  { name: 'Quebec City', country: 'Canada', region: 'North America', lat: 46.81, lon: -71.21 },
  { name: 'Toronto', country: 'Canada', region: 'North America', lat: 43.65, lon: -79.38 },
  { name: 'Ottawa', country: 'Canada', region: 'North America', lat: 45.42, lon: -75.70 },
  { name: 'Vancouver', country: 'Canada', region: 'North America', lat: 49.28, lon: -123.12 },
  { name: 'Calgary', country: 'Canada', region: 'North America', lat: 51.04, lon: -114.07 },
  { name: 'Edmonton', country: 'Canada', region: 'North America', lat: 53.55, lon: -113.49 },
  { name: 'Singapore', country: 'Singapore', region: 'Southeast Asia', lat: 1.35, lon: 103.82 },
  { name: 'Malaysia', country: 'Malaysia', region: 'Southeast Asia', lat: 4.21, lon: 101.98 },
  { name: 'Kuala Lumpur', country: 'Malaysia', region: 'Southeast Asia', lat: 3.14, lon: 101.69 },
  { name: 'Johor Bahru', country: 'Malaysia', region: 'Southeast Asia', lat: 1.49, lon: 103.74 },
  { name: 'Uganda', country: 'Uganda', region: 'East Africa', lat: 1.37, lon: 32.29 },
  { name: 'Kampala', country: 'Uganda', region: 'East Africa', lat: 0.35, lon: 32.58 },
  { name: 'Kenya', country: 'Kenya', region: 'East Africa', lat: -0.02, lon: 37.91 },
  { name: 'Nairobi', country: 'Kenya', region: 'East Africa', lat: -1.29, lon: 36.82 },
  { name: 'Tanzania', country: 'Tanzania', region: 'East Africa', lat: -6.37, lon: 34.89 },
  { name: 'Dar es Salaam', country: 'Tanzania', region: 'East Africa', lat: -6.79, lon: 39.21 },
  { name: 'South Africa', country: 'South Africa', region: 'Southern Africa', lat: -30.56, lon: 22.94 },
  { name: 'Johannesburg', country: 'South Africa', region: 'Southern Africa', lat: -26.20, lon: 28.05 },
  { name: 'Pretoria', country: 'South Africa', region: 'Southern Africa', lat: -25.75, lon: 28.19 },
  { name: 'Cape Town', country: 'South Africa', region: 'Southern Africa', lat: -33.92, lon: 18.42 },
  { name: 'Durban', country: 'South Africa', region: 'Southern Africa', lat: -29.86, lon: 31.02 },
  { name: 'Colombia', country: 'Colombia', region: 'South America', lat: 4.57, lon: -74.30 },
  { name: 'Bogotá', country: 'Colombia', region: 'South America', lat: 4.71, lon: -74.07 },
  { name: 'Medellín', country: 'Colombia', region: 'South America', lat: 6.24, lon: -75.58 },
  { name: 'Cali', country: 'Colombia', region: 'South America', lat: 3.45, lon: -76.53 },
  { name: 'Chile', country: 'Chile', region: 'South America', lat: -35.68, lon: -71.54 },
  { name: 'Santiago', country: 'Chile', region: 'South America', lat: -33.45, lon: -70.67 },
  { name: 'Valparaíso', country: 'Chile', region: 'South America', lat: -33.05, lon: -71.62 },
  { name: 'Iceland', country: 'Iceland', region: 'Europe', lat: 64.96, lon: -19.02 },
  { name: 'Reykjavík', country: 'Iceland', region: 'Europe', lat: 64.15, lon: -21.94 },
  { name: 'Germany', country: 'Germany', region: 'Central Europe', lat: 51.17, lon: 10.45 },
  { name: 'Frankfurt', country: 'Germany', region: 'Central Europe', lat: 50.11, lon: 8.68 },
  { name: 'Berlin', country: 'Germany', region: 'Central Europe', lat: 52.52, lon: 13.40 },
  { name: 'Munich', country: 'Germany', region: 'Central Europe', lat: 48.14, lon: 11.58 },
  { name: 'Hamburg', country: 'Germany', region: 'Central Europe', lat: 53.55, lon: 9.99 },
  { name: 'Cologne', country: 'Germany', region: 'Central Europe', lat: 50.94, lon: 6.96 },
  { name: 'Stuttgart', country: 'Germany', region: 'Central Europe', lat: 48.78, lon: 9.18 },
  { name: 'France', country: 'France', region: 'Western Europe', lat: 46.23, lon: 2.21 },
  { name: 'Paris', country: 'France', region: 'Western Europe', lat: 48.86, lon: 2.35 },
  { name: 'Lyon', country: 'France', region: 'Western Europe', lat: 45.76, lon: 4.84 },
  { name: 'Marseille', country: 'France', region: 'Western Europe', lat: 43.30, lon: 5.37 },
  { name: 'Strasbourg', country: 'France', region: 'Western Europe', lat: 48.57, lon: 7.75 },
  { name: 'Switzerland', country: 'Switzerland', region: 'Central Europe', lat: 46.82, lon: 8.23 },
  { name: 'Zurich', country: 'Switzerland', region: 'Central Europe', lat: 47.37, lon: 8.54 },
  { name: 'Geneva', country: 'Switzerland', region: 'Central Europe', lat: 46.20, lon: 6.14 },
  { name: 'Basel', country: 'Switzerland', region: 'Central Europe', lat: 47.56, lon: 7.59 },
  { name: 'Saudi Arabia', country: 'Saudi Arabia', region: 'Middle East', lat: 23.89, lon: 45.08 },
  { name: 'Jeddah', country: 'Saudi Arabia', region: 'Middle East', lat: 21.49, lon: 39.19 },
  { name: 'Mecca', country: 'Saudi Arabia', region: 'Middle East', lat: 21.39, lon: 39.86 },
  { name: 'Riyadh', country: 'Saudi Arabia', region: 'Middle East', lat: 24.71, lon: 46.68 },
  { name: 'Medina', country: 'Saudi Arabia', region: 'Middle East', lat: 24.47, lon: 39.61 },
  { name: 'New Zealand', country: 'New Zealand', region: 'Oceania', lat: -40.90, lon: 174.89 },
  { name: 'Auckland', country: 'New Zealand', region: 'Oceania', lat: -36.85, lon: 174.76 },
  { name: 'Wellington', country: 'New Zealand', region: 'Oceania', lat: -41.29, lon: 174.78 },

  // Rest of World Coverage (Countries & Major Metro Centers)
  { name: 'United Kingdom', country: 'United Kingdom', region: 'Western Europe', lat: 55.38, lon: -3.44 },
  { name: 'London', country: 'United Kingdom', region: 'Western Europe', lat: 51.51, lon: -0.13 },
  { name: 'Manchester', country: 'United Kingdom', region: 'Western Europe', lat: 53.48, lon: -2.24 },
  { name: 'Edinburgh', country: 'United Kingdom', region: 'Western Europe', lat: 55.95, lon: -3.19 },
  { name: 'Ireland', country: 'Ireland', region: 'Western Europe', lat: 53.14, lon: -7.69 },
  { name: 'Dublin', country: 'Ireland', region: 'Western Europe', lat: 53.35, lon: -6.26 },
  { name: 'Portugal', country: 'Portugal', region: 'Southern Europe', lat: 39.40, lon: -8.22 },
  { name: 'Lisbon', country: 'Portugal', region: 'Southern Europe', lat: 38.72, lon: -9.14 },
  { name: 'Porto', country: 'Portugal', region: 'Southern Europe', lat: 41.16, lon: -8.63 },
  { name: 'Norway', country: 'Norway', region: 'Northern Europe', lat: 60.47, lon: 8.47 },
  { name: 'Oslo', country: 'Norway', region: 'Northern Europe', lat: 59.91, lon: 10.75 },
  { name: 'Sweden', country: 'Sweden', region: 'Northern Europe', lat: 60.13, lon: 18.64 },
  { name: 'Stockholm', country: 'Sweden', region: 'Northern Europe', lat: 59.33, lon: 18.07 },
  { name: 'Denmark', country: 'Denmark', region: 'Northern Europe', lat: 56.26, lon: 9.50 },
  { name: 'Copenhagen', country: 'Denmark', region: 'Northern Europe', lat: 55.68, lon: 12.57 },
  { name: 'Finland', country: 'Finland', region: 'Northern Europe', lat: 61.92, lon: 25.75 },
  { name: 'Helsinki', country: 'Finland', region: 'Northern Europe', lat: 60.17, lon: 24.94 },
  { name: 'Poland', country: 'Poland', region: 'Central Europe', lat: 51.92, lon: 19.15 },
  { name: 'Warsaw', country: 'Poland', region: 'Central Europe', lat: 52.23, lon: 21.01 },
  { name: 'Krakow', country: 'Poland', region: 'Central Europe', lat: 50.06, lon: 19.94 },
  { name: 'Austria', country: 'Austria', region: 'Central Europe', lat: 47.52, lon: 14.55 },
  { name: 'Vienna', country: 'Austria', region: 'Central Europe', lat: 48.21, lon: 16.37 },
  { name: 'Czechia', country: 'Czechia', region: 'Central Europe', lat: 49.82, lon: 15.47 },
  { name: 'Prague', country: 'Czechia', region: 'Central Europe', lat: 50.08, lon: 14.44 },
  { name: 'Hungary', country: 'Hungary', region: 'Central Europe', lat: 47.16, lon: 19.50 },
  { name: 'Budapest', country: 'Hungary', region: 'Central Europe', lat: 47.50, lon: 19.04 },
  { name: 'Romania', country: 'Romania', region: 'Eastern Europe', lat: 45.94, lon: 24.97 },
  { name: 'Bucharest', country: 'Romania', region: 'Eastern Europe', lat: 44.43, lon: 26.10 },
  { name: 'Ukraine', country: 'Ukraine', region: 'Eastern Europe', lat: 48.38, lon: 31.17 },
  { name: 'Kyiv', country: 'Ukraine', region: 'Eastern Europe', lat: 50.45, lon: 30.52 },
  { name: 'Greece', country: 'Greece', region: 'Southern Europe', lat: 39.07, lon: 21.82 },
  { name: 'Athens', country: 'Greece', region: 'Southern Europe', lat: 37.98, lon: 23.73 },
  { name: 'Brazil', country: 'Brazil', region: 'South America', lat: -14.24, lon: -51.93 },
  { name: 'São Paulo', country: 'Brazil', region: 'South America', lat: -23.55, lon: -46.63 },
  { name: 'Rio de Janeiro', country: 'Brazil', region: 'South America', lat: -22.91, lon: -43.17 },
  { name: 'Brasília', country: 'Brazil', region: 'South America', lat: -15.79, lon: -47.88 },
  { name: 'Manaus', country: 'Brazil', region: 'South America', lat: -3.12, lon: -60.02 },
  { name: 'Mexico', country: 'Mexico', region: 'North America', lat: 23.63, lon: -102.55 },
  { name: 'Mexico City', country: 'Mexico', region: 'North America', lat: 19.43, lon: -99.13 },
  { name: 'Monterrey', country: 'Mexico', region: 'North America', lat: 25.69, lon: -100.32 },
  { name: 'Guadalajara', country: 'Mexico', region: 'North America', lat: 20.66, lon: -103.35 },
  { name: 'Peru', country: 'Peru', region: 'South America', lat: -9.19, lon: -75.02 },
  { name: 'Lima', country: 'Peru', region: 'South America', lat: -12.05, lon: -77.04 },
  { name: 'Ecuador', country: 'Ecuador', region: 'South America', lat: -1.83, lon: -78.18 },
  { name: 'Quito', country: 'Ecuador', region: 'South America', lat: -0.18, lon: -78.47 },
  { name: 'Venezuela', country: 'Venezuela', region: 'South America', lat: 6.42, lon: -66.59 },
  { name: 'Caracas', country: 'Venezuela', region: 'South America', lat: 10.48, lon: -66.90 },
  { name: 'Uruguay', country: 'Uruguay', region: 'South America', lat: -32.52, lon: -55.77 },
  { name: 'Montevideo', country: 'Uruguay', region: 'South America', lat: -34.90, lon: -56.16 },
  { name: 'Bolivia', country: 'Bolivia', region: 'South America', lat: -16.29, lon: -63.59 },
  { name: 'La Paz', country: 'Bolivia', region: 'South America', lat: -16.50, lon: -68.12 },
  { name: 'Paraguay', country: 'Paraguay', region: 'South America', lat: -23.44, lon: -58.44 },
  { name: 'Cuba', country: 'Cuba', region: 'Caribbean', lat: 21.52, lon: -77.78 },
  { name: 'Havana', country: 'Cuba', region: 'Caribbean', lat: 23.11, lon: -82.37 },
  { name: 'Dominican Republic', country: 'Dominican Republic', region: 'Caribbean', lat: 18.74, lon: -70.16 },
  { name: 'Puerto Rico', country: 'United States', region: 'Caribbean', lat: 18.22, lon: -66.59 },
  { name: 'Nigeria', country: 'Nigeria', region: 'West Africa', lat: 9.08, lon: 8.68 },
  { name: 'Lagos', country: 'Nigeria', region: 'West Africa', lat: 6.52, lon: 3.38 },
  { name: 'Abuja', country: 'Nigeria', region: 'West Africa', lat: 9.08, lon: 7.40 },
  { name: 'Ghana', country: 'Ghana', region: 'West Africa', lat: 7.95, lon: -1.02 },
  { name: 'Accra', country: 'Ghana', region: 'West Africa', lat: 5.60, lon: -0.19 },
  { name: 'Senegal', country: 'Senegal', region: 'West Africa', lat: 14.50, lon: -14.45 },
  { name: 'Dakar', country: 'Senegal', region: 'West Africa', lat: 14.72, lon: -17.47 },
  { name: 'Algeria', country: 'Algeria', region: 'North Africa', lat: 28.03, lon: 1.66 },
  { name: 'Algiers', country: 'Algeria', region: 'North Africa', lat: 36.75, lon: 3.06 },
  { name: 'Tunisia', country: 'Tunisia', region: 'North Africa', lat: 33.89, lon: 9.54 },
  { name: 'Tunis', country: 'Tunisia', region: 'North Africa', lat: 36.81, lon: 10.18 },
  { name: 'Libya', country: 'Libya', region: 'North Africa', lat: 26.34, lon: 17.23 },
  { name: 'Tripoli', country: 'Libya', region: 'North Africa', lat: 32.89, lon: 13.19 },
  { name: 'Sudan', country: 'Sudan', region: 'Northeast Africa', lat: 12.86, lon: 30.22 },
  { name: 'Khartoum', country: 'Sudan', region: 'Northeast Africa', lat: 15.50, lon: 32.56 },
  { name: 'Ethiopia', country: 'Ethiopia', region: 'East Africa', lat: 9.15, lon: 40.49 },
  { name: 'Addis Ababa', country: 'Ethiopia', region: 'East Africa', lat: 9.03, lon: 38.74 },
  { name: 'DR Congo', country: 'DR Congo', region: 'Central Africa', lat: -4.04, lon: 21.76 },
  { name: 'Kinshasa', country: 'DR Congo', region: 'Central Africa', lat: -4.44, lon: 15.27 },
  { name: 'Angola', country: 'Angola', region: 'Southern Africa', lat: -11.20, lon: 17.87 },
  { name: 'Luanda', country: 'Angola', region: 'Southern Africa', lat: -8.84, lon: 13.23 },
  { name: 'Namibia', country: 'Namibia', region: 'Southern Africa', lat: -22.96, lon: 18.49 },
  { name: 'Botswana', country: 'Botswana', region: 'Southern Africa', lat: -22.33, lon: 24.68 },
  { name: 'Zimbabwe', country: 'Zimbabwe', region: 'Southern Africa', lat: -19.02, lon: 29.15 },
  { name: 'Madagascar', country: 'Madagascar', region: 'East Africa', lat: -18.77, lon: 46.87 },
  { name: 'Israel', country: 'Israel', region: 'Middle East', lat: 31.05, lon: 34.85 },
  { name: 'Tel Aviv', country: 'Israel', region: 'Middle East', lat: 32.09, lon: 34.78 },
  { name: 'Jordan', country: 'Jordan', region: 'Middle East', lat: 30.59, lon: 36.24 },
  { name: 'Amman', country: 'Jordan', region: 'Middle East', lat: 31.95, lon: 35.91 },
  { name: 'Iraq', country: 'Iraq', region: 'Middle East', lat: 33.22, lon: 43.68 },
  { name: 'Baghdad', country: 'Iraq', region: 'Middle East', lat: 33.31, lon: 44.37 },
  { name: 'Iran', country: 'Iran', region: 'Middle East', lat: 32.43, lon: 53.69 },
  { name: 'Tehran', country: 'Iran', region: 'Middle East', lat: 35.69, lon: 51.39 },
  { name: 'Oman', country: 'Oman', region: 'Middle East', lat: 21.51, lon: 55.92 },
  { name: 'Muscat', country: 'Oman', region: 'Middle East', lat: 23.59, lon: 58.38 },
  { name: 'Kuwait', country: 'Kuwait', region: 'Middle East', lat: 29.31, lon: 47.48 },
  { name: 'Bahrain', country: 'Bahrain', region: 'Middle East', lat: 26.07, lon: 50.56 },
  { name: 'Pakistan', country: 'Pakistan', region: 'South Asia', lat: 30.38, lon: 69.35 },
  { name: 'Lahore', country: 'Pakistan', region: 'South Asia', lat: 31.52, lon: 74.36 },
  { name: 'Karachi', country: 'Pakistan', region: 'South Asia', lat: 24.86, lon: 67.00 },
  { name: 'Islamabad', country: 'Pakistan', region: 'South Asia', lat: 33.68, lon: 73.05 },
  { name: 'Bangladesh', country: 'Bangladesh', region: 'South Asia', lat: 23.68, lon: 90.36 },
  { name: 'Dhaka', country: 'Bangladesh', region: 'South Asia', lat: 23.81, lon: 90.41 },
  { name: 'Sri Lanka', country: 'Sri Lanka', region: 'South Asia', lat: 7.87, lon: 80.77 },
  { name: 'Nepal', country: 'Nepal', region: 'South Asia', lat: 28.39, lon: 84.12 },
  { name: 'Kazakhstan', country: 'Kazakhstan', region: 'Central Asia', lat: 48.02, lon: 66.92 },
  { name: 'Almaty', country: 'Kazakhstan', region: 'Central Asia', lat: 43.24, lon: 76.89 },
  { name: 'Astana', country: 'Kazakhstan', region: 'Central Asia', lat: 51.16, lon: 71.47 },
  { name: 'Mongolia', country: 'Mongolia', region: 'East Asia', lat: 46.86, lon: 103.85 },
  { name: 'Ulaanbaatar', country: 'Mongolia', region: 'East Asia', lat: 47.89, lon: 106.91 },
  { name: 'Taiwan', country: 'Taiwan', region: 'East Asia', lat: 23.70, lon: 120.96 },
  { name: 'Taipei', country: 'Taiwan', region: 'East Asia', lat: 25.03, lon: 121.57 },
  { name: 'Thailand', country: 'Thailand', region: 'Southeast Asia', lat: 15.87, lon: 100.99 },
  { name: 'Bangkok', country: 'Thailand', region: 'Southeast Asia', lat: 13.76, lon: 100.50 },
  { name: 'Vietnam', country: 'Vietnam', region: 'Southeast Asia', lat: 14.06, lon: 108.28 },
  { name: 'Ho Chi Minh City', country: 'Vietnam', region: 'Southeast Asia', lat: 10.82, lon: 106.63 },
  { name: 'Hanoi', country: 'Vietnam', region: 'Southeast Asia', lat: 21.03, lon: 105.83 },
  { name: 'Philippines', country: 'Philippines', region: 'Southeast Asia', lat: 12.88, lon: 121.77 },
  { name: 'Manila', country: 'Philippines', region: 'Southeast Asia', lat: 14.60, lon: 120.98 },
  { name: 'Myanmar', country: 'Myanmar', region: 'Southeast Asia', lat: 21.92, lon: 95.96 },
  { name: 'Cambodia', country: 'Cambodia', region: 'Southeast Asia', lat: 12.57, lon: 104.99 },
  { name: 'Laos', country: 'Laos', region: 'Southeast Asia', lat: 19.86, lon: 102.50 },
  { name: 'Greenland', country: 'Greenland', region: 'North America', lat: 71.71, lon: -42.60 },
  { name: 'Papua New Guinea', country: 'Papua New Guinea', region: 'Oceania', lat: -6.31, lon: 143.96 },
  { name: 'Fiji', country: 'Fiji', region: 'Oceania', lat: -17.71, lon: 178.07 },
];

if (typeof window !== 'undefined') {
  window.NIGHTFALL_DATA = { PUZZLES, LOCATIONS };
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PUZZLES, LOCATIONS };
}
