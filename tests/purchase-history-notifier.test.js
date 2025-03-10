/**
 * @jest-environment jsdom
 */

require("../src/dev.js");
require("../src/util.js");
require("../src/timer.js");
require("../src/doc.js");
require("../src/dom.js");
require("../src/style.js");
require("../src/status-notifier.js");
require("../src/purchase-history-notifier.js");

describe("PurchaseHistoryNotifier", () => {
  let notifier = new PurchaseHistoryNotifier();

  test("new PurchaseHistoryNotifier()", () => {
    let notifier = new PurchaseHistoryNotifier();
    expect(notifier).toBeA(PurchaseHistoryNotifier);
    expect(notifier.message).toBe("Retrieving purchase history...");
  });

  test(".year =", () => {
    let years = [2025, 2024, 2023, 2022];
    let notifier = new PurchaseHistoryNotifier(years);
    notifier.year = 2024;

    expect(notifier.years).toEqual(years);
    expect(notifier.percent).toBe(0.25);
  });

  test(".item_no", () => {
    let notifier = new PurchaseHistoryNotifier([
      "2025",
      "2024",
      "2023",
      "2022",
    ]);
    notifier.year = "2024";

    expect(notifier.item_no).toBe(1);
  });

  test(".years =", () => {
    let years = ["2025", "2024", "2023", "2022"];
    let notifier = new PurchaseHistoryNotifier();
    notifier.year = "2024";
    notifier.years = years;

    expect(notifier.years).toEqual(years);
    expect(notifier.percent).toBe(0.25);
  });

  test(".total", () => {
    let notifier = new PurchaseHistoryNotifier([
      "2025",
      "2024",
      "2023",
      "2022",
    ]);

    expect(notifier.total).toBe(4);
  });

  test(".message", () => {
    let notifier = new PurchaseHistoryNotifier();
    expect(notifier.message).toBe("Retrieving purchase history...");

    notifier.years = ["2025", "2024", "2023", "2022"];
    notifier.year = "2024";
    expect(notifier.message).toBe("Retrieving purchase history: 2024");
  });
});
