require("../src/dev.js");
require("../src/util.js");

describe("util", function() {

  test(".entityDecode()", function() {
    expect(entityDecode("Science Fiction &amp; Fantasy")).toBe("Science Fiction & Fantasy")
  });

  test("tryFloat()", function() {
    expect(tryFloat("1.2")).toBe(1.2);
  });

  test("dateString()", function() {
    expect(dateString("01-21-2025")).toBe("2025 Jan 21");
  });
});
