document.addEventListener("DOMContentLoaded", function () {
    /* hide offCanvasMenu when clicking an anchors */
    var myOffcanvas = document.getElementById("toc"),
        bsOffcanvas = new bootstrap.Offcanvas(myOffcanvas),
        menuLinks = myOffcanvas.querySelectorAll("a");
    console.log(bsOffcanvas);
    for (var i = 0; i < menuLinks.length; i++) {
        menuLinks[i].addEventListener("click", function (event) {
            bsOffcanvas.hide();
        });
    }
});
  