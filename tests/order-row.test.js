/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

require("../src/dev.js");
require("../src/util.js");
require("../src/element.js");
require("../src/list.js");
require("../src/parser.js");
require("../src/order-row.js");

describe("OrderRow", function() {

  let row = new OrderRow(fixtureElement("order-row.html", "tr"));

  test("new OrderRow()", function() {
    expect(row).toBeA(OrderRow);
  });

  test("new OrderRow(doc)", function() {
    expect(row.doc).toBeA(Element);
  });

  test(".url", function() {
    expect(row.url).toBe("/account/order-details?orderId=D01-7379715-3760239&ref_pageloadid=PnNZC0TrKwjuxoGZ&pf_rd_p=be5880e8-6386-440e-a7af-e00fdf352b08&pf_rd_r=AEAEAXCW30F21JFP3MCA&plink=wf1AG3y3gMfhGHZf&pageLoadId=h4PVqYOFWD9IZl9N&creativeId=9653015a-0975-4d29-a2f4-52c96d320026&ref=a_account_p_c1_purchase_history_1");
  });

  test(".id", function() {
    expect(row.id).toBe("D01-7379715-3760239");
  });

  test(".date", function() {
    expect(row.date).toBe("01-21-2025");
  });

  test("total", function() {
    expect(row.total).toBe("1 Credit");
  });

  test(".data()", function() {
    let data = {
      id: "D01-7379715-3760239",
      date: "01-21-2025",
      total: "1 Credit",
    }
    expect(row.data()).toEqual(data);
  });

  test(".data() errors", function() {
    let spy = jest.spyOn(global.console, "error")
    global.console.errors = spy.mockImplementation(() => {});;

    let row = new OrderRow("");

    row.data();

    expect(spy.mock.calls).toHaveLength(3);
  });

});
