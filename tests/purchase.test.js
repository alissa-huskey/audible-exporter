/**
 * @jest-environment jsdom
 */

require("../src/dev.js");
require("../src/purchase.js");

describe("Purchase", () => {
  let row = new Purchase(fixtureElement("purchase.html", "a"));

  test("new Purchase()", () => {
    expect(row).toBeA(Purchase);
  });

  test("new Purchase(doc)", () => {
    expect(row.doc).toBeA(Doc);
  });

  test(".data()", () => {
    let data = {
      asin: "B0CQ3759C3",
      order_id: "D01-7379715-3760239",
      title: "Wind and Truth",
      author: "Brandon Sanderson",
      amount: "1 Credit",
      credits: "1.0",
    };

    expect(row.data()).toEqual(data);
  });
});
