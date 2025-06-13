import Tooltip from 'js/bootstrap/src/tooltip';

const tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
const tooltipList = tooltipTriggerList.map(
  (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
);
