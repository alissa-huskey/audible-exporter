/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

require("../src/dev.js");
require("../src/util.js");
require("../src/element.js");
require("../src/dom.js");
require("../src/colors.js");

describe("Colors", function() {

  test("new Colors()", function() {
    let element = new Colors();
    expect(element).toBeA(Colors);
  });

  test(".create()", function() {
    let element = new Colors();
    element.create();

    expect($(`#${element.selectors.style}`)).toHaveLength(1);
    expect(window.ae.colors).toEqual(element);
  });

  test(".remove()", function() {
    window.ae.colors = new Colors();

    let element = new Colors();
    element.remove();


    expect(window.ae.colors).toBeNull();
  });

});
