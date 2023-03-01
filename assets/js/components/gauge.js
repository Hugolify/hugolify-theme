import scrollspy from '../utils/scrollspy';

const gauges = document.querySelectorAll('.js-gauge');
document.addEventListener('DOMContentLoaded', function () {
    gauges.forEach((gauge) => {
        scrollspy(gauge, () => {
            gauge.classList.add("show");
        });
    });
});
