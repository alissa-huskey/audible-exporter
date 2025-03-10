/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

require("../src/dev.js");
require("../src/util.js");
require("../src/doc.js");
require("../src/list.js");
require("../src/dom.js");
require("../src/style.js");
require("../src/modal.js");
require("../src/download-modal.js");

describe("DownloadModal", () => {
  let modal = new DownloadModal();

  test("new DownloadModal", () => {
    expect(modal).toBeA(DownloadModal);
  });

  test("elements", () => {
    expect(modal.wrapper).toBeA(Doc);
    expect(modal.close_btn).toBeA(Doc);
    expect(modal.dl_btn).toBeA(Doc);
  });

  test(".file =", () => {
    let file = {
      filename: "export.json",
      url: "blob:https://www.audible.com/9f6b4e9f-cd4e-4a60-b302-e8dbd5a485ec",
    };

    let modal = new DownloadModal();
    let a = modal.dl_btn.element;

    modal.file = file;

    expect(modal.file).toEqual(file);
    expect(a.href).toBe(file.url);
    expect(a.download).toBe(file.filename);
  });
});
