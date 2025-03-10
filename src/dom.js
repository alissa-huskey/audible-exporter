/**
 * Manage elements in the DOM.
 *
 * @requires util.js
 * @requires doc.js
 */
DOM = class {
  constructor() {
    window.ae ||= {};
  }

  /**
   * Add the element to the DOM.
   */
  create() {
    let el = Doc.gi(this.selectors.wrapper);
    if (el) el.outerHTML = "";

    if (!window.ae.style) {
      let style = new Style();
      style.create();
      window.ae.style = style;
    }

    document.body.appendChild(this.wrapper.element);
  }

  /**
   * Remove the wrapper HTML element from the DOM.
   */
  remove() {
    this.wrapper.element.remove();
  }
};
