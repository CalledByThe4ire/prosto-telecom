const utils = {
	/**
	 * 'closest' method for IE10+
	 * @param {HTMLElement} el
	 * @param {HTMLElement} selector
	 * @return {HTMLElement}
	 */
  closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;

    while (el) {
      if (!matchesSelector.call(el, selector)) {
        el = el.parentElement;
      } else {
        return el;
      }
    }
    return null;
  },
  /**
   * Transforms HTMLCollection into Array
   * @param  {HTMLCollection} selector
   * @param  {HTMLElement} context
   * @return {Array<String>}
   */
  $$(selector, context) {
    context = context || document;
    const elements = context.querySelectorAll(selector);
    return Array.prototype.slice.call(elements);
  }
};

export default utils;
