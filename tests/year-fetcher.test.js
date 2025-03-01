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
require("../src/order-page.js");
require("../src/year-fetcher.js");

describe("YearFetcher", function() {

  test("new YearFetcher()", function() {
    fetcher = new YearFetcher();
    expect(fetcher.constructor.name).toBe("YearFetcher");
    fetcher = new YearFetcher(2024);
    expect(fetcher.year).toBe(2024);
  });

  test(".populate()", async function() {
    let pages = [1, 2];
    let base_url = new OrderPage().base_url;

    let docs = pages.map((page) => fixtureDoc(`order-page-2024-${page}-of-2.html`));
    let urls = pages.map((page) => [`${base_url}&df=2024&pn=${page}&ps=40`]);

    Page.prototype.fetchDoc = mockFetchDocs(docs);

    let year = new YearFetcher(2024);
    await year.populate();

    expect(Page.prototype.fetchDoc.mock.calls).toEqual(urls);

    expect(year.page_count).toBe(2);
    expect(year.pages).toHaveLength(2);
    expect(year.pages[0].items.length).toBe(70);
    expect(year.pages[0].items[0].title).toBe("Demons of Good and Evil");
  });

  test(".items()", async function() {
    let pages = [1, 2];
    let base_url = new OrderPage().base_url;

    let docs = pages.map((page) => fixtureDoc(`order-page-2024-${page}-of-2.html`));
    let urls = pages.map((page) => [`${base_url}&df=2024&pn=${page}&ps=40`]);

    Page.prototype.fetchDoc = mockFetchDocs(docs);

    let year = new YearFetcher(2024);
    await year.populate();

    expect(Page.prototype.fetchDoc.mock.calls).toEqual(urls);

    expect(year.items).toHaveLength(105);
    expect(year.items[0].title).toBe("Demons of Good and Evil");
  });

});
