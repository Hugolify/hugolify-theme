const maps = document.querySelectorAll('.block-map');

class BlockMap {
    constructor (block) {
        this.map = block.querySelector('.js-map');
        this.init();
    }

    init () {
        let location = JSON.parse(this.map.dataset.location),
            coordinate = location.coordinates.reverse(),
            zoom = JSON.parse(this.map.dataset.zoom),
            map = L.map(this.map, {
                center: coordinate, 
                zoom: zoom,
                scrollWheelZoom: false
            });

        // add tiles
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        // add marker to map
        L.marker(coordinate).addTo(map);
    }
}

maps.forEach((map) => {
    new BlockMap(map);
});