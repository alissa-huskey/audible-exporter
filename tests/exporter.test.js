/**
 * @jest-environment jsdom
 */

require("../src/exporter.js");

describe("exporter", function() {
  exporter = Exporter();

  test("run() function", function() {
    expect(exporter.run).toBeDefined();
  });

  test("rando() function", function() {
    expect(exporter.rando(10)).toBeGreaterThanOrEqual(0);
  });

  test("reg() function", function() {
    expect(exporter.reg(/\d+/.exec("abc 53"), 0)).toBe("53");
    expect(exporter.reg(/\d+/.exec("abc"), 0)).toBe("");
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

    expect(exporter.cleanObject({a: null, b: "", c: undefined})).toEqual({});
    expect(exporter.cleanObject(includedTypes)).toEqual(includedTypes)
  });

  test("str() function", function() {
    expect(exporter.str(1)).toBe(1)
    expect(exporter.str({a: 1, b: "B"}))
      .toBe('{\\\"a\\\":1,\\\"b\\\":\\\"B\\\"}');
  });

  test("attr() function", function() {
    expect(exporter.attr).toBeDefined();
  });

  test("fetchDoc() function", function() {
    expect(exporter.fetchDoc).toBeDefined();
  });

  test("tryFloat()", function() {
    expect(exporter.tryFloat("1.2")).toBe(1.2);
  });

  test("dateString()", function() {
    expect(exporter.dateString("01-21-2025")).toBe("2025 Jan 21");
  });

  test("tsvReady()", function() {
    expect(exporter.tsvReady("a \r b \r c")).toBe("a ↵ b ↵ c");
    expect(exporter.tsvReady("a \n b \n c")).toBe("a ↵ b ↵ c");
    expect(exporter.tsvReady("a \t b \t c")).toBe("a   b   c");
    expect(exporter.tsvReady("a \v b \v c")).toBe("a   b   c");
    expect(exporter.tsvReady("a \f b \f c")).toBe("a   b   c");
    expect(exporter.tsvReady("a \0 b \0 c")).toBe("a  b  c");
    expect(exporter.tsvReady("a \\ b \\ c")).toEqual("a \\\\ b \\\\ c");
    expect(exporter.tsvReady("a ' b ' c")).toEqual("a \\' b \\' c");
    expect(exporter.tsvReady('a " b " c')).toEqual('a \\" b \\" c');
    expect(exporter.tsvReady("a \u0009 b \u0009 c")).toBe("a   b   c");
  });

  test("lengthOfBookInMinutes() function", function() {
    expect(exporter.lengthOfBookInMinutes("62 hrs and 48 mins")).toBe(3768);
    expect(exporter.lengthOfBookInMinutes("2 hrs")).toBe(120);
    expect(exporter.lengthOfBookInMinutes("50 mins")).toBe(50);
  });

  test("getCatType() function", function() {
    expect(exporter.getCatType("Music")).toBe("nonfiction")
  });
});
