/**
 * status-notifier.js
 * ************************************************************************************
 */

StatusNotifier = class extends DOM {
  #wrapper = null;
  #bar = null;
  #status = null;
  #percentage = null;
  #messages = null;
  #style = null;
  #percent = null;

  #colors = {
    darkGreen: "#07ba5b",
    lightGreen: "#3de367",
    nearBlack: "#121212",
    white: "#fff",
    rasin: "#19191F",
    darkGray: "#232530",
    offWhite: "#abaab3",
    lightGray: "#9a99a1",
  }

  selectors = {
    wrapper: "ae-notifier",
    bar: "ae-bar",
    messages: "ae-messages",
    status: "ae-status-text",
    percentage: "ae-percent-text",
  };

  get message() {
    return "Initializing...";
  }

  get css() {
    return `
      /* CSS_MARKER notifier */
    `;
  }

  get body_width() {
    return document.body.getBoundingClientRect().width;
  }

  get bar_width() {
    return this.body_width * 0.8;
  }

  // Construct notifier wrapper div, append all child elements, and return
  get wrapper() {
    if (!this.#wrapper) {
      this.#wrapper = Element.create("div", {id: this.selectors.wrapper, style: {
        width: `${this.bar_width}px`,
        left: `${(this.body_width - this.bar_width) / 2}px`,
        background: this.#colors.nearBlack,
        'border-color': this.#colors.lightGreen,
        'z-index': new Date().getTime(),
      }})

      this.wrapper.element.appendChild(this.bar.element);
      this.bar.element.appendChild(this.messages.element);
      this.messages.element.appendChild(this.status.element);
      this.messages.element.appendChild(this.percentage.element);
    }
    return this.#wrapper;
  }

  // progress bar element
  get bar() {
    if (!this.#bar) {
      this.#bar = Element.create("div", {id: this.selectors.bar, style: {
        background: this.#colors.darkGreen,
        'border-color': this.#colors.lightGreen,
      }});
    }
    return this.#bar;
  }

  get messages() {
    if (!this.#messages) {
      this.#messages = Element.create("div", {id: this.selectors.messages, class: "row", style: {
        width: `${this.bar_width}px`,
        // color: "#112A46",
        // color: "#0c1b1d",
        // color: "#283747",
      }});
    }
    return this.#messages;
  }

  // status text element
  get status() {
    if (!this.#status) {
      this.#status = Element.create("div", {id: this.selectors.status, style: {
        // color: "#112A46",
        // color: "#0c1b1d",
        // color: "#283747",
      }});
    }
    return this.#status;
  }

  // percent text element
  get percentage() {
    if (!this.#percentage) {
      this.#percentage = Element.create("span", {id: this.selectors.percentage, style: {
        color: "#87ff65", // bright green
        color: "#0aff99", // bright green
        // color: "#00ff80", // bright green
        // color: "#00ff9f", // bright green
        // color: "#0dffae", // bright green
      }});
    }
    return this.#percentage;
  }

  // set the status text
  set text(message) {
    this.status.innerText = message;
  }

  get percent() {
    return this.#percent;
  }

  // set the percentage text and progress bar width
  set percent(decimal) {
    this.#percent = decimal;
    let amount = Math.ceil(decimal * 100);
    this.percentage.innerText = `${amount}%`;

    let width = this.bar_width * decimal;
    this.bar.style.width = `${width}px`;
  }

  timeLeft(remaining) {
    let per_book = 1.9;

    return Math.round((remaining * per_book) / 60);
  }

  hide() {
    this.wrapper.classList.add("hidden");
  }

  show() {
    this.wrapper.classList.remove("hidden");
  }

  create() {
    super.create();

    document.addEventListener("update-ae-notifier", (e) => {
      for (let [k, v] of Object.entries(e.detail)) {
        this[k] = v;
      }
    });

    this.text = this.message;
  }

  reset() {
    this.text = "";
    this.percent = 0;
    this.bar.style.background = this.#colors.darkGreen;
    this.percentage.innerText = "";
  }

  // remove the elements from the DOM
  remove() {
    this.wrapper.element.remove();

    this.#wrapper = null;
    this.#bar = null;
    this.#status = null;
    this.#percentage = null;
  }
}
