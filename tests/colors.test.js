/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

require("../src/dev.js");
require("../src/util.js");
require("../src/doc.js");
require("../src/dom.js");
require("../src/colors.js");

describe("Colors", () => {
  test("new Colors()", () => {
    let element = new Colors();
    expect(element).toBeA(Colors);
  });

  test(".create()", () => {
    let element = new Colors();
    element.create();

    expect($(`#${element.selectors.style}`)).toHaveLength(1);
    expect(window.ae.colors).toEqual(element);
  });

  test(".remove()", () => {
    window.ae.colors = new Colors();

    let element = new Colors();
    element.remove();
  });
});
