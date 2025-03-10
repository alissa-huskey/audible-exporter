require("./util.js");
require("./status-notifier.js");

OrderNotifier = class extends StatusNotifier {
  #year = null;
  #year_page = null;
  #item_no = null;
  #page_count = null;

  step_no = 2;

  constructor(total = null, years = null) {
    super();
    this.total = total;
    this.years = years;
  }

  get step_desc() {
    let message = "Purchases";

    if (this.years && this.years.length) {
      message += ` since ${this.years.slice(-1)[0]}`;
    }

    return message;
  }

  /**
   * The year currently being processed.
   *
   * @returns {string}
   */
  get year() {
    return this.#year;
  }

  /**
   * Set the year and update text.
   *
   * @params {string} value  The year being processed.
   */
  set year(value) {
    this.#year = value;
    this.text = this.message;
  }

  /**
   * The number of the current year's pages being processed.
   *
   * @returns {number}
   */
  get year_page() {
    return this.#year_page;
  }

  /**
   * Set the page_year and update text.
   */
  set year_page(value) {
    this.#year_page = value;
    this.text = this.message;
  }

  /**
   * The number of pages to be processed for the current year.
   *
   * @returns {number}
   */
  get page_count() {
    return this.#page_count;
  }

  /**
   * Set the page_count and update text.
   */
  set page_count(value) {
    this.#page_count = value;
    this.text = this.message;
  }

  /*
   * The message to display to the user.
   *
   * @returns {string}
   */
  get message() {
    if (!this.year) {
      return "Retrieving purchases...";
    }

    let message = `Retrieving ${this.year} purchases`;
    if (this.year_page) {
      message += `: page ${this.year_page}`;
      if (this.page_count) {
        message += ` of ${this.page_count}`;
      } else {
        message += "...";
      }
    } else {
      message += "...";
    }

    return message;
  }
};
