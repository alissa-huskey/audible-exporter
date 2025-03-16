/**
 * Modal pop-up window for downloading the export.
 */

require("./util.js");
require("./dialog.js");

DownloadDialog = class extends Dialog {
  #wrapper = null;
  #head = null;
  #content = null;
  #copy = null;
  #actions = null;
  #ft_select = null;
  #dl_btn = null;
  #file = null;

  #selectors = {
    ft_select: "ae-filetype",
    dl_btn: "ae-download-btn",
  };

  get selectors() {
    return Object.assign({}, super.selectors, this.#selectors);
  }

  /* Elements
   ***************************************************************************/

  /**
   * div element for the head section.
   */
  get head() {
    if (!this.#head) {
      let head = super.head;

      head.append(this.h1("Download"));

      this.#head = head;
    }
    return this.#head;
  }

  get wrapper() {
    if (!this.#wrapper) {
      this.#wrapper = this.createWrapper("ae-download-modal");
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

      content.append(this.copy);

      this.#content = content;
    }
    return this.#content;
  }

  /**
   * Div that contains text content and actions.
   *
   * @returns {Doc}
   */
  get copy() {
    if (!this.#copy) {
      this.#copy = super.copy;
      this.copy.append(this.p("Your export is ready!"), this.actions);
    }
    return this.#copy;
  }

  /**
   * Div that contains the dropdown and download button.
   *
   * @returns {Doc}
   */
  get actions() {
    if (!this.#actions) {
      this.#actions = super.actions;

      let span = Doc.create("span", {
        class: `${this.selectors.dl_btn} ae-btn`,
      });
      span.append(this.dl_btn);

      this.actions.append(this.ft_select, span);
    }
    return this.#actions;
  }

  get ft_select() {
    if (!this.#ft_select) {
      // create select tag
      let select = Doc.create("select", {
        id: this.selectors.ft_select,
        name: this.selectors.ft_select,
      });

      // add options
      let options = { "": " -- Format -- ", json: "JSON", tsv: "TSV" };
      for (let [ft, label] of Object.entries(options)) {
        let option = Doc.create("option", { value: ft });
        option.innerText = label;
        select.element.append(option.element);
      }

      // add event listener to disable/enable the button when a filetype is
      // selected
      select.listen("change", () => {
        let btn = window.ae.modal.dl_btn;
        if (select.value) {
          btn.classList.remove("disabled");
          btn.disabled = false;
        } else {
          btn.classList.add("disabled");
          btn.disabled = true;
        }
      });

      this.#ft_select = select;
    }
    return this.#ft_select;
  }

  /**
   * Download button element.
   *
   * Note: This has to be an <a> instead of a <button> in order to accomidate
   *       file downloading.
   *
   * @returns {Doc}
   */
  get dl_btn() {
    if (!this.#dl_btn) {
      let btn = Doc.create("a", {
        id: this.selectors.dl_btn,
        class: "ae-btn disabled",
      });

      btn.href = "#";
      btn.innerText = "Download";
      this.#dl_btn = btn;
    }
    return this.#dl_btn;
  }

  get filetype() {
    return this.ft_select.value;
  }

  /**
   * Getter for the file that will be downloaded.
   *
   * @returns {VirtualFile}
   */
  get file() {
    return this.#file;
  }

  /**
   * Setter for the file that will be downloaded.
   *
   * Set the file, set the attributes on the download button to make it work,
   * and add the event listener to get rid of the generated URL once it has
   * been used.
   *
   * @param {VirtualFile} file
   */
  set file(file) {
    this.#file = file;
    this.dl_btn.element.href = file.url;
    this.dl_btn.element.download = file.filename;
    this.dl_btn.element.addEventListener("click", () => {
      setTimeout(() => {
        window.URL.revokeObjectURL(file.url);
      }, 10);
    });
  }
};
