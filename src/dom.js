/**
 * Manage elements in the DOM.
 */

require("./util.js");
require("./doc.js");

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

    document.body.appendChild(this.wrapper.element);
  }

  /**
   * Remove the wrapper HTML element from the DOM.
   */
  remove() {
    this.wrapper.element.remove();
  }
};
