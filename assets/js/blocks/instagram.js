// https://github.com/stevenschobert/instafeed.js/
import scrollspy from '../utils/scrollspy';

const instagrams = document.querySelectorAll('.block-instagram');
let instafeedLoaded = false;

class BlockInstagram {
  constructor(block) {
    this.instagram = block.querySelector('.js-instagram');
    if (this.instagram) {
      if (!instafeedLoaded) {
        this.addFiles();
      } else {
        this.init();
      }
    }
  }

  addFiles() {
    this.instafeedJS = document.createElement('script');
    this.instafeedJS.type = 'text/javascript';
    // this.instafeedJS.src = 'https://unpkg.com/instafeed.js@2.0.0/dist/instafeed.min.js';
    this.instafeedJS.src = '/assets/js/instafeed.min.js';
    document.getElementsByTagName('body')[0].appendChild(this.instafeedJS);

    this.instafeedJS.addEventListener('load', () => {
      instafeedLoaded = true;
      this.init();
    });
  }

  init() {
    let instagramTemplate =
        '<div><a href="{{link}}" target="_blank"><img title="{{caption}}" src="{{image}}" alt="" width="720" height="720"></a></div>',
      datas = this.instagram.dataset,
      instagramToken = datas.token,
      instagramLimit = parseInt(datas.limit, 10);
    const feed = new Instafeed({
      target: this.instagram,
      limit: instagramLimit,
      accessToken: instagramToken,
      template: instagramTemplate
    });
    feed.run();
  }
}

instagrams.forEach((instagram) => {
  scrollspy(instagram, () => {
    new BlockInstagram(instagram);
  });
});
