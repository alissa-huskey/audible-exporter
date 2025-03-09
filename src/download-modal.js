/**
 * Modal pop-up window for downloading the export.
 */
DownloadModal = class extends Modal {
  #css = null;
  #wrapper = null;
  #head = null;
  #content = null;
  #ft_select = null;
  #dl_btn = null;
  #h1 = null;
  #file = null;

  selectors = {
    style: "ae-modal-css",
    wrapper: "ae-modal",
    content: "ae-content",
    head: "ae-head",
    close_btn: "ae-close-btn",

    dl_btn: "ae-download-btn",
    ft_select: "ae-filetype",
    actions: "ae-actions",
  };

  /* Elements
   ***************************************************************************/

  /**
   * div element for the head section.
   */
  get head() {
    if (!this.#head) {
      let head = super.head;

      head.append(this.h1);

      this.#head = head;
    }
    return this.#head;
  }

  /**
   * The div element for the main content of the modal.
   *
   * @returns {Doc}
   */
  get content() {
    if (!this.#content) {
      let content = super.content;

      let dl_wrapper = Doc.create("span", { id: this.selectors.dl_btn });
      let actions = Doc.create("div", { class: this.selectors.actions });
      let p = Doc.create("p");

      p.innerHTML = "Your export is ready!";

      actions.append(this.ft_select, dl_wrapper);

      dl_wrapper.append(this.dl_btn);

      content.append(p, actions);

      this.#content = content;
    }
    return this.#content;
  }

  /**
   * h1 element.
   *
   * @returns {Doc}
   */
  get h1() {
    if (!this.#h1) {
      this.#h1 = Doc.create("h1");
      this.#h1.innerHTML = "Download";
    }
    return this.#h1;
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
      select.element.addEventListener("change", () => {
        let btn = window.ae.modal.dl_btn;
        if (select.value) {
          btn.classList.remove("disabled");
        } else {
          btn.classList.add("disabled");
        }
      });

      this.#ft_select = select;
    }
    return this.#ft_select;
  }

  get dl_btn() {
    if (!this.#dl_btn) {
      let btn = Doc.create("a", {
        id: this.selectors.dl_btn,
        class: "ae-btn disabled",
      });
      btn.attributes.href = "#";
      btn.innerHTML = "Download";
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

  /* Static getters.
   ***************************************************************************/

  /**
   * The CSS required to render this element.
   *
   * On build, the CSS_MARKER line will be replaced with the contents of
   * notifier.css.
   *
   * @returns {string}
   */
  get css() {
    if (!this.#css) {
      this.#css = `
        /* CSS_MARKER modal */
      `;
    }
    return this.#css;
  }
};
