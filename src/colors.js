/**
 * Create a <style> tag for the shared CSS colors.
 *
 * @requires dom.js
 */

require("./util.js");
require("./doc.js");
require("./dom.js");

Colors = class extends DOM {
  #style = null;
  #css = null;

  selectors = { style: "ae-colors", wrapper: "ae-colors" };

  /**
   * The CSS.
   *
   * On build, the CSS_MARKER line will be replaced with the contents of
   * notifier.css.
   *
   * @returns {string}
   */
  get css() {
    if (!this.#css) {
      this.#css = `
        /* CSS_MARKER colors */
      `;
    }
    return this.#css;
  }

  /**
   * Construct the style element.
   *
   * @returns {Doc}
   */
  get wrapper() {
    return this.style;
  }

  /**
   * Add the style HTML element to the DOM.
   */
  create() {
    super.create();
    window.ae.colors = window.ae.colors || this;
  }

  /**
   * Remove the style HTML element from the DOM.
   */
  remove() {
    this.wrapper.element.remove();
  }
};
