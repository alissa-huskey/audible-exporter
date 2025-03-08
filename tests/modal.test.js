/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

require("../src/dev.js");
require("../src/util.js");
require("../src/doc.js");
require("../src/list.js");
require("../src/dom.js");
require("../src/colors.js");
require("../src/modal.js");

describe("Modal", () => {
  let modal = new Modal();

  test("new Modal", () => {
    expect(modal).toBeA(Modal);
  });

  test(".create()", () => {
    modal.create();

    modals = $(`.${modal.selectors.wrapper}`);
    colors = $(`#${new Colors().selectors.style}`);

    expect(modals).toHaveLength(1);
    expect(modals[0]).toBeA(HTMLDivElement);

    expect(colors).toHaveLength(1);
    expect(colors[0]).toBeA(HTMLStyleElement);
    expect(window.ae.colors).toBeA(Colors);
  });

  test("elements", () => {
    expect(modal.wrapper).toBeA(Doc);
    expect(modal.close_btn).toBeA(Doc);
    expect(modal.dl_btn).toBeA(Doc);
  });

  test("show", () => {
    modal.show();
    expect(modal.wrapper.style.display).toBe("block");
  });

  test("hide", () => {
    modal.hide();
    expect(modal.wrapper.style.display).toBe("none");
  });

  test(".file =", () => {
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
