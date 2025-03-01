/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

require("../src/dev.js");
require("../src/util.js");
require("../src/element.js");
require("../src/list.js");
require("../src/parser.js");
require("../src/purchase.js");

describe("Purchase", function() {

  let row = new Purchase(fixtureElement("purchase.html", "a"));

  test("new Purchase()", function() {
    expect(row.constructor.name).toBe("Purchase");
  });

  test("new Purchase(doc)", function() {
    expect(row.doc.constructor.name).toBe("Element");
  });

  test(".data()", function() {
    let data = {
      id: "B0CQ3759C3",
      order_id: "D01-7379715-3760239",
      title: "Wind and Truth",
      author: "Brandon Sanderson",
      amount: "1 Credit",
      credits: "1.0",
    };

    expect(row.data()).toEqual(data);
  });

});
