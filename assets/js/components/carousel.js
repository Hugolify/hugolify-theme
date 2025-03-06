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
    this.splideJS.src = '/assets/js/splide.min.js';
    document.getElementsByTagName('body')[0].appendChild(this.splideJS);

    // CSS
    this.splideCSS = document.createElement('link');
    this.splideCSS.rel = 'stylesheet';
    this.splideCSS.href = '/assets/css/splide.min.css';
    document.getElementsByTagName('head')[0].appendChild(this.splideCSS);

    this.splideJS.addEventListener('load', () => {
      splideLoaded = true;
      this.init();
    });
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
    new Splide(this.carousel).mount();
  }
}

carousels.forEach((carousel) => {
  scrollspy(carousel, () => {
    new Carousel(carousel);
  });
});
