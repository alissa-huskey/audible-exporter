/**
 * Create a <style> tag for CSS.
 *
 * @requires dom.js
 */
Style = class extends DOM {
  #wrapper = null;
  #css = null;

  selectors = { wrapper: "ae-style" };

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
        /* CSS_MARKER */
      `;
    }
    return this.#css;
  }

  /**
   * Construct the style element.
   *
   * The contents come from the css getter defined on subclasses.
   *
   * @returns {Doc}
   */
  get wrapper() {
    if (!this.#wrapper) {
      this.#wrapper = Doc.create("style", {
        id: this.selectors.wrapper,
        type: "text/css",
      });

      if (this.#wrapper.element.styleSheet) {
        // Support for IE
        this.#wrapper.element.styleSheet.cssText = this.css;
      } else {
        // Support for the rest
        let node = document.createTextNode(this.css);
        this.#wrapper.append(node);
      }
    }
    return this.#wrapper;
  }

  /**
   * Add the style HTML element to the DOM.
   *
   * Special case because this is added to the head, not the body.
   */
  create() {
    document.head.appendChild(this.wrapper.element);
    window.ae.style ||= this;
  }
};
