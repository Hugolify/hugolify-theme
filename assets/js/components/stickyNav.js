const events = ['scroll', 'touchmove'];
let previousY = 0,
    y = 0,
    classSticky = 'is-sticky',
    classScrollingDown = 'is-scrolling-down',
    classMenuOpen = 'is-menu-open',
    header = document.querySelector('header[role="banner"]'),
    offset = header.offsetHeight,
    dropdowns = header.querySelectorAll('[data-bs-toggle="dropdown"]'),
    menu = header.querySelector('.menu');

dropdowns.forEach((dropdown) => {
    dropdown.addEventListener('hidden.bs.dropdown', () => {
        if (!header.querySelector('[aria-expanded="true"]')) {
            document.documentElement.classList.remove(classMenuOpen);
        }
    });
    dropdown.addEventListener('show.bs.dropdown', () => {
        document.documentElement.classList.add(classMenuOpen);
    });
});

// menu.addEventListener('show.bs.collapse', () => {
//     document.documentElement.classList.add(classMenuOpen);
// });

// menu.addEventListener('hide.bs.collapse', () => {
//     document.documentElement.classList.remove(classMenuOpen);
// });

events.forEach((event) => {
    window.addEventListener(event, () => {
        y = window.scrollY;

        if (y > offset) {
            header.classList.add(classSticky);
        } else {
            header.classList.remove(classSticky);
        }

        if (y > previousY && y > offset) {
            document.documentElement.classList.add(classScrollingDown);
        } else {
            document.documentElement.classList.remove(classScrollingDown);
        }

        previousY = y;
    });
});