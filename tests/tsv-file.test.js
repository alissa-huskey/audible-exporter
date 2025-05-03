/**
 * @jest-environment jsdom
 */

require("../src/dev.js");
require("../src/tsv-file.js");

describe("TSVFile", () => {
  test("new TSVFile()", () => {
    let file = new TSVFile();
    expect(file).toBeA(TSVFile);

    let records = [{ a: 1 }];
    file = new TSVFile(records);
    expect(file.records).toEqual(records);
  });

  test(".filename", () => {
    let file = new TSVFile();
    expect(file.filename).toMatch(/^audible_\d+\.tsv$/);
  });

  test(".headers", () => {
    let records = [{ a: 1, b: 2, c: 3 }];
    let file = new TSVFile(records);
    expect(file.headers).toEqual(["a", "b", "c"]);
  });

  test(".rows", () => {
    let records = [{ a: 1, b: 2, c: 3 }];
    let file = new TSVFile(records);
    expect(file.rows).toEqual([["1", "2", "3"]]);
  });

  test(".sanitize()", () => {
    let file = new TSVFile();

    expect(file.sanitize(1)).toEqual("1");
    expect(file.sanitize("a\nb\tc")).toEqual("a b c");
    expect(file.sanitize("a \r b \r c")).toBe("a   b   c");
    expect(file.sanitize("a \n b \n c")).toBe("a   b   c");
    expect(file.sanitize("a \t b \t c")).toBe("a   b   c");
    expect(file.sanitize("a \v b \v c")).toBe("a   b   c");
    expect(file.sanitize("a \f b \f c")).toBe("a   b   c");
    expect(file.sanitize("a \0 b \0 c")).toBe("a  b  c");
    expect(file.sanitize("a \\ b \\ c")).toEqual("a \\\\ b \\\\ c");
    expect(file.sanitize("a ' b ' c")).toEqual("a \\' b \\' c");
    expect(file.sanitize('a " b " c')).toEqual('a \\" b \\" c');
    expect(file.sanitize("a \u0009 b \u0009 c")).toBe("a   b   c");
    expect(file.sanitize({ a: 1, b: 2 })).toBe('{\\"a\\":1,\\"b\\":2}');
    expect(file.sanitize([{ a: 1 }, { b: 2 }])).toBe(
      '[{\\"a\\":1},{\\"b\\":2}]',
    );
  });

  test(".contents", () => {
    let records = [{ a: 1, b: 2, c: 3 }];
    let file = new TSVFile(records);
    expect(file.contents).toEqual("a\tb\tc\n1\t2\t3\n");
  });

  test(".blob", () => {
    let records = [{ a: 1, b: 2, c: 3 }];
    let file = new TSVFile(records);
    let blob = file.blob;
    expect(blob).toBeA(Blob);
    expect(blob.type).toBe("text/tsv");
  });

  test(".url", () => {
    let file = new TSVFile([{ a: 1, b: 2, c: 3 }]);
    expect(file.url).toMatch(/^blob:/);
  });

  test(".preprocess()", () => {
    let file = new TSVFile([
      {
        series: [
          {
            name: "The Chronicles of Narnia (Publication Order)",
            number: "1",
          },
          {
            name: "The Chronicles of Narnia (Author's Preferred Order)",
            number: "2",
          },
        ],
        authors: [{ name: "C. S. Lewis" }],
        narrators: ["Michael York"],
        audible_original: false,
      },
    ]);

    file.preprocess();
    record = file.records[0];

    expect(record.authors).toBe("C. S. Lewis");
    expect(record.narrators).toBe("Michael York");
    expect(record.series).toBe(
      "The Chronicles of Narnia (Publication Order) #1, The Chronicles of Narnia (Author's Preferred Order) #2",
    );
    expect(record.audible_original).toBe("false");
  });
});
