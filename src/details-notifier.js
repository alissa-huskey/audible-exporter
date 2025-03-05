/**
 * details-notifier.js
 * ************************************************************************************
 */

DetailsNotifier = class extends StatusNotifier {
  #item_no = null;
  #total = null;

  /**
   * Status message to display to the user.
   *
   * Depending on status of progress bar may include:
   *
   * - Initial message.
   * - item_no of total
   * - Estimated minutes remaining
   *
   * @returns {string}
   */
  get message() {
    if (!this.item_no) {
      return "Retrieving additional information on titles...";
    }

    let message = `Retrieving book ${this.item_no} of ${this.total}`

    if (!isEmpty(this.times)) {
      message += this.time_left;
    }

    return message;
  }
}
