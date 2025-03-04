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
    expect(notifier.constructor.name).toBe("OrderNotifier");
    expect(notifier.message).toBe("Retrieving purchases...");

    notifier = new OrderNotifier(6, [2025, 2024, 2023, 2022]);
    expect(notifier.years).toEqual([2025, 2024, 2023, 2022]);
    expect(notifier.total_pages).toBe(6);
  });

  test(".year = value", function() {
    let notifier = new OrderNotifier();
    notifier.year = 2024;

    expect(notifier.message).toBe("Retrieving 2024 purchases...");
  });

  test(".year_page = value", function() {
    let notifier = new OrderNotifier();
    notifier.year = 2024;
    notifier.year_page = 1;

    expect(notifier.message).toBe("Retrieving 2024 purchases: page 1...");
  });

  test(".page_count = value", function() {
    let notifier = new OrderNotifier();
    notifier.year = 2024;
    notifier.year_page = 1;
    notifier.page_count = 3;

    expect(notifier.message).toBe("Retrieving 2024 purchases: page 1 of 3");
  });

  test(".page = value", function() {
    let notifier = new OrderNotifier();
    // notifier.year = 2024;
    // notifier.year_page = 1;
    notifier.total_pages = 24;
    notifier.page = 12;

    expect(notifier.percent).toBe(0.5);
  });

});
