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
require("../src/library-notifier.js");

describe("LibraryNotifier", () => {
  test(".item_no =", () => {
    let notifier = new LibraryNotifier();
    notifier.total = 100;
    notifier.item_no = 10;

    expect(notifier.item_no).toBe(10);
    expect(notifier.text).toBe(notifier.message);
    expect(notifier.percent).toBe(0.1);
  });

  test(".total =", () => {
    let notifier = new LibraryNotifier();
    notifier.total = 100;

    expect(notifier.total).toBe(100);
    expect(notifier.text).toBe(notifier.message);
  });

  test(".message", () => {
    let notifier = new LibraryNotifier();
    expect(notifier.message).toBe("Retrieving library...");

    notifier.item_no = 1;
    expect(notifier.message).toBe("Retrieving library: page 1...");

    notifier.total = 10;
    expect(notifier.message).toBe("Retrieving library: page 1 of 10");
  });

  test(".listener()", () => {
    let notifier = new LibraryNotifier();
    notifier.create();

    fireEvent({ total: 10 });
    expect(notifier.total).toBe(10);

    fireEvent({ item_no: 3 });
    expect(notifier.item_no).toBe(3);

    let timer = new Timer();
    fireEvent({ timer: timer });
    expect(notifier.times).toEqual([timer]);

    fireEvent({ percent: 0.2 });
    expect(notifier.percent).toBe(0.2);
  });
});
