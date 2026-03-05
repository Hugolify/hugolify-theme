/**
 * Leaflet tile layers — free, no API key required.
 * Use `data-tile="<index>"` on the map element to select a layer.
 *
 * Layers:
 *  0 — OpenStreetMap default     https://www.openstreetmap.org/
 *  1 — CartoDB Positron          https://carto.com/basemaps/
 *  2 — CartoDB Dark Matter       https://carto.com/basemaps/
 *  3 — CartoDB Voyager           https://carto.com/basemaps/
 *  4 — OSM Humanitarian (HOT)    https://hot.openstreetmap.org/
 *  5 — OpenTopoMap               https://opentopomap.org/
 *  6 — CyclOSM                   https://www.cyclosm.org/
 *  7 — Esri World Imagery        https://www.esri.com/
 *  8 — Esri World Street Map     https://www.esri.com/
 *  9 — Esri World Topo Map       https://www.esri.com/
 * 10 — Esri National Geographic  https://www.esri.com/
 * 11 — Esri World Shaded Relief  https://www.esri.com/
 *
 * @see https://leafletjs.com/reference.html#tilelayer
 * @see https://wiki.openstreetmap.org/wiki/Tile_servers
 */
const mapTiles = [
  // 0 — OpenStreetMap default
  {
    tile: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
  },
  // 1 — CartoDB Positron
  {
    tile: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; CARTO'
  },
  // 2 — CartoDB Dark Matter
  {
    tile: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; CARTO'
  },
  // 3 — CartoDB Voyager
  {
    tile: 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; CARTO'
  },
  // 4 — OSM Humanitarian (HOT)
  {
    tile: 'https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, Tiles by <a href="https://hot.openstreetmap.org/" target="_blank">HOT</a>'
  },
  // 5 — OpenTopoMap
  {
    tile: 'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org" target="_blank">SRTM</a> | &copy; <a href="https://opentopomap.org" target="_blank">OpenTopoMap</a>'
  },
  // 6 — CyclOSM
  {
    tile: 'https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png',
    attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" target="_blank">CyclOSM</a> | &copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
  },
  // 7 — Esri World Imagery (satellite)
  {
    tile: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; <a href="https://www.esri.com/" target="_blank">Esri</a>, Maxar, Earthstar Geographics'
  },
  // 8 — Esri World Street Map
  {
    tile: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; <a href="https://www.esri.com/" target="_blank">Esri</a>, HERE, Garmin, USGS'
  },
  // 9 — Esri World Topo Map
  {
    tile: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; <a href="https://www.esri.com/" target="_blank">Esri</a>, HERE, Garmin, OpenStreetMap contributors'
  },
  // 10 — Esri National Geographic
  {
    tile: 'https://server.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; <a href="https://www.esri.com/" target="_blank">Esri</a>, National Geographic'
  },
  // 11 — Esri World Shaded Relief
  {
    tile: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
    attribution: '&copy; <a href="https://www.esri.com/" target="_blank">Esri</a>, USGS'
  }
];

export default mapTiles;
