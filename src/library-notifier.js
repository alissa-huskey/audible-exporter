require("./util.js");
require("./status-notifier.js");

LibraryNotifier = class extends StatusNotifier {
  #item_no = null;
  #total = null;

  step_no = 3;

  get step_desc() {
    let message = "Your library";

    if (this.total) {
      message += `, ${this.total} ${this.total > 1 ? "pages" : "page"}`;
    }

    return message;
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

    let message = `Retrieving library: page ${this.item_no}`;
    if (this.total) {
      message += ` of ${this.total}`;
    } else {
      message += "...";
    }

    return message;
  }
};
