require("../src/dev.js");
require("../src/util.js");

describe("Array", () => {
  test("first", () => {
    let arr = [1, 2, 3];

    expect(arr.first).toBe(1);
  });

  test("last", () => {
    let arr = [1, 2, 3];

    expect(arr.last).toBe(3);
  });
});
