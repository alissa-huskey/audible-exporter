/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

require("../src/dev.js");
require("../src/util.js");
require("../src/element.js");
require("../src/list.js");
require("../src/library-page-parser.js");
require("../src/exporter.js");

describe("LibraryPageParser", function() {

  let html = getFixtureFile("library-page-1.html");
  let doc = toDoc(html);
  let page = new LibraryPageParser(doc);

  test(".doc", function() {
    let page = new LibraryPageParser("<html></html>");
    expect(page.doc.constructor.name).toBe("Element");
  });

  test(".rows", function() {
    expect(page.rows.constructor.name).toBe("List");
    expect(page.rows.length).toBe(20);
  });

  test(".books", function() {
    let book = {
      url: "/pd/Scorpion-Shards-Audiobook/1705240569",
      title: "Scorpion Shards: Star Shards Chronicles Series, Book 1",
      author: "Neal Shusterman",
      narrator: "Joe Hempel",
      series: "Star Shards Chronicles",
    }

    expect(page.books.length).toBe(20);
    expect(page.books[0]).toEqual(book);
  });

});
