/**
 * @jest-environment jsdom
 */

require("../src/dev.js");
require("../src/util.js");
require("../src/timer.js");
require("../src/element.js");
require("../src/dom.js");
require("../src/status-notifier.js");
require("../src/library-notifier.js");

describe("LibraryNotifier", function() {

  test(".item_no =", function() {
    let notifier = new LibraryNotifier();
    notifier.total = 100;
    notifier.item_no = 10;

    expect(notifier.item_no).toBe(10);
    expect(notifier.text).toBe(notifier.message);
    expect(notifier.percent).toBe(.1);
  });

  test(".total =", function() {
    let notifier = new LibraryNotifier();
    notifier.total = 100;

    expect(notifier.total).toBe(100);
    expect(notifier.text).toBe(notifier.message);
  });

  test(".message", function() {
    let notifier = new LibraryNotifier();
    expect(notifier.message).toBe("Retrieving library...");

    notifier.item_no = 1;
    expect(notifier.message).toBe("Retrieving library: page 1...");

    notifier.total = 10;
    expect(notifier.message).toBe("Retrieving library: page 1 of 10");
  });

  test(".listener()", function() {
    let notifier = new LibraryNotifier();
    notifier.create();

    dispatchEvent({total: 10});
    expect(notifier.total).toBe(10);

    dispatchEvent({item_no: 3});
    expect(notifier.item_no).toBe(3);

    timer = new Timer();
    dispatchEvent({timer: timer});
    expect(notifier.times).toEqual([timer]);

    dispatchEvent({percent: .2});
    expect(notifier.percent).toBe(.2);
  });
});
