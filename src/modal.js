/**
 * Modal popup windows.
 *
 * @requires util.js
 * @requires doc.js
 * @requires dom.js
 */
Modal = class extends DOM {
  #css = null;
  #wrapper = null;
  #head = null;
  #content = null;
  #close_btn = null;

  title = "";

  selectors = {
    style: "ae-modal-css",
    wrapper: "ae-modal",
    content: "ae-content",
    head: "ae-head",
    close_btn: "ae-close-btn",
  };

  /* Elements
   ***************************************************************************/

  /**
   * Construct wrapper div, append all child elements.
   *
   * @returns {Doc}
   */
  get wrapper() {
    if (!this.#wrapper) {
      let wrapper = Doc.create("div", { class: this.selectors.wrapper });

      wrapper.element.appendChild(this.content.element);

      wrapper.style["z-index"] = new Date().getTime();

      this.#wrapper = wrapper;
    }
    return this.#wrapper;
  }

  /**
   * div element for the head section.
   */
  get head() {
    if (!this.#head) {
      let head = Doc.create("div", { class: this.selectors.head });

      head.element.appendChild(this.close_btn.element);

      this.#head = head;
    }
    return this.#head;
  }

  /**
   * div element for the main content.
   */
  get content() {
    if (!this.#content) {
      let content = Doc.create("div", { class: this.selectors.content });

      content.element.appendChild(this.head.element);

      this.#content = content;
    }
    return this.#content;
  }

  /**
   * Close button a element.
   *
   * @listens click
   *
   * @returns {Doc}
   */
  get close_btn() {
    if (!this.#close_btn) {
      let btn = Doc.create("a", { id: this.selectors.close_btn });
      btn.innerHTML = "&times;";
      btn.attributes.href = "#";

      btn.element.addEventListener(
        "click",
        () => {
          this.hide();
        },
        false,
      );
      this.#close_btn = btn;
    }
    return this.#close_btn;
  }

  /* Methods
   ***************************************************************************/

  /**
   * Show the modal.
   */
  show() {
    this.wrapper.style.display = "block";
  }

  /**
   * Hide the modal.
   */
  hide() {
    this.wrapper.style.display = "none";
  }

  /**
   * Add the wrapper HTML element to the DOM.
   */
  create() {
    window.ae.modal ||= this;
    let colors = window.ae.colors || new Colors();
    colors.create();
    super.create();
  }

  /**
   * Add the wrapper HTML element to the DOM.
   */
  remove() {
    super.remove();
    if (window.ae?.modal) {
      window.ae.modal = null;
    }
  }
};
