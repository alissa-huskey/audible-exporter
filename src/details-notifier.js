/**
 * details-notifier.js
 * ************************************************************************************
 */

DetailsNotifier = class extends StatusNotifier {
  #item_no = null;
  #total = null;

  times = []

  get item_no() {
    return this.#item_no;
  }

  set item_no(value) {
    this.#item_no = value
    this.text = this.message;
    this.percent = this.item_no / this.total
  }

  get remaining() {
    return this.total - this.item_no;
  }

  get ms_left() {
    return (this.remaining * this.per_item) * 1.05;
  }

  get minutes_left() {
    let minutes = ((this.ms_left / 1000) / 60).toFixed(1);
    if (minutes == parseInt(minutes)) {
      minutes = parseInt(minutes);
    }
    return minutes;
  }

  set timer(value) {
    this.times.push(value);
  }

  get per_item() {
    let total = this.times.reduce((sum, t) =>  sum + t.elapsed, 0);
    return total / this.times.length;
  }

  get total() {
    return this.#total;
  }

  set total(value) {
    this.#total = value
    this.text = this.message;
  }

  get message() {
    if (!this.item_no) {
      return "Retrieving additional information on titles...";
    }

    let message = `Retrieving book ${this.item_no} of ${this.total}`

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
