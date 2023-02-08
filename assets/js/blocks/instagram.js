// https://github.com/stevenschobert/instafeed.js/
import scrollspy from '../utils/scrollspy';
import Instafeed from '../vendors/instafeed/instafeed.js'

const instagrams = document.querySelectorAll('.block-instagram');
const instagramTemplate = '<div><a href="{{link}}" target="_blank"><img title="{{caption}}" src="{{image}}" alt="" width="720" height="720"></a></div>';

instagrams.forEach((instagram) => {
    scrollspy(instagram, () => {
        let elm = instagram.querySelector('.instagram');
        if (elm) {
            let datas = elm.dataset;
            let instagramToken = datas.token;
            let instagramLimit = parseInt(datas.limit, 10);
            let instafeedLoaded = false;
            if (!instafeedLoaded) {
                const feed = new Instafeed({
                    target: elm,
                    limit: instagramLimit,
                    accessToken: instagramToken,
                    template: instagramTemplate
                });
                feed.run();
                instafeedLoaded = true;
            }
        }
    });
});