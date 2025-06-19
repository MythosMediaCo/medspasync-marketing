export const CSPUtils = {
  show(element, displayType = 'block') {
    if (element) {
      element.classList.remove('hidden-element');
      if (displayType !== 'block') {
        element.style.display = displayType;
      }
    }
  },
  hide(element) {
    if (element) {
      element.classList.add('hidden-element');
    }
  },
  applyState(element, state) {
    if (!element) return;
    element.classList.remove('error-state', 'success-state', 'loading-state');
    if (state) element.classList.add(state);
  },
  executeScript(code) {
    const fn = new Function(code);
    fn();
  },
  dispatchCustomEvent(element, eventName, detail = {}) {
    if (element) {
      const event = new CustomEvent(eventName, { detail });
      element.dispatchEvent(event);
    }
  }
};

