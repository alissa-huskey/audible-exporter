/**
 * @jest-environment jsdom
 */

require("../src/dev.js");
require("../src/util.js");
require("../src/timer.js");
require("../src/element.js");
require("../src/dom.js");
require("../src/status-notifier.js");
require("../src/order-notifier.js");

describe("OrderNotifier", function() {

  test("new OrderNotifier()", function() {
    let notifier = new OrderNotifier();
    expect(notifier).toBeA(OrderNotifier);

    notifier = new OrderNotifier(5, ["2025", "2024", "2023"])
    expect(notifier.total).toBe(5);
    expect(notifier.years).toEqual(["2025", "2024", "2023"]);
  });

  test(".year =", function() {
    notifier = new OrderNotifier(5, ["2025", "2024", "2023"])
    notifier.year = "2024";

    expect(notifier.year).toBe("2024");
    expect(notifier.text).toBe(notifier.message);
  });

  test(".year_page = ", function() {
    notifier = new OrderNotifier(5, ["2025", "2024", "2023"])
    notifier.year_page = 2

    expect(notifier.year_page).toBe(2);
    expect(notifier.text).toBe(notifier.message);
  });

  test(".item_no =", function() {
    notifier = new OrderNotifier(5, ["2025", "2024", "2023"])
    notifier.item_no = 2

    expect(notifier.item_no).toBe(2);
    expect(notifier.text).toBe(notifier.message);
    expect(notifier.percent).toBe(0.4);
  });

  test(".page_count = ", function() {
    notifier = new OrderNotifier(5, ["2025", "2024", "2023"])
    notifier.page_count = 2

    expect(notifier.page_count).toBe(2);
    expect(notifier.text).toBe(notifier.message);
  });

  test(".message", function() {
    notifier = new OrderNotifier(5, ["2025", "2024", "2023"])
    expect(notifier.message).toBe("Retrieving purchases...");

    notifier.year = "2024"
    expect(notifier.message).toBe("Retrieving 2024 purchases...");

    notifier.year_page = "1"
    expect(notifier.message).toBe("Retrieving 2024 purchases: page 1...");

    notifier.page_count = "3"
    expect(notifier.message).toBe("Retrieving 2024 purchases: page 1 of 3");
  });

  test(".listener()", function() {
    let notifier = new OrderNotifier();
    notifier.create();

    dispatchEvent({total: 10});
    expect(notifier.total).toBe(10);

    dispatchEvent({years: ["2025", "2024", "2023"]});
    expect(notifier.years).toEqual(["2025", "2024", "2023"]);

    dispatchEvent({year: "2024"});
    expect(notifier.year).toBe("2024");

    dispatchEvent({year_page: 2});
    expect(notifier.year_page).toBe(2);

    dispatchEvent({item_no: 3});
    expect(notifier.item_no).toBe(3);

    dispatchEvent({page_count: 2});
    expect(notifier.page_count).toBe(2);

    timer = new Timer();
    dispatchEvent({timer: timer});
    expect(notifier.times).toEqual([timer]);

    dispatchEvent({percent: .2});
    expect(notifier.percent).toBe(.2);
  });
});
