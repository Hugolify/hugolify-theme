import Tobii from '@midzer/tobii'
const tobii = new Tobii({
    captionsSelector: "self",
    captionAttribute: "data-caption",
    zoom: false,
    navLabel: ["Image précédente", "Image suivante"],
    closeLabel: "Fermer"
})
