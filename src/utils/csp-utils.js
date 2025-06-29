const CSPUtils = {
  // Element visibility control
  show(element, displayType = 'block') {
    if (!element) return;
    element.classList.remove('hidden-element', 'invisible-element');
    switch (displayType) {
      case 'inline':
        element.classList.add('visible-inline');
        break;
      case 'flex':
        element.classList.add('visible-flex');
        break;
      default:
        element.classList.add('visible-element');
    }
  },

  hide(element, method = 'display') {
    if (!element) return;
    element.classList.remove('visible-element', 'visible-inline', 'visible-flex');
    if (method === 'visibility') {
      element.classList.add('invisible-element');
    } else {
      element.classList.add('hidden-element');
    }
  },

  // State management
  applyState(element, state) {
    if (!element) return;
    element.classList.remove(
      'error-state',
      'success-state',
      'warning-state',
      'loading-state',
      'disabled-state'
    );
    if (state) {
      element.classList.add(`${state}-state`);
    }
  },

  // Focus management
  addFocusOutline(element) {
    if (element) element.classList.add('focus-outline');
  },

  removeFocusOutline(element) {
    if (element) element.classList.remove('focus-outline');
  },

  // Loading states
  showLoading(element, size = 'medium') {
    if (!element) return;
    element.classList.add('loading-state');
    const spinner = document.createElement('span');
    spinner.className = `spinner-${size}`;
    spinner.setAttribute('aria-hidden', 'true');
    spinner.dataset.cspSpinner = 'true';
    element.appendChild(spinner);
  },

  hideLoading(element) {
    if (!element) return;
    element.classList.remove('loading-state');
    const spinner = element.querySelector('[data-csp-spinner]');
    if (spinner) spinner.remove();
  },

  executeScript(code) {
    try {
      new Function(code)();
    } catch (error) {
      console.error('Script execution error:', error);
    }
  },

  dispatchCustomEvent(element, eventName, detail = {}) {
    if (!element || !eventName) return;
    const event = new CustomEvent(eventName, {
      detail,
      bubbles: true,
      cancelable: true,
    });
    element.dispatchEvent(event);
  },
};

window.CSPUtils = CSPUtils;
export default CSPUtils;
