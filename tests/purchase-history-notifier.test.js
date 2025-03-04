/**
 * @jest-environment jsdom
 */

require("../src/dev.js");
require("../src/util.js");
require("../src/timer.js");
require("../src/element.js");
require("../src/dom.js");
require("../src/status-notifier.js");
require("../src/purchase-history-notifier.js");


describe("PurchaseHistoryNotifier", function() {
  let notifier = new PurchaseHistoryNotifier();

  test("new PurchaseHistoryNotifier()", function() {
    let notifier = new PurchaseHistoryNotifier();
    expect(notifier.constructor.name).toBe("PurchaseHistoryNotifier");
    expect(notifier.message).toBe("Retrieving purchases history...");
  });

  test(".year = value", function() {
    let years = [2025, 2024, 2023, 2022];
    let notifier = new PurchaseHistoryNotifier(years);
    notifier.year = 2024;

    expect(notifier.years).toEqual(years);
    expect(notifier.percent).toBe(0.25);
    expect(notifier.message).toBe("Retrieving purchases history: 2024");
    expect().toBe();
  });

});
