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
    expect(modal).toBeA(Modal);
  });

  test(".create()", function() {
    modal.create();

    el = new Element(document).gcf(modal.selectors.wrapper);
    expect(el.element).toBeA(HTMLDivElement);
  });

  test("elements", function() {
    expect(modal.wrapper).toBeA(Element);
    expect(modal.close_btn).toBeA(Element);
    expect(modal.dl_btn).toBeA(Element);
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
    let file = {
      filename: "export.json",
      url: "blob:https://www.audible.com/9f6b4e9f-cd4e-4a60-b302-e8dbd5a485ec",
    };

    let modal = new Modal();
    let a = modal.dl_btn.element;

    modal.file = file;

    expect(modal.file).toEqual(file);
    expect(a.href).toBe(file.url);
    expect(a.download).toBe(file.filename);
  });

});
