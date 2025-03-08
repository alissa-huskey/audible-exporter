/**
 * @jest-environment jsdom
 */

require("../src/dev.js");
require("../src/util.js");
require("../src/element.js");
require("../src/list.js");
require("../src/parser.js");
require("../src/library-book-row.js");

describe("LibraryBookRow", () => {
  let doc = fixtureElement(
    "library-book-row.html",
    ".adbl-library-content-row:first-child",
  );
  let row = new LibraryBookRow(doc);

  test("new LibraryBookRow()", () => {
    let row = new LibraryBookRow();
    expect(row).toBeA(LibraryBookRow);
  });

  test("new LibraryBookRow(doc)", () => {
    expect(row.doc).toBeA(Element);
  });

  test("new LibraryBookRow(doc, page, row)", () => {
    let row = new LibraryBookRow(doc, 1, 5);
    expect(row.doc).toBeA(Element);
    expect(row.page_num).toBe(1);
    expect(row.row_num).toBe(5);
  });

  test(".id", () => {
    expect(row.id).toBe("1705240569");
  });

  test("ul", () => {
    expect(row.ul).toBeA(Element);
    expect(row.ul.element).toBeA(HTMLUListElement);
  });

  test("url", () => {
    expect(row.url).toBe("/pd/Scorpion-Shards-Audiobook/1705240569");
  });

  test("title", () => {
    expect(row.title).toBe(
      "Scorpion Shards: Star Shards Chronicles Series, Book 1",
    );
  });

  test("author", () => {
    expect(row.author).toBe("Neal Shusterman");
  });

  test("narrator", () => {
    expect(row.narrator).toBe("Joe Hempel");
  });

  test("series", () => {
    expect(row.series).toBe("Star Shards Chronicles");
  });

  test(".data()", () => {
    let data = {
      id: "1705240569",
      url: "/pd/Scorpion-Shards-Audiobook/1705240569",
      title: "Scorpion Shards: Star Shards Chronicles Series, Book 1",
      author: "Neal Shusterman",
      narrator: "Joe Hempel",
      series: "Star Shards Chronicles",
    };

    expect(row.data()).toEqual(data);
  });

  test(".data() errors", () => {
    let spy = jest.spyOn(global.console, "error");
    global.console.errors = spy.mockImplementation(() => {});

    let row = new LibraryBookRow(null, 2, 8);

    row.data();

    expect(spy.mock.calls).toHaveLength(6);
  });
});
