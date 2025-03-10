/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

require("../src/modal.js");

describe("Modal", () => {
  let modal = new Modal();

  test("new Modal", () => {
    expect(modal).toBeA(Modal);
  });

  test(".create()", () => {
    modal.create();

    let modals = $(`.${modal.selectors.wrapper}`);
    let style = $(`#${new Style().selectors.wrapper}`);

    expect(modals).toHaveLength(1);
    expect(modals[0]).toBeA(HTMLDivElement);

    expect(style).toHaveLength(1);
    expect(style[0]).toBeA(HTMLStyleElement);
    expect(window.ae.style).toBeA(Style);
  });

  test("elements", () => {
    expect(modal.wrapper).toBeA(Doc);
    expect(modal.close_btn).toBeA(Doc);
  });

  test("show", () => {
    modal.show();
    expect(modal.wrapper.style.display).toBe("block");
  });

  test("hide", () => {
    modal.hide();
    expect(modal.wrapper.style.display).toBe("none");
  });
});
