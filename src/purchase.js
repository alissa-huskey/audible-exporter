require("./util.js");
require("./parser.js");

Purchase = class extends Parser {
  _fields = {
    asin: "data-order-item-asin",
    order_id: "data-order-id",
    title: "data-order-item-name",
    author: "data-order-item-author",
    amount: "data-order-item-cost",
    credits: "data-order-item-credit-cost",
  };

  constructor(doc = null) {
    super();
    this.doc = doc;
  }

  data() {
    return Object.fromEntries(
      Object.entries(this._fields).map(([key, attr]) => [
        key,
        this.doc.attributes?.[attr]?.value,
      ]),
    );
  }
};
