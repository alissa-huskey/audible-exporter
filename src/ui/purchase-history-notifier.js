require("../util.js");
require("./notifier.js");

PurchaseHistoryNotifier = class extends Notifier {
  #year = null;
  #years = null;

  step_no = 1;

  constructor(years = null) {
    super();
    this.times = [];
    this.years = years || [];
  }

  get step_desc() {
    let message = "Purchase history";

    if (this.years.length) {
      message += ` since ${this.years.slice(-1)[0]}`;
    }

    return message;
  }

  /**
   * The current year being processed.
   *
   * @returns {string}
   */
  get year() {
    return this.#year;
  }

  /**
   * Set year and update text and percent.
   *
   * @param {string} value  The year being processed.
   */
  set year(value) {
    this.#year = value;
    this.text = this.message;
    this.percent = this.ratio;
    this.time = this.time_left;
  }

  /**
   * A list of years to process.
   *
   * @returns {string[]}
   */
  get years() {
    return this.#years;
  }

  /**
   * Set years and update percent.
   *
   * @param {string[]} value  Array of years to process.
   */
  set years(value) {
    this.#years = value;
    this.percent = this.ratio;
    this.step = this.step_text;
  }

  get item_no() {
    return this.years.indexOf(this.year);
  }

  get total() {
    return this.years.length;
  }

  /**
   * Message to display to the user.
   *
   * @returns {string}
   */
  get message() {
    if (!this.year) {
      return "Retrieving purchase history...";
    }

    return `Retrieving purchase history: ${this.year}`;
  }
};
