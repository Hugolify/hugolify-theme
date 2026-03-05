/**
 * Map — lazy-loads Leaflet via a shared promise.
 * Leaflet (JS + CSS) is injected dynamically on first use;
 * subsequent maps wait on the same promise (no duplicate loading).
 *
 * @see https://leafletjs.com/
 */
/* global L */
import scrollspy from '../utils/scrollspy';
import mapTiles from '../datas/map-tiles';

// Leaflet scripts
let leafletLoadPromise = null;
function loadLeaflet() {
  if (leafletLoadPromise) return leafletLoadPromise;

  leafletLoadPromise = new Promise((resolve) => {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '/assets/css/leaflet.min.css';
    document.head.appendChild(css);

    const js = document.createElement('script');
    js.type = 'text/javascript';
    js.src = '/assets/js/leaflet.min.js';
    js.addEventListener('load', resolve);
    document.body.appendChild(js);
  });

  return leafletLoadPromise;
}

// Map class
class Map {
  constructor(map) {
    this.mapElm = map;
    loadLeaflet().then(() => this.init());
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
    L.tileLayer(mapTiles[this.tileSelect].tile, {
      attribution: mapTiles[this.tileSelect].attribution
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

// Load maps
const maps = document.querySelectorAll('.js-map');
maps.forEach((map) => {
  scrollspy(map, () => new Map(map));
});
