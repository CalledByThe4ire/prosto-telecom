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
  },
  /**
   * Add one or more listeners to an element
   * @param  {HTMLElement} element - DOM element to add listeners to
   * @param  {String} eventNames - space separated list of event names, e.g. 'click change'
   * @param  {Function} listener - function to attach for each event as a listener
   */
  addListenerMulti(element, eventNames, listener) {
    eventNames.split(` `).forEach(e => element.addEventListener(e, listener, false));
  }
};

export default utils;
