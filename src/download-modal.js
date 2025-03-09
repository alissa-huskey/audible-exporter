/**
 * Modal pop-up window for downloading the export.
 */
DownloadModal = class extends Modal {
  #css = null;
  #wrapper = null;
  #content = null;
  #close_btn = null;
  #ft_select = null;
  #dl_btn = null;
  #file = null;

  title = "Download";

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

      actions.element.appendChild(this.ft_select.element);
      actions.element.appendChild(dl_wrapper.element);

      dl_wrapper.element.appendChild(this.dl_btn.element);

      content.element.appendChild(p.element);
      content.element.appendChild(actions.element);

      this.#content = content;
    }
    return this.#content;
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

  get close_btn() {
    if (!this.#close_btn) {
      this.#close_btn = Doc.create("a", { id: this.selectors.close_btn });
      this.#close_btn.innerHTML = "&times;";
      this.#close_btn.attributes.href = "#";
      this.#close_btn.element.addEventListener(
        "click",
        () => {
          this.hide();
        },
        false,
      );
    }
    return this.#close_btn;
  }

  get dl_btn() {
    if (!this.#dl_btn) {
      let btn = Doc.create("a", {
        id: this.selectors.dl_btn,
        class: "disabled",
      });
      btn.attributes.href = "#";
      btn.innerHTML = "Download";
      this.#dl_btn = btn;
    }
    return this.#dl_btn;
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
