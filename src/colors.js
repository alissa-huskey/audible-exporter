/**
 * colors.js
 * ************************************************************************************
 */

Colors = class extends DOM {
  #style = null;
  #css = null;

  selectors = { style: "ae-colors", wrapper: "ae-colors" };

  get css() {
    if (!this.#css) {
      this.#css = `
        /* CSS_MARKER colors */
      `;
    }
    return this.#css;
  }

  get wrapper() {
    return this.style;
  }
}
