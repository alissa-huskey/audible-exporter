/**
 * @jest-environment jsdom
 */

require("../src/dev.js");
require("../src/util.js");
require("../src/timer.js");
require("../src/doc.js");
require("../src/list.js");
require("../src/parser.js");
require("../src/page.js");
require("../src/book-page.js");
require("../src/details-fetcher.js");

describe("DetailsFetcher", () => {
  let library = [
    { url: "http://www.audible.com/pd/B0CQ3759C3" },
    { url: "http://www.audible.com/pd/B0BG96TCVH" },
    { url: "http://www.audible.com/pd/1713569264" },
    { url: "http://www.audible.com/pd/B07C63PS2B" },
    { url: "http://www.audible.com/pd/B0CTNT9XWX" },
  ];

  let fetcher = new DetailsFetcher(library);

  test("new DetailsFetcher", () => {
    expect(fetcher).toBeA("DetailsFetcher");
    expect(fetcher.library).toEqual(library);
  });

  test(".populate", async () => {
    Page.prototype.fetchDoc = mockFetchDoc("book-details.html");

    let library = [{ url: "http://www.audible.com/pd/B009CZNUGU" }];

    let fetcher = new DetailsFetcher(library);
    await fetcher.populate();

    expect(fetcher.pages).toHaveLength(1);
    expect(fetcher.pages[0]).toBeA("ADBLBookPage");
  });

  test(".books", async () => {
    Page.prototype.fetchDoc = mockFetchDoc("book-details.html");

    let library = [{ url: "http://www.audible.com/pd/B009CZNUGU" }];

    let fetcher = new DetailsFetcher(library);
    await fetcher.populate();
    let book = fetcher.books["B009CZNUGU"];

    expect(Object.values(fetcher.pages)[0] == "Midnight Riot");
    expect(book).toBeDefined();
    expect(book.title == "Midnight Riot");
  });
});
