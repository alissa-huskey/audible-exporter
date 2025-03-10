/**
 * Manage elements in the DOM.
 *
 * @requires util.js
 * @requires doc.js
 */

require("./util.js");
require("./doc.js");

DOM = class {
  #style = null;
  #css = null;

  constructor() {
    this.#style = null;
    this.#css = null;
    window.ae = window.ae || {};
  }

  /**
   * CSS content required for an element.
   *
   * @abstract
   */
  get css() {
    return null;
  }

  /**
   * A style tag specific to this element.
   *
   * The contents come from the css getter defined on subclasses.
   *
   * @returns {Doc}
   */
  get style() {
    if (!this.#style) {
      this.#style = Doc.create("style", {
        id: this.selectors.style,
        type: "text/css",
      });

      if (this.#style.element.styleSheet) {
        // Support for IE
        this.#style.element.styleSheet.cssText = this.css;
      } else {
        // Support for the rest
        let node = document.createTextNode(this.css);
        this.#style.append(node);
      }
    }
    return this.#style;
  }

  /**
   * Add the element to the DOM.
   */
  create() {
    let el = Doc.gi(this.selectors.wrapper);
    if (el) el.outerHTML = "";

    document.head.appendChild(this.style.element);
    document.body.appendChild(this.wrapper.element);
  }

  /**
   * Remove the wrapper HTML element from the DOM.
   */
  remove() {
    this.wrapper.element.remove();
  }
};
