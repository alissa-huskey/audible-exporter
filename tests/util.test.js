require("../src/dev.js");
require("../src/util.js");

describe("util", () => {
  test("isEmpty()", () => {
    expect(isEmpty({})).toBe(true);
    expect(isEmpty({ a: 1 })).toBe(false);
    expect(isEmpty([])).toBe(true);
    expect(isEmpty([1])).toBe(false);
  });

  test(".entityDecode()", () => {
    expect(entityDecode("Science Fiction &amp; Fantasy")).toBe(
      "Science Fiction & Fantasy",
    );
  });

  test("tryInt()", () => {
    expect(tryInt("a")).toBe("a");
    expect(tryInt("1.2")).toBe("1.2");
    expect(tryInt("1")).toBe(1);
  });

  test("tryFloat()", () => {
    expect(tryFloat("a")).toBe("a");
    expect(tryFloat("1.2")).toBe(1.2);
  });

  test("dateString()", () => {
    expect(dateString("01-21-2025")).toBe("1/21/2025");
  });

  test("rando() function", () => {
    expect(rando(10)).toBeGreaterThanOrEqual(0);
  });

  test("reg() function", () => {
    expect(reg(/\d+/.exec("abc 53"), 0)).toBe("53");
    expect(reg(/\d+/.exec("abc"), 0)).toBe("");
  });

  test("parseTime()", () => {
    expect(parseTime("62 hrs and 48 mins")).toEqual([62, 48]);
    expect(parseTime("2 hrs")).toEqual([2, 0]);
    expect(parseTime("50 mins")).toEqual([0, 50]);
    expect(parseTime("1 hr")).toEqual([1, 0]);
    expect(parseTime("3 hrs 1 min")).toEqual([3, 1]);
  });

  test("toMinutes()", () => {
    expect(toMinutes(62, 48)).toBe(3768);
    expect(toMinutes(2, 0)).toBe(120);
    expect(toMinutes(0, 50)).toBe(50);
    expect(toMinutes(undefined, 10)).toBe(10);
    expect(toMinutes(1, undefined)).toBe(60);
  });

  test("cleanObject() function", () => {
    let includedTypes = {
      a: true,
      b: "b",
      c: Symbol("id"),
      d: 5,
      e: () => 1,
      f: { A: 1 },
      g: [1, 2, 3],
    };

    expect(cleanObject({ a: null, b: "", c: undefined })).toEqual({});
    expect(cleanObject(includedTypes)).toEqual(includedTypes);
  });
});
