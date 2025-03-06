/**
 * purchase-history-notifier.js
 * ************************************************************************************
 */

PurchaseHistoryNotifier = class extends StatusNotifier {
  #year = null;
  #years = null;

  constructor(years=null) {
    super();
    this.times = [];
    this.years = years || [];
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
    this.#year = value
    this.text = this.message;
    this.updatePercent();
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
    this.updatePercent();
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

    return `Retrieving purchase history: ${this.year}${this.time_left}`
  }

  /**
   * Update the percent.
   */
  updatePercent() {
    if (this.#years && this.year != null) {
      this.percent = this.item_no / this.total;
    }
  }
}

