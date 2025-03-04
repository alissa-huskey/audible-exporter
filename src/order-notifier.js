/**
 * order-notifier.js
 * ************************************************************************************
 */

OrderNotifier = class extends StatusNotifier {
  #year = null;
  #year_page = null;
  #page = null;
  #page_count = null;

  constructor(total_pages=null, years=null) {
    super();
    this.total_pages = total_pages;
    this.years = years;
  }

  get year() {
    return this.#year;
  }

  set year(value) {
    this.#year = value
    this.text = this.message;
  }

  get year_page() {
    return this.#year_page;
  }

  set year_page(value) {
    this.#year_page = value
    this.text = this.message;
  }

  get page() {
    return this.#page;
  }

  set page(value) {
    this.#page = value
    this.text = this.message;
    this.percent = value / this.total_pages;
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
}
