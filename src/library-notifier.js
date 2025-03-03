/**
 * library-notifier.js
 * ************************************************************************************
 */

LibraryNotifier = class extends StatusNotifier {
  #page = null;
  #page_count = null;

  get page() {
    return this.#page;
  }

  set page(value) {
    this.#page = value
    this.text = this.message;
    this.percent = this.page / this.page_count
  }

  get page_count() {
    return this.#page_count;
  }

  set page_count(value) {
    this.#page_count = value
    this.text = this.message;
  }

  get message() {
    if (!this.page) {
      return "Retrieving library...";
    }

    let message = `Retrieving library: page ${this.page}`
    if (this.page_count) {
      message += ` of ${this.page_count}`;
    } else {
      message += "...";
    }

    return message;
  }
}
