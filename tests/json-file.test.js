/**
 * @jest-environment jsdom
 */

require("../src/dev.js");
require("../src/json-file.js");

describe("JSONFile", () => {
  test("new JSONFile()", () => {
    let file = new JSONFile();
    expect(file).toBeA(JSONFile);

    let records = [{ a: 1 }];
    file = new JSONFile(records);
    expect(file.records).toEqual(records);
  });

  test(".filename", () => {
    let file = new JSONFile();
    expect(file.filename).toMatch(/^audible_\d+\.json$/);
  });

  test(".contents", () => {
    let records = [{ a: 1, b: 2, c: 3 }];
    let file = new JSONFile(records);
    expect(file.contents).toEqual('[{"a":1,"b":2,"c":3}]');
  });

  test(".blob", () => {
    let records = [{ a: 1, b: 2, c: 3 }];
    let file = new JSONFile(records);
    let blob = file.blob;
    expect(blob).toBeA(Blob);
    expect(blob.type).toBe("text/json");
  });

  test(".url", () => {
    let file = new JSONFile([{ a: 1, b: 2, c: 3 }]);
    expect(file.url).toMatch(/^blob:/);
  });
});
