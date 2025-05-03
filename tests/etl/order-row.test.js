require("../../src/etl/order-row.js");

describe("OrderRow", () => {
  let row = new OrderRow(fixtureElement("order-row.html", "tr"));

  test("new OrderRow()", () => {
    expect(row).toBeA(OrderRow);
  });

  test("new OrderRow(doc)", () => {
    expect(row.doc).toBeA(Doc);
  });

  test(".url", () => {
    expect(row.url).toBe("/account/order-details?orderId=D01-7379715-3760239");
  });

  test(".id", () => {
    expect(row.id).toBe("D01-7379715-3760239");
  });

  test(".date", () => {
    expect(row.date).toBe("1/21/2025");
  });

  test("total", () => {
    expect(row.total).toBe("1 Credit");
  });

  test(".data()", () => {
    let data = {
      id: "D01-7379715-3760239",
      date: "1/21/2025",
      total: "1 Credit",
      url: "/account/order-details?orderId=D01-7379715-3760239",
    };

    expect(row.data()).toEqual(data);
  });

  test(".data() errors", () => {
    let spy = jest.spyOn(global.console, "error");
    global.console.errors = spy.mockImplementation(() => {});

    let row = new OrderRow("");
    let field_count = row._fields.length;

    row.data();

    expect(spy.mock.calls).toHaveLength(field_count);
  });
});
