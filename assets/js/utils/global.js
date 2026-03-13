/**
 * Global — removes the `preload` class from body after page load.
 * Prevents CSS transitions from firing on initial paint.
 */
window.addEventListener('load', () => {
  document.body.classList.remove('preload');
});
