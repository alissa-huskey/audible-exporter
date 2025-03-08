/**
 * @jest-environment jsdom
 */

require("../src/dev.js");
require("../src/util.js");
require("../src/doc.js");
require("../src/list.js");
require("../src/parser.js");
require("../src/order-row.js");

describe("OrderRow", () => {
  let row = new OrderRow(fixtureElement("order-row.html", "tr"));

  test("new OrderRow()", () => {
    expect(row).toBeA(OrderRow);
  });

  test("new OrderRow(doc)", () => {
    expect(row.doc).toBeA(Doc);
  });

  test(".url", () => {
    expect(row.url).toBe(
      "/account/order-details?orderId=D01-7379715-3760239&ref_pageloadid=PnNZC0TrKwjuxoGZ&pf_rd_p=be5880e8-6386-440e-a7af-e00fdf352b08&pf_rd_r=AEAEAXCW30F21JFP3MCA&plink=wf1AG3y3gMfhGHZf&pageLoadId=h4PVqYOFWD9IZl9N&creativeId=9653015a-0975-4d29-a2f4-52c96d320026&ref=a_account_p_c1_purchase_history_1",
    );
  });

  test(".id", () => {
    expect(row.id).toBe("D01-7379715-3760239");
  });

  test(".date", () => {
    expect(row.date).toBe("01-21-2025");
  });

  test("total", () => {
    expect(row.total).toBe("1 Credit");
  });

  test(".data()", () => {
    let data = {
      id: "D01-7379715-3760239",
      date: "01-21-2025",
      total: "1 Credit",
    };

    expect(row.data()).toEqual(data);
  });

  test(".data() errors", () => {
    let spy = jest.spyOn(global.console, "error");
    global.console.errors = spy.mockImplementation(() => {});

    let row = new OrderRow("");

    row.data();

    expect(spy.mock.calls).toHaveLength(3);
  });
});
