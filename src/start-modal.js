/**
 * Modal pop-up window for starting the exporter.
 *
 * @requires modal.js
 */

require("./util.js");
require("./modal.js");

StartModal = class extends Modal {
  #wrapper = null;
  #content = null;
  #close_btn = null;
  #ft_select = null;
  #start_btn = null;
  #file = null;

  title = "Export your audible library.";

  selectors = {
    wrapper: "ae-modal",
    content: "ae-content",
    head: "ae-head",
    close_btn: "ae-close-btn",

    start_btn: "ae-start-btn",
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
      this.#wrapper = super.wrapper;
      this.#wrapper.id = "ae-start-modal";
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
      let copy = Doc.create("div", { class: "ae-copy" });

      let btn_wrapper = Doc.create("span", { id: "ae-start-btn" });
      let ul = Doc.create("ul");

      btn_wrapper.append(this.start_btn);

      content.append(copy);

      copy.append(
        this.p("This will export your audible library. It might take awhile."),
      );

      copy.append(this.p("Until it's done, you must:"), ul);

      let need = [
        "be on audible.com and logged in.",
        "not close this browser window.",
        "not navigate away from this page.",
        "stay online (avoid sleep mode).",
      ];

      ul.append(...need.map((text) => this.li(text)));

      copy.append(
        this.p("Click the button to get started!"),
        btn_wrapper.element,
      );

      this.#content = content;
    }
    return this.#content;
  }

  /**
   * Create a paragraph element.
   *
   * @params {string} text  Inner text
   *
   * returns {Doc}
   */
  p(text) {
    let p = Doc.create("p");
    p.innerHTML = text;
    return p;
  }

  /**
   * Create a list element.
   *
   * @params {string} text  Inner text
   *
   * returns {Doc}
   */
  li(text) {
    let li = Doc.create("li");
    li.innerHTML = text;
    return li;
  }

  get start_btn() {
    if (!this.#start_btn) {
      let btn = Doc.create("a", {
        id: this.selectors.start_btn,
        class: "ae-btn",
      });
      btn.attributes.href = "#";
      btn.innerHTML = "Start";

      btn.element.addEventListener(
        "click",
        async (evt) => {
          window.ae?.modal?.remove();

          if (window.ae?.run) {
            await window.ae.run();
          }
        },
        false,
      );

      this.#start_btn = btn;
    }
    return this.#start_btn;
  }

  create() {
    super.create();
  }
};
