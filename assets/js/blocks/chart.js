// https://www.chartjs.org/
import scrollspy from '../utils/scrollspy';

const charts = document.querySelectorAll('.block-chart');
let chartjsLoaded = false;

class BlockChart {
    constructor (block) {
        this.chart = block.querySelector('.js-chart');
        this.canvas = this.chart.getContext('2d');

        if (!chartjsLoaded) {
            this.addFiles();
        } else {
            this.init();
        }
    }

    addFiles () {
        this.chartjsJS = document.createElement('script');
        this.chartjsJS.type = 'text/javascript';
        // this.chartjsJS.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.3.0/chart.umd.js';
        this.chartjsJS.src = '/assets/js/chart.umd.js';
        document.getElementsByTagName('body')[0].appendChild(this.chartjsJS);
        
        this.chartjsJS.addEventListener('load', () => {
            chartjsLoaded = true;
            this.init();
        });
    }

    init () {
        let type = this.chart.dataset.type,
            label = this.chart.dataset.label,
            backgroundColor = this.chart.dataset.backgroundColor,
            borderColor = this.chart.dataset.borderColor,
            jsonData = window.json[this.chart.id],
            data = {};
        
        if (jsonData)  {

            data = jsonData;

        } else {

            let items = JSON.parse(this.chart.dataset.items);
            let backgroundColors = items.map(function(e) {
                return e.color;
            });
            let labels = items.map(function(e) {
                return e.label;
            });
            let datas = items.map(function(e) {
                return e.value;
            });

            if (backgroundColor) {
                backgroundColors = backgroundColor;
            }

            data = {
                labels: labels,
                datasets: [{
                    label: label,
                    data: datas,
                    fill: true,
                    backgroundColor: backgroundColors,
                    borderColor: borderColor
                }]
            }

        }

        this.config = {
            type: type,
            data: data,
            options: {
                responsive: true,
                layout: {
                    padding: 20
                }
            }
        };
        if (type === 'line') {
            this.config.options.scales = {};
            this.config.options.scales.y = {};
            this.config.options.scales.y.beginAtZero = true;
        }
        if (type === 'radar') {
            this.config.options.scale = {};
            this.config.options.scale.min = 0;
        }

        let chart = new Chart(this.canvas, this.config);
    }
}

charts.forEach((chart) => {
    scrollspy(chart, () => {
        new BlockChart(chart);
    });
});
