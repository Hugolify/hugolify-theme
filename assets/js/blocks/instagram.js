/**
 * Instagram — lazy-loads Instafeed.js via a shared promise.
 * Instafeed is injected dynamically on first use;
 * subsequent blocks wait on the same promise (no duplicate loading).
 *
 * @see https://github.com/stevenschobert/instafeed.js/
 */
/* global Instafeed */
import scrollspy from '../utils/scrollspy';

// Instafeed script
let instafeedLoadPromise = null;
function loadInstafeed() {
  if (instafeedLoadPromise) return instafeedLoadPromise;

  instafeedLoadPromise = new Promise((resolve) => {
    const js = document.createElement('script');
    js.type = 'text/javascript';
    js.src = '/assets/js/instafeed.min.js';
    js.addEventListener('load', resolve);
    document.body.appendChild(js);
  });

  return instafeedLoadPromise;
}

// Instagram class
class BlockInstagram {
  constructor(block) {
    this.instagram = block.querySelector('.js-instagram');
    if (this.instagram) {
      loadInstafeed().then(() => this.init());
    }
  }

  init() {
    const datas = this.instagram.dataset;
    const feed = new Instafeed({
      target: this.instagram,
      limit: parseInt(datas.limit, 10),
      accessToken: datas.token,
      template: '<div><a href="{{link}}" target="_blank"><img title="{{caption}}" src="{{image}}" alt="" width="720" height="720"></a></div>'
    });
    feed.run();
  }
}

// Load instagrams
const instagrams = document.querySelectorAll('.block-instagram');
instagrams.forEach((instagram) => {
  scrollspy(instagram, () => new BlockInstagram(instagram));
});
