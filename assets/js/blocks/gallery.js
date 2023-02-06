import scrollspy from '../utils/scrollspy';
import Tobii from '../vendors/tobii'

const galleries = document.querySelectorAll('.block-gallery');
let lightboxLoaded = false;

galleries.forEach((gallery) => {
    scrollspy(gallery, () => {
        if (!lightboxLoaded) {
            const closeLabel = window.i18n.close
            const nextLabel = window.i18n.next
            const previousLabel = window.i18n.previous
            const tobii = new Tobii({
                captionsSelector: "self",
                captionAttribute: "data-caption",
                zoom: false,
                navLabel: [previousLabel, nextLabel],
                closeLabel: closeLabel
            })
            console.log(lightboxLoaded);
        }
    });
});