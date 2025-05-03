const $ = require("jquery");

require("../../src/ui/dialog.js");

describe("Dialog", () => {
  let dialog = new Dialog();

  test("new Dialog", () => {
    expect(dialog).toBeA(Dialog);
  });

  test(".create()", () => {
    dialog.create();

    let exists = $(`.${dialog.selectors.wrapper}`);
    let style = $(`#${new Style().selectors.wrapper}`);

    expect(exists).toHaveLength(1);
    expect(exists[0]).toBeA(HTMLDialogElement);

    expect(style).toHaveLength(1);
    expect(style[0]).toBeA(HTMLStyleElement);
    expect(window.ae.style).toBeA(Style);
  });

  test("elements", () => {
    expect(dialog.wrapper).toBeA(Doc);
    expect(dialog.close_btn).toBeA(Doc);
  });

  test("show", () => {
    dialog.show();
    expect(showModalSpy.mock.calls).toHaveLength(1);
  });

  test("hide", () => {
    dialog.hide();
    expect(closeModalSpy.mock.calls).toHaveLength(1);
  });
});
