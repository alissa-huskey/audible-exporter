/**
 * Modal dialog box.
 */

require("./util.js");
require("./dialog.js");

ErrorDialog = class extends Dialog {
  #wrapper = null;
  #head = null;
  #content = null;
  #close_btn = null;
  #copy = null;

  constructor(paragraphs = []) {
    super();
    this.paragraphs = paragraphs;
  }

  /* Elements
   ***************************************************************************/

  /**
   * Construct wrapper dialog element and append all its child elements.
   *
   * @returns {Doc}
   */
  get wrapper() {
    if (!this.#wrapper) {
      let wrapper = super.wrapper;
      wrapper.classList.add("ae-error");
      this.#wrapper = wrapper;
    }
    return this.#wrapper;
  }

  /**
   * div element for the head section.
   */
  get head() {
    if (!this.#head) {
      let head = super.head;

      head.append(this.h1("Oh no!"));

      this.#head = head;
    }
    return this.#head;
  }

  /**
   * div element for the copy section.
   *
   * @returns {Doc}
   */
  get copy() {
    if (!this.#copy) {
      this.#copy = super.copy;

      this.paragraphs.forEach((text) => {
        this.#copy.append(this.p(text));
      });
    }
    return this.#copy;
  }
};
