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
require("../src/start-modal.js");

describe("StartModal", () => {
  let modal = new StartModal();

  test("new StartModal", () => {
    expect(modal).toBeA(StartModal);
  });

  test("elements", () => {
    expect(modal.wrapper).toBeA(Doc);
    expect(modal.close_btn).toBeA(Doc);
    expect(modal.start_btn).toBeA(Doc);
  });
});
