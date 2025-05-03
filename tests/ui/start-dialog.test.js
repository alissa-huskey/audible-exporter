require("../../src/ui/start-dialog.js");

describe("StartDialog", () => {
  let dialog = new StartDialog();

  test("new StartDialog", () => {
    expect(dialog).toBeA(StartDialog);
  });

  test("elements", () => {
    expect(dialog.wrapper).toBeA(Doc);
    expect(dialog.close_btn).toBeA(Doc);
    expect(dialog.start_btn).toBeA(Doc);
  });
});
