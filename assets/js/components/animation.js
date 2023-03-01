import scrollspy from '../utils/scrollspy';

const elements = document.querySelectorAll('[data-anim]');
document.addEventListener('DOMContentLoaded', function () {
    elements.forEach((elm) => {
        scrollspy(elm, () => {
            elm.dataset.animShow = true;
        });
    });
});
