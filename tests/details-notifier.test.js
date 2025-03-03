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


describe("Notifier", function() {
  // document.body.getBoundingClientRect = jest.fn(() => ({
  //   width: 1000,
  // }))
  // let notifier = new StatusNotifier();

  // test("new StatusNotifier", function() {
  //   expect(notifier.constructor.name).toBe("StatusNotifier");
  // });

  let timers = [new Timer(0, 1000), new Timer(0, 1500), new Timer(0, 2000)];

  let notifier = new DetailsNotifier();

  test(".timer = value", function() {
    notifier.timer = timers[0];
    expect(notifier.times[0]).toBe(timers[0]);
  });

  test(".remaining", function() {
    notifier.book_count = 100;
    notifier.book = 10;
    expect(notifier.remaining).toBe(90);

  });

  test(".per_book", function() {
    notifier.times = timers;
    expect(notifier.per_book).toBe(1500);
  });

  test(".ms_left", function() {
    notifier.book_count = 100;
    notifier.book = 10;
    notifier.times = timers;

    expect(notifier.ms_left).toBe((135000 * 1.05));
  });

  test(".minutes_left", function() {
    notifier.book_count = 100;
    notifier.book = 10;
    notifier.times = timers;

    expect(notifier.minutes_left).toBe("2.4");
  });

  test("", function() {
    expect().toBe();
  });

});
