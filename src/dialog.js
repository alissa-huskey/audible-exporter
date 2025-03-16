/**
 * Modal dialog box.
 */

require("./util.js");
require("./styled.js");

Dialog = class extends Styled {
  #wrapper = null;
  #head = null;
  #content = null;
  #copy = null;
  #actions = null;
  #close_btn = null;

  title = "";

  #selectors = {
    wrapper: "ae-modal",
    content: "ae-content",
    head: "ae-head",
    copy: "ae-copy",
    actions: "ae-actions",
    close_btn: "ae-close-btn",
  };

  get selectors() {
    return this.#selectors;
  }

  /* Elements
   ***************************************************************************/

  /**
   * Construct wrapper div, append all child elements.
   *
   * @returns {Doc}
   */
  createWrapper(id) {
    let wrapper = Doc.create("dialog", {
      class: "ae-wrapper ae-modal",
    });
    if (id) wrapper.id = id;

    wrapper.append(this.content);

    return wrapper;
  }

  get wrapper() {
    if (!this.#wrapper) {
      this.#wrapper = this.createWrapper();
    }
    return this.#wrapper;
  }

  /**
   * div element for the main content.
   */
  get content() {
    if (!this.#content) {
      let content = Doc.create("form", {
        class: this.selectors.content,
        method: "dialog",
      });

      content.append(this.head);
      content.append(this.copy);

      this.#content = content;
    }
    return this.#content;
  }

  /**
   * div element for the head section.
   */
  get head() {
    if (!this.#head) {
      let head = Doc.create("div", { class: this.selectors.head });

      head.append(this.close_btn);

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
      this.#copy = Doc.create("div", { class: this.selectors.copy });
    }
    return this.#copy;
  }

  /**
   * div element for the interactive elements.
   *
   * @returns {Doc}
   */
  get actions() {
    if (!this.#actions) {
      let actions = Doc.create("div", { class: this.selectors.actions });

      this.#actions = actions;
    }
    return this.#actions;
  }

  /**
   * Close button element.
   *
   * @listens click
   *
   * @returns {Doc}
   */
  get close_btn() {
    if (!this.#close_btn) {
      let btn = Doc.create("button", {
        class: this.selectors.close_btn,
        formmethod: "dialog",
      });
      btn.innerHTML = "&times;";
      this.#close_btn = btn;
    }
    return this.#close_btn;
  }

  /* Methods
   ***************************************************************************/

  /**
   * Show the dialog.
   */
  show() {
    this.wrapper.element.showModal();
  }

  /**
   * Hide the dialog.
   */
  hide() {
    this.wrapper.element.close();
  }

  /**
   * Add the wrapper HTML element to the DOM and display.
   */
  create() {
    super.create();
    window.ae.modal = this;
    this.show();
  }
};
