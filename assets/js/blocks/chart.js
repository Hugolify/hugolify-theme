/**
 * Chart — lazy-loads Chart.js via a shared promise.
 * Chart.js is injected dynamically on first use;
 * subsequent charts wait on the same promise (no duplicate loading).
 *
 * @see https://www.chartjs.org/
 */
/* global Chart */
import scrollspy from '../utils/scrollspy';

// Chart.js script
let chartLoadPromise = null;
function loadChartJs() {
  if (chartLoadPromise) return chartLoadPromise;

  chartLoadPromise = new Promise((resolve) => {
    const js = document.createElement('script');
    js.type = 'text/javascript';
    js.src = '/assets/js/chart.umd.js';
    js.addEventListener('load', resolve);
    document.body.appendChild(js);
  });

  return chartLoadPromise;
}

// Chart class
class BlockChart {
  constructor(block) {
    this.chart = block.querySelector('.js-chart');
    this.canvas = this.chart.getContext('2d');
    loadChartJs().then(() => this.init());
  }

  init() {
    let type = this.chart.dataset.type,
      label = this.chart.dataset.label,
      backgroundColor = this.chart.dataset.backgroundColor,
      borderColor = this.chart.dataset.borderColor,
      jsonData = window.json[this.chart.id],
      data = {};

    if (jsonData) {
      data = jsonData;
    } else {
      let items = JSON.parse(this.chart.dataset.items);
      let backgroundColors = items.map(function (e) {
        return e.color;
      });
      let labels = items.map(function (e) {
        return e.label;
      });
      let datas = items.map(function (e) {
        return e.value;
      });

      if (backgroundColor) {
        backgroundColors = backgroundColor;
      }

      data = {
        labels: labels,
        datasets: [
          {
            label: label,
            data: datas,
            fill: true,
            backgroundColor: backgroundColors,
            borderColor: borderColor
          }
        ]
      };
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

    if (this.chart.dataset.color) {
      Chart.defaults.color = this.chart.dataset.color;
    }
    new Chart(this.canvas, this.config);
  }
}

// Load charts
const charts = document.querySelectorAll('.block-chart');
charts.forEach((chart) => {
  scrollspy(chart, () => new BlockChart(chart));
});
