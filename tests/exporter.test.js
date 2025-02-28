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

describe("Exporter", function() {

  test(".getOrders()", async function() {
    let mockFn = mockFetchDocs([fixtureDoc("order-page.html"), fixtureDoc("order-page.html")]);
    Page.prototype.fetchDoc = mockFn;

    let exporter = new Exporter();
    let items = await exporter.getOrders();
    let page = exporter.orders.years[0].pages[0];

    expect(mockFn.mock.calls).toHaveLength(2);
    expect(exporter.orders.count).toBe(44);
  });

  test(".getLibrary()", async function() {
    let docs = ["1", "2"].map((i) => 
      toDoc(getFixtureFile(`library-page-${i}-of-3.html`))
    );

    Page.prototype.fetchDoc = mockFetchDocs(docs);
    let exporter = new Exporter();
    exporter.notifier.create()

    let books = await exporter.getLibrary();

    let titles = books.map((b) => b.title);

    // in a real call, this would fetch pages with 50 per page, but since the
    // pages I downloaded apparently have 20 per page, it only does two requests
    expect(books.length).toBe(40);
    expect(books[0].title).toBe("Scorpion Shards: Star Shards Chronicles Series, Book 1");
  });

  test(".getBookDetails()", async function() {
    let mockFn = mockFetchDocs([
      fixtureDoc("order-page.html"),
      fixtureDoc("order-page.html"),
      fixtureDoc("library-page-1-of-1.html"),
      fixtureDoc("book-details-audible-original.html"),
    ]);
    Page.prototype.fetchDoc = mockFn;

    let exporter = new Exporter();

    await exporter.orders.init();
    await exporter.orders.populate();

    // make sure the order setup worked as expected
    expect(exporter.orders.years).toHaveLength(1);
    expect(exporter.orders.years[0].pages).toHaveLength(1);
    expect(exporter.orders.count).toBe(44);

    await exporter.library.populate();

    // make sure the library setup worked as expected
    expect(exporter.library.page_count).toBe(1);
    expect(exporter.library.books).toHaveLength(1);
    expect(mockFn.mock.calls).toHaveLength(3);

    let results = await exporter.getBookDetails();
    let item = results[0];

    expect(mockFn.mock.calls).toHaveLength(4);
    expect(results).toHaveLength(1);
    expect(item.id).toBe("B0BL84CBLZ");
    expect(item.title).toBe("Ghosts of Zenith");

    let key;
    let keys = [
      "id",               "url",
      "title",            "author",
      "narrator",         "series",
      "duration_minutes", "language",
      "release_date",     "release_timestamp",
      "publisher",        "publisher_summary",
      "audible_oginal",   "book",
      "category_type",    "main_category",
      "sub_category",     "categories",
      "rating",           "num_ratings"
    ];
    for (i in keys) {
      expect(Object.keys(item).includes(keys[i])).toBe(true);
    }
  });
});
