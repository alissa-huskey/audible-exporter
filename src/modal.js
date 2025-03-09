Modal = class extends DOM {
  #css = null;
  #wrapper = null;
  #close_btn = null;
  #ft_select = null;
  #dl_btn = null;
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

  get css() {
    if (!this.#css) {
      this.#css = `
        /* CSS_MARKER modal */
      `;
    }
    return this.#css;
  }

  // Construct wrapper div, append all child elements, and return
  get wrapper() {
    if (!this.#wrapper) {
      this.#wrapper = Doc.create("div", { class: this.selectors.wrapper });
      let content = Doc.create("div", { class: this.selectors.content });
      let head = Doc.create("div", { class: this.selectors.head });
      let h1 = Doc.create("h1");
      let p = Doc.create("p");
      let dl_wrapper = Doc.create("span", { id: this.selectors.dl_btn });
      let actions = Doc.create("div", { class: this.selectors.actions });

      h1.innerHTML = "Download";
      p.innerHTML = "Your export is ready!";

      this.wrapper.element.appendChild(content.element);
      head.element.appendChild(this.close_btn.element);
      head.element.appendChild(h1.element);

      actions.element.appendChild(this.ft_select.element);
      actions.element.appendChild(dl_wrapper.element);

      dl_wrapper.element.appendChild(this.dl_btn.element);

      content.element.appendChild(head.element);
      content.element.appendChild(p.element);
      content.element.appendChild(actions.element);

      this.#wrapper.style["z-index"] = new Date().getTime();
    }
    return this.#wrapper;
  }

  get ft_select() {
    if (!this.#ft_select) {
      // create select tag
      let select = Doc.create("select", {
        id: this.selectors.select,
        name: this.selectors.select,
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

  get filetype() {
    return this.ft_select.value;
  }

  get file() {
    return this.#file;
  }

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

  show() {
    this.#wrapper.style.display = "block";
  }

  hide() {
    this.#wrapper.style.display = "none";
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
};
