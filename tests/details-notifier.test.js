/**
 * @jest-environment jsdom
 */

require("../src/dev.js");
require("../src/util.js");
require("../src/timer.js");
require("../src/element.js");
require("../src/dom.js");
require("../src/status-notifier.js");
require("../src/details-notifier.js");

describe("DetailsNotifier", function() {
  let timers = [new Timer(0, 1000), new Timer(0, 1500), new Timer(0, 2000)];

  let notifier = new DetailsNotifier();

  test(".item_no = value", function() {
    let notifier = new DetailsNotifier();
    notifier.total = 100;
    notifier.item_no = 10;

    expect(notifier.item_no).toBe(10);
    expect(notifier.percent).toBe(0.1);
    expect(notifier.text).toBe(notifier.message);
  });

  test(".total = value", function() {
    let notifier = new DetailsNotifier();
    notifier.item_no = 10;
    notifier.total = 100;

    expect(notifier.total).toBe(100);
    expect(notifier.text).toBe(notifier.message);

    expect().toBe();
  });

  test(".timer = value", function() {
    notifier.timer = timers[0];
    expect(notifier.times[0]).toBe(timers[0]);
  });

  test(".remaining", function() {
    notifier.total = 100;
    notifier.item_no = 10;
    expect(notifier.remaining).toBe(90);

  });

  test(".per_item", function() {
    notifier.times = timers;
    expect(notifier.per_item).toBe(1500);
  });

  test(".ms_left", function() {
    notifier.total = 100;
    notifier.item_no = 10;
    notifier.times = timers;

    expect(notifier.ms_left).toBe((135000 * 1.05));
  });

  test(".minutes_left", function() {
    notifier.total = 100;
    notifier.item_no = 10;
    notifier.times = timers;

    expect(notifier.minutes_left).toBe("2.4");
  });

  test(".time_left", function() {
    let notifier = new DetailsNotifier();
    notifier.total = 100;

    notifier.item_no = 50;
    notifier.times = [new Timer(0, timePerItem(notifier, 10.5))];
    expect(notifier.time_left).toBe(" (about 10.5 minutes remaining)");

    notifier.item_no = 99;
    notifier.times = [new Timer(0, timePerItem(notifier, 1))];
    expect(notifier.time_left).toBe(" (about a minute remaining)");

    notifier.times = [new Timer(0, timePerItem(notifier, .5))];
    expect(notifier.time_left).toBe(" (less than a minute remaining)");
  });

  test(".message", function() {
    let notifier = new DetailsNotifier();
    expect(notifier.message).toBe("Retrieving additional information on titles...");

    notifier.total = 100;
    notifier.item_no = 50;
    expect(notifier.message).toBe("Retrieving book 50 of 100");

    notifier.times = [new Timer(0, timePerItem(notifier, 10.5))];
    expect(notifier.message).toBe(`Retrieving book 50 of 100 (about 10.5 minutes remaining)`);
  });

});
