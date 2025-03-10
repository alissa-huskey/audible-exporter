/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

require("../src/dev.js");
require("../src/util.js");
require("../src/doc.js");
require("../src/dom.js");
require("../src/style.js");

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
