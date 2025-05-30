/**
 * Notifier displayed to the user during the "Additional details"
 * step.
 */

require("../util.js");
require("./notifier.js");

DetailsNotifier = class extends Notifier {
  #item_no = null;
  #total = null;

  step_no = 4;

  /**
   * Description of this step.
   *
   * @returns {string}
   */
  get step_desc() {
    let message = "Additional details";

    if (this.total) {
      message += `, ${this.total} books`;
    }

    return message;
  }

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

    return `Retrieving book ${this.item_no} of ${this.total}`;
  }
};
