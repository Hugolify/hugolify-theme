/**
 * Audio — lazy-loads audio sources via IntersectionObserver.
 */
class Audio {
  constructor(el) {
    this.el = el;
    this.observe();
  }

  observe() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.load();
          observer.unobserve(this.el);
        }
      });
    });
    observer.observe(this.el);
  }

  load() {
    Array.from(this.el.children).forEach((source) => {
      if (source.tagName === 'SOURCE' && source.hasAttribute('data-src')) {
        source.src = source.dataset.src;
      }
    });

    this.el.load();
    this.el.classList.remove('is-lazy');
  }
}

// Load audios
document.querySelectorAll('.js-audio.is-lazy').forEach((el) => new Audio(el));
