require("../src/dev.js");
require("../src/util.js");

describe("util", function() {

  test("isEmpty()", function() {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({a: 1})).toBe(false);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty([1])).toBe(false);
  });

  test(".entityDecode()", function() {
    expect(entityDecode("Science Fiction &amp; Fantasy")).toBe("Science Fiction & Fantasy")
  });

  test("tryInt()", function() {
    expect(tryInt("a")).toBe("a");
    expect(tryInt("1.2")).toBe("1.2");
    expect(tryInt("1")).toBe(1);
  });

  test("tryFloat()", function() {
    expect(tryFloat("a")).toBe("a");
    expect(tryFloat("1.2")).toBe(1.2);
  });

  test("dateString()", function() {
    expect(dateString("01-21-2025")).toBe("2025 Jan 21");
  });

  test("rando() function", function() {
    expect(rando(10)).toBeGreaterThanOrEqual(0);
  });

  test("reg() function", function() {
    expect(reg(/\d+/.exec("abc 53"), 0)).toBe("53");
    expect(reg(/\d+/.exec("abc"), 0)).toBe("");
  });

  test("cleanObject() function", function() {
    let includedTypes = {
      a: true,
      b: "b",
      c: Symbol("id"),
      d: 5,
      e: () => 1,
      f: {A: 1},
      g: [1, 2, 3],
    }

    expect(cleanObject({a: null, b: "", c: undefined})).toEqual({});
    expect(cleanObject(includedTypes)).toEqual(includedTypes)
  });
});
