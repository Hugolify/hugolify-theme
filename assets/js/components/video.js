/**
 * Video — lazy-loads video sources via IntersectionObserver.
 * Supports mobile/desktop source variants via data-src_mobile / data-src.
 */
class Video {
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
    const isMobile = window.matchMedia('(max-width: 767px)').matches;
    const hasMobile = Array.from(this.el.children).some(
      (s) => s.tagName === 'SOURCE' && s.hasAttribute('data-src_mobile')
    );

    Array.from(this.el.children).forEach((source) => {
      if (source.tagName !== 'SOURCE') return;
      if (isMobile && hasMobile && source.hasAttribute('data-src_mobile')) {
        source.src = source.dataset.src_mobile;
      } else if (source.hasAttribute('data-src')) {
        source.src = source.dataset.src;
      }
    });

    this.el.load();
    this.el.classList.remove('is-lazy');
  }
}

// Load videos
document.querySelectorAll('.js-video.is-lazy').forEach((el) => new Video(el));
