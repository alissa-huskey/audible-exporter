/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

require("../src/dev.js");
require("../src/util.js");
require("../src/element.js");
require("../src/list.js");
require("../src/parser.js");
require("../src/page.js");
require("../src/library-book-row.js");
require("../src/library-page.js");
require("../src/exporter.js");

describe("LibraryPage", function() {

  let html = getFixtureFile("library-page-1-of-3.html");
  let doc = toDoc(html);
  let page = new LibraryPage(doc);

  test(".doc", function() {
    let page = new LibraryPage("<html></html>");
    expect(page.doc.constructor.name).toBe("Element");
  });

  test(".rows", function() {
    expect(page.rows.constructor.name).toBe("Array");
    expect(page.rows.length).toBe(20);
    expect(page.rows[0].constructor.name).toBe("LibraryBookRow");
  });

  test(".books", function() {
    let book = {
      id: "1705240569",
      url: "/pd/Scorpion-Shards-Audiobook/1705240569",
      title: "Scorpion Shards: Star Shards Chronicles Series, Book 1",
      author: "Neal Shusterman",
      narrator: "Joe Hempel",
      series: "Star Shards Chronicles",
    }

    expect(page.books.length).toBe(20);
    expect(page.books[0]).toEqual(book);
  });

  test(".books (last page)", function() {
    let html = getFixtureFile("library-page-last.html");
    let doc = toDoc(html);
    let page = new LibraryPage(doc);

    expect(page.books.some((book) => book.title == "Your First Listen")).toBe(false);
  });

  test(".page_size (default)", function() {
    expect(page.page_size).toBe(20);
  });

  test(".page_num", function() {
    let html = getFixtureFile("library-page-2.html");
    let doc = toDoc(html);
    let page = new LibraryPage(doc);
    expect(page.page_num).toBe(2);
  });

  test(".page_size (selected)", function() {
    let page = new LibraryPage(fixtureDoc("library-page-1-of-3.html"));
    expect(page.page_size).toBe(20);
  });

  test(".page_count", function() {
    expect(page.page_count).toBe(3);
  });

  test(".books errors", function() {
    let page = new LibraryPage();
    let spy = jest.spyOn(global.console, "error")
    global.console.errors = spy.mockImplementation(() => {});;

    page.books;

    expect(spy.mock.calls).toHaveLength(1);
  });

});
