import { Tooltip } from '../vendors/bootstrap';

const tooltipTriggerList = [].slice.call(
  document.querySelectorAll('[data-bs-toggle="tooltip"]')
);
const tooltipList = tooltipTriggerList.map(
  (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
);
