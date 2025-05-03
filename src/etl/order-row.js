require("./parser.js");

OrderRow = class extends Parser {
  _fields = ["id", "date", "total"];

  _identifers = [];

  constructor(doc = null) {
    super();
    this.doc = doc;
  }

  get url() {
    return this.doc.qsf("a[href^='/account/order-details']").href;
  }

  get id() {
    return this.url.match(/orderId=([^&]+)&/)[1];
  }

  get date() {
    let date = this.doc
      .qsf(".ui-it-purchasehistory-item-purchasedate")
      .innerHTML?.trim();
    return dateString(date);
  }

  get total() {
    return this.doc.qsf(".ui-it-purchasehistory-item-total div").innerHTML;
  }
};
