/**
 * A11y utilities — focus management helpers.
 */

const FOCUSABLE = 'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])';

/**
 * Lock background elements using the `inert` attribute.
 * Returns a function to restore the previous state.
 */
export function lockBackground(exception) {
  const elements = [...document.querySelectorAll('body > *:not(script)')];
  elements.forEach((el) => {
    if (!el.contains(exception)) el.inert = true;
  });
  return () => elements.forEach((el) => (el.inert = false));
}

/**
 * Move focus to the first focusable element inside a container.
 */
export function focusFirst(container) {
  const el = container.querySelector(FOCUSABLE);
  if (el) el.focus();
}
