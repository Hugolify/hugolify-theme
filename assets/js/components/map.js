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
    // JS
    this.leafletJS = document.createElement('script');
    this.leafletJS.type = 'text/javascript';
    // this.leafletJS.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
    this.leafletJS.src = '/assets/js/leaflet.min.js';
    document.getElementsByTagName('body')[0].appendChild(this.leafletJS);

    // CSS
    this.leafletCSS = document.createElement('link');
    this.leafletCSS.rel = 'stylesheet';
    // this.leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
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
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
