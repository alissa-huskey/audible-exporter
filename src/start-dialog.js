/**
 * Modal pop-up window for starting the exporter.
 */

require("./util.js");
require("./dialog.js");

StartDialog = class extends Dialog {
  #wrapper = null;
  #content = null;
  #actions = null;
  #close_btn = null;
  #ft_select = null;
  #start_btn = null;
  #file = null;

  #selectors = {
    start_btn: "ae-start-btn",
  };

  get selectors() {
    return Object.assign({}, super.selectors, this.#selectors);
  }

  /* Elements
   ***************************************************************************/

  /**
   * Construct wrapper div, append all child elements.
   *
   * @returns {Doc}
   */
  get wrapper() {
    if (!this.#wrapper) {
      this.#wrapper = this.createWrapper("ae-start-modal");
    }
    return this.#wrapper;
  }

  /**
   * The div element for the main content of the modal.
   *
   * @returns {Doc}
   */
  get content() {
    if (!this.#content) {
      let content = super.content;

      let ul = Doc.create("ul");

      content.append(this.copy);

      let need = [
        "be on audible.com and logged in.",
        "not close this browser window.",
        "not navigate away from this page.",
        "stay online (avoid sleep mode).",
      ];

      ul.append(...need.map((text) => this.li(text)));

      this.copy.append(
        this.p("This will export your audible library. It might take awhile."),
        this.p("Until it's done, you must:"),
        ul,
        this.p("Click the button to get started!"),
        this.actions,
      );

      this.#content = content;
    }
    return this.#content;
  }

  get actions() {
    if (!this.#actions) {
      this.#actions = super.actions;
      this.#actions.append(this.start_btn);
    }
    return this.#actions;
  }

  get start_btn() {
    if (!this.#start_btn) {
      let btn = this.button("Start", { id: this.selectors.start_btn });

      btn.listen("click", this.start, false);

      this.#start_btn = btn;
    }
    return this.#start_btn;
  }

  /**
   * Event listner to start the exporter.
   */
  async start(evt) {
    window.ae?.modal?.hide();

    if (window.ae?.run) {
      await window.ae.run();
    }
  }
};
