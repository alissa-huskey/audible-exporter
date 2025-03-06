/**
 * library-notifier.js
 * ************************************************************************************
 */

LibraryNotifier = class extends StatusNotifier {
  #item_no = null;
  #total = null;

  /**
   * The current page.
   *
   * @returns {number}
   */
  get item_no() {
    return this.#item_no;
  }

  /**
   * Set page and update text and percent.
   *
   * @param {number} value
   */
  set item_no(value) {
    this.#item_no = value;
    this.text = this.message;
    this.percent = this.ratio;
  }

  /**
   * The total number of pages.
   *
   * @returns {number}
   */
  get total() {
    return this.#total;
  }

  /**
   * Set the total and update text.
   *
   * @param {number} value
   */
  set total(value) {
    this.#total = value
    this.text = this.message;
  }

  /**
   * The message to display to the user.
   *
   * @returns {string}
   */
  get message() {
    if (!this.item_no) {
      return "Retrieving library...";
    }

    let message = `Retrieving library: page ${this.item_no}`
    if (this.total) {
      message += ` of ${this.total}`;
    } else {
      message += "...";
    }

    return message + this.time_left;
  }
}
