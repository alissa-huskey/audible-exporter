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

  test("new StatusNotifier", function() {
    let notifier = new StatusNotifier();

    expect(notifier).toBeA(StatusNotifier);
  });

  test.todo("listen(event)");

  describe("Progress calculation", function() {

    test(".item_no =", function() {
      jest.spyOn(StatusNotifier.prototype, "total", "get").mockReturnValue(100);

      let notifier = new StatusNotifier();
      notifier.item_no = 10;

      expect(notifier.item_no).toBe(10);
      expect(notifier.percent).toBe(0.1);
      expect(notifier.text).toBe(notifier.message);
    });

    test(".total =", function() {
      jest.spyOn(StatusNotifier.prototype, "item_no", "get").mockReturnValue(10);

      let notifier = new StatusNotifier();
      notifier.total = 100;

      expect(notifier.total).toBe(100);
      expect(notifier.text).toBe(notifier.message);

      expect().toBe();
    });

    test(".ratio", function() {
      let notifier = new StatusNotifier();
      expect(notifier.ratio).toBeNull();

      notifier.total = 100;
      expect(notifier.ratio).toBeNull();

      notifier.item_no = 10;
      expect(notifier.ratio).toBe(0.1);
    });

  });

  describe("Elements", function() {
    let notifier = new StatusNotifier();

    test(".status", function() {
      let status = $(notifier.status.element)[0];

      expect(status.tagName).toBe("DIV");
    });

    test(".percentage", function() {
      let percentage = $(notifier.percentage.element)[0];

      expect(percentage.tagName).toBe("SPAN");
    });

    test(".steps", function() {
      let steps = $(notifier.steps.element)[0];

      expect(steps.tagName).toBe("SPAN");
    });

    test(".estimate", function() {
      let estimate = $(notifier.estimate.element)[0];

      expect(estimate.tagName).toBe("SPAN");
    });

    test(".messages", function() {
      let messages = $(notifier.messages.element)[0];

      expect(messages.tagName).toBe("DIV");

      expect($(messages).find(`#${notifier.selectors.status}`)[0]?.tagName).toBe("DIV");
      expect($(messages).find(`#${notifier.selectors.percentage}`)[0]?.tagName).toBe("SPAN");
    });

    test(".bar", function() {
      let bar = $(notifier.bar.element)[0];

      expect(bar.tagName).toBe("DIV");

      expect($(bar).find(`#${notifier.selectors.messages}`)[0]?.tagName).toBe("DIV");
    });

    test(".context", function() {
      let context = $(notifier.context.element)[0];

      expect(context.tagName).toBe("DIV");

      expect($(context).find(`#${notifier.selectors.steps}`)[0]?.tagName).toBe("SPAN");
      expect($(context).find(`#${notifier.selectors.estimate}`)[0]?.tagName).toBe("SPAN");
    });

    test(".wrapper", function() {
      let wrapper = $(notifier.wrapper.element)[0];

      expect(wrapper.tagName).toBe("DIV");

      expect($(wrapper).find(`#${notifier.selectors.bar}`)[0]?.tagName).toBe("DIV");
      expect($(wrapper).find(`#${notifier.selectors.context}`)[0]?.tagName).toBe("DIV");
    });

  });

  describe("Content attributes", function() {
    let notifier = new StatusNotifier();

    afterEach(() => {
      notifier.reset();
    });

    test(".text =", function() {
      notifier.text = "oh hai."
      expect(notifier.status.innerText).toBe("oh hai.");
    });

    test(".percent =", function() {
      document.body.getBoundingClientRect = jest.fn(() => ({
        width: 1000,
      }))

      notifier.percent = 0.2;
      expect(notifier.percentage.innerText).toBe("20%");
      expect(notifier.bar.style.width).toBe("160px");
    });

    test(".step =", function() {
      notifier.step = "Step 2 of 5: Purchases since 2020";
      expect(notifier.steps.innerText).toBe("Step 2 of 5: Purchases since 2020");
    });

    test(".time =", function() {
      notifier.time = "about 2.5 minutes remaining"
      expect(notifier.estimate.innerText).toBe("about 2.5 minutes remaining");
    });

    test(".step_text", function() {
      expect(notifier.step_text).toBe("");

      notifier.step_no = 1;
      expect(notifier.step_text).toBe("[Step 1 of 4]");

      notifier.step_desc = "Washing dishes"
      expect(notifier.step_text).toBe("[Step 1 of 4: Washing dishes]");
    });

  });

  describe("Time estimation", function() {
    let timers = [new Timer(0, 1000), new Timer(0, 1500), new Timer(0, 2000)];
    let notifier = new StatusNotifier();

    afterEach(() => {
      notifier.times = [];
    });

    test(".timer =", function() {
      notifier.timer = timers[0];
      expect(notifier.times).toHaveLength(1);
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

      expect(notifier.ms_left).toBe((135000 * notifier.estimate_padding));
    });

    test(".minutes_left", function() {
      notifier.times = timers;
      notifier.total = 100;
      notifier.item_no = 10;
      expect(notifier.minutes_left).toBe("2.4");

      notifier.times = [new Timer(0, timePerItem(notifier, 2.0))];
      expect(notifier.minutes_left).toBe("2");
    });

    test(".time_left", function() {
      let notifier = new StatusNotifier();
      expect(notifier.time_left).toBe("");

      notifier.total = 100;
      expect(notifier.time_left).toBe("");

      notifier.item_no = 50;
      expect(notifier.time_left).toBe("");

      notifier.times = [new Timer(0, timePerItem(notifier, 10.5))];
      expect(notifier.time_left).toBe("about 10.5 minutes remaining");

      notifier.item_no = 99;
      notifier.times = [new Timer(0, timePerItem(notifier, 1))];
      expect(notifier.time_left).toBe("about a minute remaining");

      notifier.times = [new Timer(0, timePerItem(notifier, .5))];
      expect(notifier.time_left).toBe("less than a minute remaining");
    });

  });

  describe("DOM", function() {

    test(".create()", function() {
      let notifier = new StatusNotifier();
      notifier.create();

      expect(window.ae.notifier).toEqual(notifier);
      expect($(`#${notifier.selectors.wrapper}`)).toHaveLength(1);
    });

    test(".reset()", function() {
      let notifier = new StatusNotifier();
      notifier.percent = .5;
      notifier.text = "loading...";
      notifier.step = "Step 1 of 4: Retrieving purchase history";
      notifier.time = "less than a minute remaining";

      notifier.reset();

      expect(notifier.bar.style.width).toBe("0px");
      expect(notifier.status.innerText).toBe("");
      expect(notifier.steps.innerText).toBe("");
      expect(notifier.estimate.innerText).toBe("");
    });

    test(".remove()", function() {
      let notifier = new StatusNotifier();
      notifier.create();
      notifier.remove();

      expect(window.ae.notifier).toBeNull;
      expect($(`#${notifier.selectors.wrapper}`).length).toBe(0);
    });

    test(".hide()", function() {
      let notifier = new StatusNotifier();
      notifier.hide();

      expect(notifier.wrapper.classList).toContain("hidden");
    });

    test(".show()", function() {
      let notifier = new StatusNotifier();
      notifier.wrapper.classList.add("hidden");
      notifier.show();

      expect(notifier.wrapper.classList).not.toContain("hidden");
    });

  });

});
