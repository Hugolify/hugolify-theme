// https://splidejs.com
import scrollspy from '../utils/scrollspy';

const carousels = document.querySelectorAll('.js-carousel');
let splideLoaded = false;

class Carousel {
  constructor(carousel) {
    this.carousel = carousel;

    if (!splideLoaded) {
      this.addFiles();
    } else {
      this.init();
    }
  }

  addFiles() {
    // JS
    this.splideJS = document.createElement('script');
    this.splideJS.type = 'text/javascript';
    this.splideJS.src =
      'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/js/splide.min.js';
    document.getElementsByTagName('body')[0].appendChild(this.splideJS);

    // CSS
    this.splideCSS = document.createElement('link');
    this.splideCSS.rel = 'stylesheet';
    this.splideCSS.href =
      'https://cdn.jsdelivr.net/npm/@splidejs/splide@4.1.4/dist/css/splide.min.css';
    document.getElementsByTagName('head')[0].appendChild(this.splideCSS);

    this.splideJS.addEventListener('load', () => {
      splideLoaded = true;
      this.init();
    });
  }

  init() {
    new Splide(this.carousel).mount();
  }
}

carousels.forEach((carousel) => {
  scrollspy(carousel, () => {
    new Carousel(carousel);
  });
});
