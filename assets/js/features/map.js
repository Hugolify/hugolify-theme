// https://leafletjs.com/
import scrollspy from '../utils/scrollspy';

const maps = document.querySelectorAll('.js-map');
let leafletLoaded = false;

class Map {
  constructor(div) {
    this.mapElm = div;

    if (!leafletLoaded) {
      this.addFiles();
    } else {
      this.init();
    }
  }

  addFiles() {
    // JS leaflet@1.9.4
    this.leafletJS = document.createElement('script');
    this.leafletJS.type = 'text/javascript';
    this.leafletJS.src = '/assets/js/leaflet.min.js';
    document.getElementsByTagName('body')[0].appendChild(this.leafletJS);

    // CSS leaflet@1.9.4
    this.leafletCSS = document.createElement('link');
    this.leafletCSS.rel = 'stylesheet';
    this.leafletCSS.href = '/assets/css/leaflet.min.css';
    document.getElementsByTagName('head')[0].appendChild(this.leafletCSS);

    this.leafletJS.addEventListener('load', () => {
      leafletLoaded = true;
      this.init();
    });
  }

  init() {
    this.bounds = [];
    this.map = false;
    this.zoom = 10;
    if (this.mapElm.hasAttribute('data-zoom')) {
      this.zoom = this.mapElm.dataset.zoom;
    }
    this.tileSelect = 0;
    if (this.mapElm.hasAttribute('data-tile')) {
      this.tileSelect = this.mapElm.dataset.tile;
    }

    this.setMap();
  }

  setMap() {
    let locations = JSON.parse(this.mapElm.dataset.markers),
      coordinate = locations[0].coordinates;

    // Add map
    this.map = this.initMap(coordinate);

    // Add tiles
    this.initTileLayer();

    // Add markers
    if (!this.mapElm.hasAttribute('data-marker-hidden')) {
      this.initMarkers();
    }
  }

  initMarkers() {
    let locations = JSON.parse(this.mapElm.dataset.markers),
      bounds = false;

    // Add markers
    for (var i = 0; i < locations.length; i++) {
      this.addMarker(locations[i]);
    }

    // Center map if more one marker
    if (locations.length > 1) {
      bounds = new L.LatLngBounds(this.bounds);
      this.map.fitBounds(bounds);
    }
  }

  initMap(coordinate) {
    return L.map(this.mapElm, {
      center: coordinate,
      zoom: this.zoom,
      scrollWheelZoom: false
    });
  }

  initTileLayer() {
    // https://leafletjs.com/reference.html#tilelayer
    const tiles = [
      // OpenStreetMap default
      {
        tile: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors'
      },
      // CartoDB Positron
      {
        tile: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; CARTO'
      },
      // CartoDB Dark Matter
      {
        tile: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank">OpenStreetMap</a> contributors &copy; CARTO'
      },
      // Stadiamaps Alidade smooth
      {
        tile: 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png',
        attribution:
          '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }
    ];
    L.tileLayer(tiles[this.tileSelect].tile, {
      attribution: tiles[this.tileSelect].attribution
    }).addTo(this.map);
  }

  addMarker(location) {
    // https://leafletjs.com/reference.html#icon
    let newIcon = L.icon({
      iconUrl: '/assets/images/map-marker.svg',
      iconSize: [50, 50],
      iconAnchor: [25, 40]
    });

    // add coordinates to bounds
    this.bounds.push(location.coordinates);

    // add marker to map
    let marker = L.marker(location.coordinates, { icon: newIcon }).addTo(
      this.map
    );

    // add popup
    if (location.title) {
      marker.bindPopup(location.title);
    }

    // center click to marker
    marker.on('click', (e) => {
      this.map.setView(e.target.getLatLng());
    });
  }
}

maps.forEach((map) => {
  scrollspy(map, () => {
    new Map(map);
  });
});
