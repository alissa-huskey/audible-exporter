require("../src/dev.js");
require("../src/util.js");

describe("util", function() {

  test("str() function", function() {
    expect(str(1)).toBe(1)
    expect(str({a: 1, b: "B"}))
      .toBe('{\\\"a\\\":1,\\\"b\\\":\\\"B\\\"}');
  });

  test(".entityDecode()", function() {
    expect(entityDecode("Science Fiction &amp; Fantasy")).toBe("Science Fiction & Fantasy")
  });

  test("tryFloat()", function() {
    expect(tryFloat("1.2")).toBe(1.2);
  });

  test("dateString()", function() {
    expect(dateString("01-21-2025")).toBe("2025 Jan 21");
  });

  test("rando() function", function() {
    expect(rando(10)).toBeGreaterThanOrEqual(0);
  });

  test("tsvReady()", function() {
    expect(tsvReady("a \r b \r c")).toBe("a ↵ b ↵ c");
    expect(tsvReady("a \n b \n c")).toBe("a ↵ b ↵ c");
    expect(tsvReady("a \t b \t c")).toBe("a   b   c");
    expect(tsvReady("a \v b \v c")).toBe("a   b   c");
    expect(tsvReady("a \f b \f c")).toBe("a   b   c");
    expect(tsvReady("a \0 b \0 c")).toBe("a  b  c");
    expect(tsvReady("a \\ b \\ c")).toEqual("a \\\\ b \\\\ c");
    expect(tsvReady("a ' b ' c")).toEqual("a \\' b \\' c");
    expect(tsvReady('a " b " c')).toEqual('a \\" b \\" c');
    expect(tsvReady("a \u0009 b \u0009 c")).toBe("a   b   c");
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
