document.addEventListener("DOMContentLoaded", function () {
    /* hide offCanvasMenu when clicking an anchors */
    const myOffcanvas = document.getElementById("toc");
    if (myOffcanvas) {
        const bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas);
        const menuLinks = myOffcanvas.querySelectorAll("a");
        for (var i = 0; i < menuLinks.length; i++) {
            menuLinks[i].addEventListener("click", function (event) {
                bsOffcanvas.hide();
            });
        }
    }
});
  