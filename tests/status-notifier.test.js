/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

require("../src/dev.js");
require("../src/util.js");
require("../src/element.js");
require("../src/status-notifier.js");


describe("StatusNotifier", function() {
  document.body.getBoundingClientRect = jest.fn(() => ({
    width: 1000,
  }))
  let notifier = new StatusNotifier();

  test("new StatusNotifier", function() {
    expect(notifier.constructor.name).toBe("StatusNotifier");
  });

  test("elements", function() {
    expect(notifier.wrapper.constructor.name).toBe("Element");
    expect(notifier.bar.constructor.name).toBe("Element");
    expect(notifier.status.constructor.name).toBe("Element");
    expect(notifier.percentage.constructor.name).toBe("Element");
  });

  test(".create()", function() {
    notifier.create();

    el = Element.gi(notifier.selectors.notifier);
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

  test(".updateProgress()", function() {
    notifier.updateProgress(.3, 2);
    expect(notifier.percentage.innerText).toBe("30%");
    expect(notifier.bar.style.width).toBe("240px");
    expect(notifier.bar.style.background).toBe("rgb(7, 186, 91)");
  });

  test(".reset()", function() {
    notifier.percent = .5;
    notifier.bar.style.background = "#fff";
    notifier.text = "loading...";

    notifier.reset();

    expect(notifier.bar.style.width).toBe("0px");
    expect(notifier.bar.style.background).toBe("rgb(7, 186, 91)");
    expect(notifier.status.innerText).toBe("");
  });

  test(".delete()", function() {
    notifier.create();
    notifier.delete();
    expect($(`#${notifier.selectors.notifier}`).length).toBe(0);
  });

  test("", function() {
  });

});
