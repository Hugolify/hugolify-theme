import Offcanvas from 'js/bootstrap/src/offcanvas';

document.addEventListener('DOMContentLoaded', function () {
  /* hide offCanvasMenu when clicking an anchors */
  if (window.matchMedia('(max-width: 991.98px)').matches) {
    const myOffcanvas = document.getElementById('toc');
    if (myOffcanvas) {
      const bsOffcanvas = new Offcanvas(myOffcanvas);
      const menuLinks = myOffcanvas.querySelectorAll('a');
      for (var i = 0; i < menuLinks.length; i++) {
        menuLinks[i].addEventListener('click', function (event) {
          event.preventDefault();
          bsOffcanvas.hide();
          setTimeout(() => {
            location = event.target;
          }, '500');
        });
      }
    }
  }
});
