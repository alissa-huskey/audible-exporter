/**
 * @jest-environment jsdom
 */

require("../src/dev.js");
require("../src/util.js");
require("../src/file.js");
require("../src/tsv-file.js");


describe("TSVFile", function() {
  test("new TSVFile()", function() {
    let file = new TSVFile();
    expect(file).toBeA(TSVFile);

    let records = [{a: 1}]
    file = new TSVFile(records);
    expect(file.records).toEqual(records);
  });

  test(".filename", function() {
    let file = new TSVFile();
    expect(file.filename).toMatch(/^audible_\d+\.tsv$/);
  })

  test(".headers", function() {
    let records = [{a: 1, b: 2, c: 3}]
    let file = new TSVFile(records);
    expect(file.headers).toEqual(["a", "b", "c"]);
  })

  test(".rows", function() {
    let records = [{a: 1, b: 2, c: 3}]
    let file = new TSVFile(records);
    expect(file.rows).toEqual([["1", "2", "3"]]);
  })

  test(".sanitize()", function() {
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
  });

  test(".contents", function() {
    let records = [{a: 1, b: 2, c: 3}]
    let file = new TSVFile(records);
    expect(file.contents).toEqual("a\tb\tc\n1\t2\t3\n");
  })

  test(".blob", function() {
    let records = [{a: 1, b: 2, c: 3}]
    let file = new TSVFile(records);
    let blob = file.blob;
    expect(blob).toBeA(Blob);
    expect(blob.type).toBe("text/tsv");
  })

  test(".url", function() {
    let file = new TSVFile([{a: 1, b: 2, c: 3}]);
    expect(file.url).toMatch(/^blob:/);
  })
});
