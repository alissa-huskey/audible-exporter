/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

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
