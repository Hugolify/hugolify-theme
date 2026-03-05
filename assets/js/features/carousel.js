/**
 * Carousel — lazy-loads Splide via a shared promise.
 * Splide (JS + CSS) is injected dynamically on first use;
 * subsequent carousels wait on the same promise (no duplicate loading).
 *
 * @see https://splidejs.com/
 */
/* global Splide */
import scrollspy from '../utils/scrollspy';

// Splide scripts
let splideLoadPromise = null;
function loadSplide() {
  if (splideLoadPromise) return splideLoadPromise;

  splideLoadPromise = new Promise((resolve) => {
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = '/assets/css/splide.min.css';
    document.head.appendChild(css);

    const js = document.createElement('script');
    js.type = 'text/javascript';
    js.src = '/assets/js/splide.min.js';
    js.addEventListener('load', resolve);
    document.body.appendChild(js);
  });

  return splideLoadPromise;
}

// Carousel class
class Carousel {
  constructor(carousel) {
    this.carousel = carousel;
    loadSplide().then(() => this.init());
  }

  init() {
    this.initI18n();
    this.initCarousel();
  }

  initI18n() {
    Splide.defaults = {
      i18n: window.i18n.carousel
    };
  }

  initCarousel() {
    const splide = new Splide(this.carousel).mount();
    this.eventsCarousel(splide);
  }

  eventsCarousel(splide) {
    splide.on('click', (slide, e) => {
      if (e.pointerType === 'mouse') splide.go(slide.index);
    });
  }
}

// Load carousels
const carousels = document.querySelectorAll('.js-carousel');
carousels.forEach((carousel) => {
  scrollspy(carousel, () => new Carousel(carousel));
});
