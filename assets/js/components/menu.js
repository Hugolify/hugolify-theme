/**
 * Menu — sticky header + body class toggles on open/close.
 *
 * Listens to custom events dispatched by components (dropdown, offcanvas, modal).
 */
const header = document.querySelector('header[role="banner"]');

class Menu {
  constructor(elm) {
    this.elm = elm;
    this.previousY = 0;
    this.y = 0;
    this.classSticky = 'is-sticky';
    this.classScrollingDown = 'is-scrolling-down';
    this.classMenuOpen = 'is-menu-open';
    this.classDropdownMenuOpen = 'is-dropdown-menu-open';
    this.componentElm = document.getElementById('navigation');
    this.dropdowns = this.elm.querySelectorAll('.js-dropdown-toggle');
    this.offset = this.elm.offsetHeight;

    this._initDropdowns();
    this._initNavigation();
    this._initSticky();
  }

  _initDropdowns() {
    this.dropdowns.forEach((dropdown) => {
      this._toggleClass(
        dropdown,
        this.classDropdownMenuOpen,
        ['component:shown'],
        ['component:hidden']
      );
    });
  }

  _initNavigation() {
    if (this.componentElm) {
      this._toggleClass(
        this.componentElm,
        this.classMenuOpen,
        ['offcanvas:shown', 'modal:shown'],
        ['offcanvas:hidden', 'modal:hidden']
      );
    }
  }

  _initSticky() {
    ['scroll', 'touchmove'].forEach((event) => {
      window.addEventListener(event, () => {
        this.y = window.scrollY;

        this.elm.classList.toggle(this.classSticky, this.y > this.offset);
        document.documentElement.classList.toggle(
          this.classScrollingDown,
          this.y > this.previousY && this.y > this.offset
        );

        this.previousY = this.y;
      });
    });
  }

  _toggleClass(elm, toggleClass, showEvents, hideEvents) {
    showEvents.forEach((e) => {
      elm.addEventListener(e, () => {
        document.documentElement.classList.add(toggleClass);
      });
    });

    hideEvents.forEach((e) => {
      elm.addEventListener(e, () => {
        document.documentElement.classList.remove(toggleClass);
      });
    });
  }
}

if (header) {
  new Menu(header);
}
