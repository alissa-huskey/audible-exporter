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

  test(".file =", function() {
    let a = modal.dl_btn.element;
    let [url, name] = ["blob:https://www.audible.com/9f6b4e9f-cd4e-4a60-b302-e8dbd5a485ec", "export.json"];
    modal.file = [url, name];

    expect(a.href).toBe(url);
    expect(a.download).toBe(name);
  });

});
