require("./parser.js");

/**
 * A row from a LedgerPage (purchase history) that contains order details.
 *
 */
OrderRow = class extends Parser {
  _fields = ["id", "url", "date", "total"];
  _identifers = [];

  constructor(doc = null) {
    super();
    this.doc = doc;
  }

  /**
   * The order detail page URL, minus all the extra params.
   *
   * @return {string}
   */
  get url() {
    let url = this.doc.qsf("a[href^='/account/order-details']").href;
    return url.replace(/&.*$/, "");
  }

  /**
   * The order id.
   *
   * @return {string}
   */
  get id() {
    return this.url.match(/orderId=(.*$)/)[1];
  }

  /**
   * The order date.
   *
   * @return {string}
   */
  get date() {
    let date = this.doc
      .qsf(".ui-it-purchasehistory-item-purchasedate")
      .innerHTML?.trim();
    return dateString(date);
  }

  /**
   * The order total, either dollars or credits.
   *
   * @return {string}
   */
  get total() {
    return this.doc.qsf(".ui-it-purchasehistory-item-total div").innerHTML;
  }
};
