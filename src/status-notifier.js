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

  #item_no = null;
  #total = null;

  estimate_padding = 1.05;
  event_name = "update-ae-notifier";

  times = []

  selectors = {
    wrapper: "ae-notifier",
    bar: "ae-bar",
    messages: "ae-messages",
    status: "ae-status-text",
    percentage: "ae-percent-text",
  };

  /* Elements
   ***************************************************************************/

  /**
   * Construct HTML elements.
   *
   * @returns {Element}
   */
  get wrapper() {
    if (!this.#wrapper) {
      this.#wrapper = Element.create("div", {id: this.selectors.wrapper, style: {
        width: `${this.bar_width}px`,
        left: `${(this.body_width - this.bar_width) / 2}px`,
        'z-index': new Date().getTime(),
      }})

      this.wrapper.element.appendChild(this.bar.element);
      this.bar.element.appendChild(this.messages.element);
      this.messages.element.appendChild(this.status.element);
      this.messages.element.appendChild(this.percentage.element);
    }
    return this.#wrapper;
  }

  /**
   * Progress bar element.
   *
   * @returns {Element}
   */
  get bar() {
    if (!this.#bar) {
      this.#bar = Element.create("div", {id: this.selectors.bar});
    }
    return this.#bar;
  }

  /**
   * Div that contains text elements.
   *
   * @returns {Element}
   */
  get messages() {
    if (!this.#messages) {
      this.#messages = Element.create("div", {id: this.selectors.messages, class: "row", style: {
        width: `${this.bar_width}px`,
      }});
    }
    return this.#messages;
  }

  /**
   * Div that contains status message.
   *
   * @returns {Element}
   */
  get status() {
    if (!this.#status) {
      this.#status = Element.create("div", {id: this.selectors.status});
    }
    return this.#status;
  }

  /**
   * Span element that contains percentage text.
   */
  get percentage() {
    if (!this.#percentage) {
      this.#percentage = Element.create("span", {id: this.selectors.percentage});
    }
    return this.#percentage;
  }

  /* Accessors
   ***************************************************************************/

  /**
   * The number of the current item being processed.
   *
   * @returns {number}
   */
  get item_no() {
    return this.#item_no;
  }

  /**
   * Set .item_no and update .text and .percent.
   *
   * @param   {number} value  The number of the current item being processed.
   *
   * @returns {number}
   */
  set item_no(value) {
    this.#item_no = value;
    this.text = this.message;
    this.percent = this.ratio;
  }

  /**
   * The total number of items to process.
   */
  get total() {
    return this.#total;
  }

  /**
   * Set .total and update text and percent.
   */
  set total(value) {
    this.#total = value;
    this.text = this.message;
    this.percent = this.ratio;
  }

  /**
   * Get the status message text.
   *
   * @returns {string}
   */
  get text() {
    return this.status.innerText;
  }

  /**
   * Set the status message text.
   *
   * @param {string} message  Message to display.
   */
  set text(message) {
    this.status.innerText = message;
  }

  /**
   * The current percent complete.
   *
   * @returns {float} A value between 0 and 1.0
   */
  get percent() {
    return this.#percent;
  }

  /**
   * Set the percent complete.
   *
   * Set the modal.percent value, the progress bar width, and the percentage
   * text.
   */
  set percent(decimal) {
    if (isNaN(decimal) || !isFinite(decimal)) {
      return;
    }
    this.#percent = decimal;
    let amount = Math.ceil(decimal * 100);
    this.percentage.innerText = `${amount}%`;

    let width = this.bar_width * decimal;
    this.bar.style.width = `${width}px`;
  }

  /**
   * Add a Timer object to the list of times.
   *
   * @param {Timer} value
   */
  set timer(value) {
    this.times.push(value);
  }

  /* Static getters
   ***************************************************************************/

  /**
   * The message to display to the user.
   *
   * @returns {string}
   */
  get message() {
    return "Initializing...";
  }

  /**
   * The CSS required to render this element.
   *
   * On build, the CSS_MARKER line will be replaced with the contents of
   * notifier.css.
   *
   * @returns {string}
   */
  get css() {
    return `
      /* CSS_MARKER notifier */
    `;
  }

  /* Calculated properties
   ***************************************************************************/

  /**
   * The body width.
   *
   * @returns {number}
   */
  get body_width() {
    return document.body.getBoundingClientRect().width;
  }

  /**
   * The overall width of the progress bar.
   *
   * @returns {number}
   */
  get bar_width() {
    return this.body_width * 0.8;
  }

  /**
   * The calculated percent complete.
   */
  get ratio() {
    return this.item_no / this.total;
  }

  /**
   * The number of items still to be processed.
   *
   * @returns {number}
   */
  get remaining() {
    return this.total - this.item_no;
  }

  /**
   * Amount of time it takes to process each item.
   *
   * Calculated as average of elapsed time in all timer objects in .times in
   * milliseconds.
   *
   * @returns {number}
   */
  get per_item() {
    let total = this.times.reduce((sum, t) =>  sum + t.elapsed, 0);
    return total / this.times.length;
  }

  /**
   * Estimate time left to process remaining items in milliseconds.
   *
   * @return {number}
   */
  get ms_left() {
    return (this.remaining * this.per_item) * this.estimate_padding;
  }

  get minutes_left() {
    let minutes = ((this.ms_left / 1000) / 60).toFixed(1);
    if (minutes == parseInt(minutes)) {
      minutes = parseInt(minutes);
    }
    return minutes;
  }

  /**
   * Message to display to the user of the estimated time left.
   *
   * @returns {string}
   */
  get time_left() {
    if (!this.times.length) {
      return "";
    }

    let minutes = this.minutes_left;
    let text;
    if (minutes <= 0.5) {
      text = "less than a minute remaining";
    } else if (minutes <= 1) {
      text = "about a minute remaining";
    } else {
      text = `about ${minutes} minutes remaining`;
    }

    return ` (${text})`;
  }

  /* Methods
   ***************************************************************************/

  /**
   * Event listener.
   *
   * For each item in the event.detail object, set the window.ae.notifier
   * attribute named key to value.
   */
  listen(evt) {
    let notifier = window.ae.notifier;
    for (let [k, v] of Object.entries(evt.detail)) {
      notifier[k] = v;
    }
  }

  /**
   * Hide the modal element.
   */
  hide() {
    this.wrapper.classList.add("hidden");
  }

  /**
   * Show the modal element.
   */
  show() {
    this.wrapper.classList.remove("hidden");
  }

  /**
   * Add the wrapper HTML element to the DOM.
   *
   * Add the .wrapper element to the DOM, add the update-ae-notifier event
   * listener, and set the intital status text.
   */
  create() {
    super.create();
    document.addEventListener(this.event_name, this.listen);
    window.ae = window.ae || {};
    window.ae.notifier = this;
    this.text = this.message;
  }

  /**
   * Clear all user-visible values and set the percent to zero.
   */
  reset() {
    this.text = "";
    this.percent = 0;
    this.percentage.innerText = "";
  }

  /**
   * Remove the wrapper HTML element from the DOM and remove the event
   * listener.
   */
  remove() {
    document.removeEventListener(this.event_name, this.listen);
    if (window.ae) {
      window.ae.notifier = null;
    }
    this.wrapper.element.remove();

    this.#wrapper = null;
    this.#bar = null;
    this.#status = null;
    this.#percentage = null;
  }
}
