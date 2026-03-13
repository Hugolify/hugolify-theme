/**
 * Dropdown — vanilla, accessible.
 *
 * CSS classes (mirrors Bootstrap convention):
 * - show       — menu is visible
 * - showing    — added during open transition, removed on shown
 * - hiding     — added during close transition, removed on hidden
 * - is-open    — alias kept for CSS targeting
 *
 * Events (full lifecycle, dispatched on trigger, bubbles):
 * - component:show   — before opening
 * - component:shown  — after opening (transition ends)
 * - component:hide   — before closing
 * - component:hidden — after closing (transition ends)
 *
 * A11y:
 * - aria-expanded on trigger
 * - Escape to close
 * - Click outside to close
 * - Arrow keys to navigate items
 */
class Dropdown {
  constructor(trigger) {
    this.trigger = trigger;
    this.menu = trigger.nextElementSibling;
    this.isOpen = false;
    this._bind();
  }

  _bind() {
    this.trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      this.isOpen ? this.hide() : this.show();
    });

    this.trigger.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); this.show(); this._focusItem(0); }
      if (e.key === 'Escape') this.hide();
    });

    this.menu?.addEventListener('keydown', (e) => {
      const items = this._items();
      const index = items.indexOf(document.activeElement);
      if (e.key === 'ArrowDown') { e.preventDefault(); this._focusItem(index + 1); }
      if (e.key === 'ArrowUp')   { e.preventDefault(); this._focusItem(index - 1); }
      if (e.key === 'Escape')    { this.hide(); this.trigger.focus(); }
      if (e.key === 'Tab')       { this.hide(); }
    });

    document.addEventListener('click', () => this.hide());
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.hide(); });
  }

  _items() {
    return [...(this.menu?.querySelectorAll('a,button') ?? [])];
  }

  _focusItem(index) {
    const items = this._items();
    const target = items[Math.max(0, Math.min(index, items.length - 1))];
    target?.focus();
  }

  _afterTransition(fn) {
    const duration = this.menu
      ? parseFloat(getComputedStyle(this.menu).transitionDuration) * 1000 || 0
      : 0;
    setTimeout(fn, duration);
  }

  show() {
    this.isOpen = true;
    this.trigger.setAttribute('aria-expanded', 'true');
    this.menu?.classList.add('showing');
    this.trigger.dispatchEvent(new CustomEvent('component:show', { bubbles: true }));

    void this.menu?.offsetHeight; // force reflow for CSS transition
    this.menu?.classList.add('is-open', 'show');

    this._afterTransition(() => {
      this.menu?.classList.remove('showing');
      this.trigger.dispatchEvent(new CustomEvent('component:shown', { bubbles: true }));
    });
  }

  hide() {
    if (!this.isOpen) return;
    this.isOpen = false;
    this.trigger.setAttribute('aria-expanded', 'false');
    this.menu?.classList.add('hiding');
    this.menu?.classList.remove('is-open', 'show');
    this.trigger.dispatchEvent(new CustomEvent('component:hide', { bubbles: true }));

    this._afterTransition(() => {
      this.menu?.classList.remove('hiding');
      this.trigger.dispatchEvent(new CustomEvent('component:hidden', { bubbles: true }));
    });
  }
}

const instances = [...document.querySelectorAll('.js-dropdown-toggle')].map(
  (trigger) => new Dropdown(trigger)
);

// Close other dropdowns when one opens
instances.forEach((instance) => {
  instance.trigger.addEventListener('component:show', () => {
    instances.forEach((other) => { if (other !== instance) other.hide(); });
  });
});
