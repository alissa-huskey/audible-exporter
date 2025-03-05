/**
 * modal.js
 * ************************************************************************************
 */

Modal = class extends DOM {
  #css = null;
  #wrapper = null;
  #close_btn = null
  #dl_btn = null;
  #file = null;

  selectors = {
    style: "ae-modal-css",
    wrapper: "ae-modal",
    content: "ae-content",
    head: "ae-head",
    close_btn: "ae-close-btn",
    dl_btn: "ae-download-btn",
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
      this.#wrapper = Element.create("div", {class: this.selectors.wrapper });
      let content = Element.create("div", {class: this.selectors.content});
      let head = Element.create("div", {class: this.selectors.head});
      let h1 = Element.create("h1");
      let p = Element.create("p");

      h1.innerHTML = "Download";
      p.innerHTML = "Your export is ready!";

      this.wrapper.element.appendChild(content.element);
      content.element.appendChild(head.element);
      content.element.appendChild(p.element);
      content.element.appendChild(this.dl_btn.element)
      head.element.appendChild(this.close_btn.element)
      head.element.appendChild(h1.element)

      this.#wrapper.style["z-index"] = new Date().getTime();
    }
    return this.#wrapper;
  }

  get close_btn() {
    if (!this.#close_btn) {
        this.#close_btn = Element.create("a", {id: this.selectors.close_btn});
        this.#close_btn.innerHTML = "&times;";
        this.#close_btn.attributes.href = "#";
        this.#close_btn.element.addEventListener("click", () => {
          this.hide();
        }, false);
    }
    return this.#close_btn;
  }

  get dl_btn() {
    if (!this.#dl_btn) {
      this.#dl_btn = Element.create("a", {id: this.selectors.dl_btn});
        this.#dl_btn.attributes.href = "#";
      this.#dl_btn.innerHTML = "Download";;
    }
    return this.#dl_btn;
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
}
