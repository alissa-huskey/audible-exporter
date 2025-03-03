/**
 * order-notifier.js
 * ************************************************************************************
 */

OrderNotifier = class extends StatusNotifier {
  #year = null;
  #page = null;
  #page_count = null;

  constructor(years=null) {
    super();
    this.years = years;
  }

  get year() {
    return this.#year;
  }

  set year(value) {
    this.#year = value
    this.text = this.message;
    this.percent = this.years.indexOf(value) / this.years.length
    this.pulse(value);
  }

  get page() {
    return this.#page;
  }

  set page(value) {
    this.#page = value
    this.text = this.message;
  }

  get page_count() {
    return this.#page_count;
  }

  set page_count(value) {
    this.#page_count = value
    this.text = this.message;
  }

  get message() {
    if (!this.year) {
      return "Retrieving purchases...";
    }

    let message = `Retrieving ${this.year} purchases`
    if (this.page) {
      message += `: page ${this.page}`;
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
}
