const header = document.querySelector('header[role="banner"]');

class Menu {
  constructor(elm) {
    this.elm = elm;
    this.init();
  }
  init() {
    this.events = ['scroll', 'touchmove'];
    this.previousY = 0;
    this.y = 0;
    this.classSticky = 'is-sticky';
    this.classScrollingDown = 'is-scrolling-down';
    this.classMenuOpen = 'is-menu-open';
    this.classDropdownMenuOpen = 'is-dropdown-menu-open';
    this.offcanvas = document.getElementById('navigation');
    this.dropdowns = this.elm.querySelectorAll('[data-bs-toggle="dropdown"]');
    this.offset = this.elm.offsetHeight;

    this.initDropdowns();
    this.initOffcanvas();
    this.initSticky();
  }
  initDropdowns() {
    this.dropdowns.forEach((dropdown) => {
      this.toggleMenu(dropdown, 'dropdown', this.classDropdownMenuOpen);
    });
  }
  initOffcanvas() {
    this.toggleMenu(this.offcanvas, 'offcanvas', this.classMenuOpen);
  }
  initSticky() {
    this.events.forEach((event) => {
      window.addEventListener(event, () => {
        this.y = window.scrollY;

        if (this.y > this.offset) {
          this.elm.classList.add(this.classSticky);
        } else {
          this.elm.classList.remove(this.classSticky);
        }

        if (this.y > this.previousY && this.y > this.offset) {
          document.documentElement.classList.add(this.classScrollingDown);
        } else {
          document.documentElement.classList.remove(this.classScrollingDown);
        }

        this.previousY = this.y;
      });
    });
  }
  toggleMenu(elm, component, toggleClass) {
    elm.addEventListener('hidden.bs.' + component, () => {
      if (!this.elm.querySelector('[aria-expanded="true"]')) {
        document.documentElement.classList.remove(toggleClass);
      }
    });
    elm.addEventListener('show.bs.' + component, () => {
      document.documentElement.classList.add(toggleClass);
    });
  }
}

if (header) {
  new Menu(header);
}
