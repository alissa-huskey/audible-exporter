/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

require("../src/dev.js");
require("../src/util.js");
require("../src/element.js");
require("../src/list.js");
require("../src/page.js");
require("../src/book-page.js");
require("../src/details-fetcher.js");

describe("DetailsFetcher", function() {

  let library = [
      { "url": "http://www.audible.com/pd/B0CQ3759C3" },
      { "url": "http://www.audible.com/pd/B0BG96TCVH" },
      { "url": "http://www.audible.com/pd/1713569264" },
      { "url": "http://www.audible.com/pd/B07C63PS2B" },
      { "url": "http://www.audible.com/pd/B0CTNT9XWX" },
  ];

  let fetcher = new DetailsFetcher(library);

  test("new DetailsFetcher", function() {
    expect(fetcher.constructor.name).toBe("DetailsFetcher");
    expect(fetcher.library).toEqual(library);
  });

  test(".populate", async function() {
    Page.prototype.fetchDoc = mockFetchDoc("book-details.html")

    let library = [{url: "http://www.audible.com/pd/B009CZNUGU"}]

    let fetcher = new DetailsFetcher(library);
    await fetcher.populate();

    expect(fetcher.pages).toHaveLength(1);
    expect(fetcher.pages[0].constructor.name).toBe("ADBLBookPage");
  })

  test(".books", async function() {
    Page.prototype.fetchDoc = mockFetchDoc("book-details.html")

    let library = [{url: "http://www.audible.com/pd/B009CZNUGU"}]

    let fetcher = new DetailsFetcher(library);
    await fetcher.populate();
    let book = fetcher.books["B009CZNUGU"];

    expect(Object.values(fetcher.pages)[0] == "Midnight Riot");
    expect(book).toBeDefined();
    expect(book.title == "Midnight Riot");
  })

});
