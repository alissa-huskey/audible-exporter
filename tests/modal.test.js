/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

require("../src/dev.js");
require("../src/util.js");
require("../src/element.js");
require("../src/list.js");
require("../src/dom.js");
require("../src/modal.js");


describe("Modal", function() {
  let modal = new Modal();

  test("new Modal", function() {
    expect(modal.constructor.name).toBe("Modal");
  });

  test(".create()", function() {
    modal.create();

    el = new Element(document).gcf(modal.selectors.wrapper);
    expect(el.element.constructor.name).toBe("HTMLDivElement");
  });

  test("elements", function() {
    expect(modal.wrapper.constructor.name).toBe("Element");
    expect(modal.close_btn.constructor.name).toBe("Element");
    expect(modal.dl_btn.constructor.name).toBe("Element");
  });

  test("show", function() {
    modal.show();
    expect(modal.wrapper.style.display).toBe("block");
  });

  test("hide", function() {
    modal.hide();
    expect(modal.wrapper.style.display).toBe("none");
  });

});
