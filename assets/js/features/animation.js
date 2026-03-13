/**
 * Animation — triggers CSS animations when elements enter the viewport.
 * Sets data-anim-show="true" on each [data-anim] element on first intersection.
 */
import scrollspy from '../utils/scrollspy';

const elements = document.querySelectorAll('[data-anim]');
document.addEventListener('DOMContentLoaded', function () {
  elements.forEach((elm) => {
    scrollspy(elm, () => {
      elm.dataset.animShow = true;
    });
  });
});
