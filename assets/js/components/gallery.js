// https://github.com/midzer/tobii/
import scrollspy from '../utils/scrollspy';
import Tobii from '../vendors/tobii';

const galleries = document.querySelectorAll('.js-gallery');
let lightboxLoaded = false;

class Gallery {
  constructor(div) {
    this.gallery = div;
    if (this.gallery) {
      if (!lightboxLoaded) {
        this.init();
      }
    }
  }

  init() {
    lightboxLoaded = true;
    const closeLabel = window.i18n.close;
    const nextLabel = window.i18n.next;
    const previousLabel = window.i18n.previous;
    const tobii = new Tobii({
      captionsSelector: 'self',
      captionAttribute: 'data-caption',
      zoom: false,
      navLabel: [previousLabel, nextLabel],
      closeLabel: closeLabel
    });
  }
}

galleries.forEach((gallery) => {
  scrollspy(gallery, () => {
    new Gallery(gallery);
  });
});
