/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

require("../src/dev.js");
require("../src/notifier.js");

describe("Notifier", () => {
  test("new Notifier", () => {
    let notifier = new Notifier();

    expect(notifier).toBeA(Notifier);
  });

  test.todo("listen(event)");

  describe("Progress calculation", () => {
    test(".item_no =", () => {
      jest.spyOn(Notifier.prototype, "total", "get").mockReturnValue(100);

      let notifier = new Notifier();
      notifier.item_no = 10;

      expect(notifier.item_no).toBe(10);
      expect(notifier.percent).toBe(0.1);
      expect(notifier.text).toBe(notifier.message);
    });

    test(".total =", () => {
      jest.spyOn(Notifier.prototype, "item_no", "get").mockReturnValue(10);

      let notifier = new Notifier();
      notifier.total = 100;

      expect(notifier.total).toBe(100);
      expect(notifier.text).toBe(notifier.message);

      expect().toBe();
    });

    test(".ratio", () => {
      let notifier = new Notifier();
      expect(notifier.ratio).toBeNull();

      notifier.total = 100;
      expect(notifier.ratio).toBeNull();

      notifier.item_no = 10;
      expect(notifier.ratio).toBe(0.1);
    });
  });

  describe("Elements", () => {
    let notifier = new Notifier();
    let s = notifier.selectors;

    test(".status", () => {
      let status = $(notifier.status.element)[0];

      expect(status.tagName).toBe("DIV");
    });

    test(".percentage", () => {
      let percentage = $(notifier.percentage.element)[0];

      expect(percentage.tagName).toBe("SPAN");
    });

    test(".steps", () => {
      let steps = $(notifier.steps.element)[0];

      expect(steps.tagName).toBe("SPAN");
    });

    test(".estimate", () => {
      let estimate = $(notifier.estimate.element)[0];

      expect(estimate.tagName).toBe("SPAN");
    });

    test(".messages", () => {
      let messages = $(notifier.messages.element)[0];

      expect(messages.tagName).toBe("DIV");

      expect($(messages).find(`#${s.status}`)[0]?.tagName).toBe("DIV");
      expect($(messages).find(`#${s.percentage}`)[0]?.tagName).toBe("SPAN");
    });

    test(".bar", () => {
      let bar = $(notifier.bar.element)[0];

      expect(bar.tagName).toBe("DIV");

      expect($(bar).find(`#${s.messages}`)[0]?.tagName).toBe("DIV");
    });

    test(".context", () => {
      let context = $(notifier.context.element)[0];

      expect(context.tagName).toBe("DIV");

      expect($(context).find(`#${s.steps}`)[0]?.tagName).toBe("SPAN");
      expect($(context).find(`#${s.estimate}`)[0]?.tagName).toBe("SPAN");
    });

    test(".wrapper", () => {
      let wrapper = $(notifier.wrapper.element)[0];

      expect(wrapper.tagName).toBe("DIV");

      expect($(wrapper).find(`#${s.bar}`)[0]?.tagName).toBe("DIV");
      expect($(wrapper).find(`#${s.context}`)[0]?.tagName).toBe("DIV");
    });
  });

  describe("Content attributes", () => {
    let notifier = new Notifier();

    afterEach(() => {
      notifier.reset();
    });

    test(".text =", () => {
      notifier.text = "oh hai.";
      expect(notifier.status.innerText).toBe("oh hai.");
    });

    test(".percent =", () => {
      document.body.getBoundingClientRect = jest.fn(() => ({
        width: 1000,
      }));

      notifier.percent = 0.2;
      expect(notifier.percentage.innerText).toBe("20%");
      expect(notifier.bar.style.width).toBe("160px");
    });

    test(".step =", () => {
      notifier.step = "Step 2 of 5: Purchases since 2020";
      expect(notifier.steps.innerText).toBe(
        "Step 2 of 5: Purchases since 2020",
      );
    });

    test(".time =", () => {
      notifier.time = "about 2.5 minutes remaining";
      expect(notifier.estimate.innerText).toBe("about 2.5 minutes remaining");
    });

    test(".step_text", () => {
      expect(notifier.step_text).toBe("");

      notifier.step_no = 1;
      expect(notifier.step_text).toBe("[Step 1 of 4]");

      notifier.step_desc = "Washing dishes";
      expect(notifier.step_text).toBe("[Step 1 of 4: Washing dishes]");
    });
  });

  describe("Time estimation", () => {
    let timers = [new Timer(0, 1000), new Timer(0, 1500), new Timer(0, 2000)];
    let notifier = new Notifier();

    afterEach(() => {
      notifier.times = [];
    });

    test(".timer =", () => {
      notifier.timer = timers[0];
      expect(notifier.times).toHaveLength(1);
      expect(notifier.times[0]).toBe(timers[0]);
    });

    test(".remaining", () => {
      notifier.total = 100;
      notifier.item_no = 10;
      expect(notifier.remaining).toBe(90);
    });

    test(".per_item", () => {
      notifier.times = timers;
      expect(notifier.per_item).toBe(1500);
    });

    test(".ms_left", () => {
      notifier.total = 100;
      notifier.item_no = 10;
      notifier.times = timers;

      expect(notifier.ms_left).toBe(135000 * notifier.estimate_padding);
    });

    test(".minutes_left", () => {
      notifier.times = timers;
      notifier.total = 100;
      notifier.item_no = 10;
      expect(notifier.minutes_left).toBe("2.4");

      notifier.times = [new Timer(0, timePerItem(notifier, 2.0))];
      expect(notifier.minutes_left).toBe("2");
    });

    test(".time_left", () => {
      let notifier = new Notifier();
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

      notifier.times = [new Timer(0, timePerItem(notifier, 0.5))];
      expect(notifier.time_left).toBe("less than a minute remaining");
    });
  });

  describe("DOM", () => {
    test(".create()", () => {
      let notifier = new Notifier();
      let s = notifier.selectors;
      notifier.create();

      expect($(`#${s.wrapper}`)).toHaveLength(1);
      expect($(`#${new Style().selectors.wrapper}`)).toHaveLength(1);

      expect(window.ae.notifier).toEqual(notifier);
      expect(window.ae.style).not.toBeNull();
    });

    test(".reset()", () => {
      let notifier = new Notifier();
      notifier.percent = 0.5;
      notifier.text = "loading...";
      notifier.step = "Step 1 of 4: Retrieving purchase history";
      notifier.time = "less than a minute remaining";

      notifier.reset();

      expect(notifier.bar.style.width).toBe("0px");
      expect(notifier.status.innerText).toBe("");
      expect(notifier.steps.innerText).toBe("");
      expect(notifier.estimate.innerText).toBe("");
    });

    test(".remove()", () => {
      let notifier = new Notifier();
      let s = notifier.selectors;
      notifier.create();
      notifier.remove();

      expect($(`#${s.wrapper}`).length).toBe(0);
    });

    test(".hide()", () => {
      let notifier = new Notifier();
      notifier.hide();

      expect(notifier.wrapper.classList).toContain("hidden");
    });

    test(".show()", () => {
      let notifier = new Notifier();
      notifier.wrapper.classList.add("hidden");
      notifier.show();

      expect(notifier.wrapper.classList).not.toContain("hidden");
    });
  });
});
