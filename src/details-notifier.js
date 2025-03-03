/**
 * details-notifier.js
 * ************************************************************************************
 */

DetailsNotifier = class extends StatusNotifier {
  #book = null;
  #book_count = null;
  #pulse_colors = {true: "#07ba5b", false: "#3de367"}

  get book() {
    return this.#book;
  }

  set book(value) {
    this.#book = value
    this.text = this.message;
    this.percent = this.book / this.book_count
    this.pulse(value);
  }

  get book_count() {
    return this.#book_count;
  }

  set book_count(value) {
    this.#book_count = value
    this.text = this.message;
  }

  get message() {
    if (!this.book) {
      return "Retrieving additional information on titles...";
    }

    return `Retrieving book ${this.book} of ${this.book_count}`
  }
}
