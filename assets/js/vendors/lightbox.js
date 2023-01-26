import Tobii from '@midzer/tobii'
const closeLabel = window.i18n.close
const nextLabel =window.i18n.next
const previousLabel = window.i18n.previous
const tobii = new Tobii({
    captionsSelector: "self",
    captionAttribute: "data-caption",
    zoom: false,
    navLabel: [previousLabel, nextLabel],
    closeLabel: closeLabel
})