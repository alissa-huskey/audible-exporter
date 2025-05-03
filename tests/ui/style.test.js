const $ = require("jquery");

require("../../src/util.js");
require("../../src/ui/style.js");

describe("Style", () => {
  test("new Style()", () => {
    let element = new Style();
    expect(element).toBeA(Style);
  });

  test(".create()", () => {
    let element = new Style();
    element.create();

    expect($(`#${element.selectors.wrapper}`)).toHaveLength(1);
    expect(window.ae.style).toEqual(element);
  });

  test(".remove()", () => {
    window.ae.style = new Style();

    let element = new Style();
    element.remove();
  });
});
