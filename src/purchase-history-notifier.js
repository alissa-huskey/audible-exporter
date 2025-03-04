/**
 * purchase-history-notifier.js
 * ************************************************************************************
 */

PurchaseHistoryNotifier = class extends StatusNotifier {
  #year = null;
  #years = null;

  constructor(years=null) {
    super();
    this.years = years || [];
  }

  get year() {
    return this.#year;
  }

  set year(value) {
    this.#year = value
    this.text = this.message;
    this.updatePercent();
  }

  get years() {
    return this.#years;
  }

  set years(value) {
    this.#years = value;
    this.updatePercent();
  }

  get message() {
    if (!this.year) {
      return "Retrieving purchases history...";
    }

    return `Retrieving purchases history: ${this.year}`
  }

  updatePercent() {
    if (this.#years && this.year != null) {
      this.percent = this.years.indexOf(this.year) / this.years.length
    }
  }
}

