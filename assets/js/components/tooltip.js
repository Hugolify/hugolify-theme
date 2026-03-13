/**
 * Tooltip — vanilla, accessible.
 *
 * A11y:
 * - role="tooltip" on the tooltip element
 * - aria-describedby on the trigger pointing to the tooltip id
 * - Shown on hover and focus, hidden on mouseleave, blur and Escape
 * - Uses data-tooltip attribute (or title, which is moved to data-tooltip)
 */
class Tooltip {
  constructor(trigger) {
    this.trigger = trigger;
    this.text = trigger.getAttribute('data-tooltip') || trigger.getAttribute('title') || '';
    if (!this.text) return;

    // Move title to data-tooltip to prevent the native browser tooltip
    if (trigger.hasAttribute('title')) {
      trigger.setAttribute('data-tooltip', this.text);
      trigger.removeAttribute('title');
    }

    this._tip = null;
    this._id = 'tooltip-' + Math.random().toString(36).slice(2);
    this._bind();
  }

  _bind() {
    this.trigger.addEventListener('mouseenter', () => this.show());
    this.trigger.addEventListener('focus', () => this.show());
    this.trigger.addEventListener('mouseleave', () => this.hide());
    this.trigger.addEventListener('blur', () => this.hide());
    this.trigger.addEventListener('keydown', (e) => { if (e.key === 'Escape') this.hide(); });
  }

  show() {
    if (this._tip) return;
    this._tip = document.createElement('div');
    this._tip.id = this._id;
    this._tip.setAttribute('role', 'tooltip');
    this._tip.className = 'tooltip bs-tooltip-top fade';
    this._tip.innerHTML = '<div class="tooltip-inner"></div><div class="tooltip-arrow"></div>';
    this._tip.querySelector('.tooltip-inner').textContent = this.text;
    document.body.appendChild(this._tip);
    this.trigger.setAttribute('aria-describedby', this._id);
    this._position();
    void this._tip.offsetHeight; // force reflow so fade transition fires
    this._tip.classList.add('show');
  }

  hide() {
    if (!this._tip) return;
    this._tip.classList.remove('show');
    const el = this._tip;
    this._tip = null;
    this.trigger.removeAttribute('aria-describedby');
    const duration = parseFloat(getComputedStyle(el).transitionDuration) * 1000 || 0;
    setTimeout(() => el.remove(), duration);
  }

  _position() {
    if (!this._tip) return;
    this._tip.style.position = 'absolute'; // set before measuring so width is auto/max-content
    const rect = this.trigger.getBoundingClientRect();
    const tip = this._tip.getBoundingClientRect();
    const top = rect.top + window.scrollY - tip.height;
    const left = rect.left + window.scrollX + (rect.width - tip.width) / 2;
    this._tip.style.top = `${top}px`;
    this._tip.style.left = `${Math.max(8, left)}px`;
  }
}

document.querySelectorAll('.js-tooltip').forEach((el) => new Tooltip(el));
