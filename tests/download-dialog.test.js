/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

require("../src/dev.js");
require("../src/download-dialog.js");

describe("DownloadDialog", () => {
  let dialog = new DownloadDialog();

  test("new DownloadDialog", () => {
    expect(dialog).toBeA(DownloadDialog);
  });

  test("elements", () => {
    expect(dialog.wrapper).toBeA(Doc);
    expect(dialog.close_btn).toBeA(Doc);
    expect(dialog.dl_btn).toBeA(Doc);
  });

  test(".file =", () => {
    let file = {
      filename: "export.json",
      url: "blob:https://www.audible.com/9f6b4e9f-cd4e-4a60-b302-e8dbd5a485ec",
    };

    let dialog = new DownloadDialog();
    let a = dialog.dl_btn.element;

    dialog.file = file;

    expect(dialog.file).toEqual(file);
    expect(a.href).toBe(file.url);
    expect(a.download).toBe(file.filename);
  });
});
