/**
 * details-notifier.js
 * ************************************************************************************
 */

DetailsNotifier = class extends StatusNotifier {
  #book = null;
  #book_count = null;
  times = []

  get book() {
    return this.#book;
  }

  set book(value) {
    this.#book = value
    this.text = this.message;
    this.percent = this.book / this.book_count
  }

  get remaining() {
    return this.book_count - this.book;
  }

  get ms_left() {
    return (this.remaining * this.per_book) * 1.05;
  }

  get minutes_left() {
    return ((this.ms_left / 1000) / 60).toFixed(1);
  }

  set timer(value) {
    this.times.push(value);
  }

  get per_book() {
    let total = this.times.reduce((sum, t) =>  sum + t.elapsed, 0);
    return total / this.times.length;
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

    let message = `Retrieving book ${this.book} of ${this.book_count}`

    if (isEmpty(this.times)) {
      return message;
    }

    let minutes = this.minutes_left;
    if (minutes <= 0.5) {
      message += " (less than a minute remaining)";
    } else if (minutes <= 1) {
      message += " (about a minute remaining)";
    } else {
      message += ` (about ${this.minutes_left} minutes remaining)`;
    }

    return message;
  }
}
