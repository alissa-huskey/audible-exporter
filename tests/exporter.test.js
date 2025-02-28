/**
 * @jest-environment jsdom
 */

const $ = require("jquery");
const fs = require("fs")
const path = require("path");

require("../src/dev.js");
require("../src/util.js");
require("../src/element.js");
require("../src/list.js");
require("../src/page.js");
require("../src/book-page.js");
require("../src/page.js");
require("../src/library-page.js");
require("../src/library-fetcher.js");
require("../src/details-fetcher.js");
require("../src/order-page.js");
require("../src/orders-fetcher.js");
require("../src/dom.js");
require("../src/modal.js");
require("../src/status-notifier.js");
require("../src/exporter.js");

describe("exporter: parsing functions", function() {

  test("getLibrary", async function() {
    let docs = ["1", "2", "3"].map((i) => 
      toDoc(getFixtureFile(`library-page-${i}-of-3.html`))
    );

    LibraryFetcher.prototype.fetchDoc = mockFetchDocs(docs);
    let exporter = new Exporter();
    exporter.notifier.create()

    let books = await exporter.getLibrary();

    let titles = books.map((b) => b.title);
    expect(books.length).toBe(60);

    expect(books[0].title).toBe("Scorpion Shards: Star Shards Chronicles Series, Book 1");
    expect(books[59].title).toBe("Skysworn");
  });

  // this more or less just checks for syntax errors
  test("getBookDetails", async function() {
    let exporter = new Exporter();
    let results = await exporter.getBookDetails([], []);
  });
});
