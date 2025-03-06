/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

require("../src/dev.js");
require("../src/util.js");
require("../src/element.js");
require("../src/dom.js");
require("../src/timer.js");
require("../src/status-notifier.js");


describe("StatusNotifier", function() {
  let timers = [new Timer(0, 1000), new Timer(0, 1500), new Timer(0, 2000)];

  document.body.getBoundingClientRect = jest.fn(() => ({
    width: 1000,
  }))
  let notifier = new StatusNotifier();

  test("new StatusNotifier", function() {
    expect(notifier.constructor.name).toBe("StatusNotifier");
  });

  test(".item_no = value", function() {
    let notifier = new StatusNotifier();
    notifier.total = 100;
    notifier.item_no = 10;

    expect(notifier.item_no).toBe(10);
    expect(notifier.percent).toBe(0.1);
    expect(notifier.text).toBe(notifier.message);
  });

  test(".total = value", function() {
    let notifier = new StatusNotifier();
    notifier.item_no = 10;
    notifier.total = 100;

    expect(notifier.total).toBe(100);
    expect(notifier.text).toBe(notifier.message);

    expect().toBe();
  });

  test(".ratio", function() {
    notifier.total = 100;
    notifier.item_no = 10;

    expect(notifier.ratio).toBe(.1);
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

  test("elements", function() {
    expect(notifier.wrapper.constructor.name).toBe("Element");
    expect(notifier.bar.constructor.name).toBe("Element");
    expect(notifier.status.constructor.name).toBe("Element");
    expect(notifier.percentage.constructor.name).toBe("Element");
  });

  test(".create()", function() {
    notifier.create();

    el = Element.gi(notifier.selectors.wrapper);
    expect(el.element.constructor.name).toBe("HTMLDivElement");
    expect(el.gi(notifier.selectors.bar)).toBeDefined();
    expect(el.gi(notifier.selectors.status)).toBeDefined();
  });

  test(".text", function() {
    notifier.text = "oh hai."
    expect(notifier.status.innerText).toBe("oh hai.");
  });

  test(".percent", function() {
    notifier.percent = 0.2;
    expect(notifier.percentage.innerText).toBe("20%");
    expect(notifier.bar.style.width).toBe("160px");
  });

  test(".reset()", function() {
    notifier.percent = .5;
    notifier.text = "loading...";

    notifier.reset();

    expect(notifier.bar.style.width).toBe("0px");
    expect(notifier.status.innerText).toBe("");
  });

  test(".remove()", function() {
    notifier.create();
    notifier.remove();
    expect($(`#${notifier.selectors.wrapper}`).length).toBe(0);
  });

  test(".timer = value", function() {
    notifier.timer = timers[0];
    expect(notifier.times[0]).toBe(timers[0]);
  });

  test(".time_left", function() {
    let notifier = new StatusNotifier();
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


  test("", function() {
  });

});
