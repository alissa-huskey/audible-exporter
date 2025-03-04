/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

require("../src/dev.js");
require("../src/util.js");
require("../src/element.js");
require("../src/list.js");
require("../src/page.js");
require("../src/order-page.js");
require("../src/orders-fetcher.js");

describe("OrdersFetcher", function() {

  let base_url = new OrderPage().base_url;

  test("new OrdersFetcher()", function() {
    orders = new OrdersFetcher();
    expect(orders.constructor.name).toBe("OrdersFetcher");
  });


  test(".init()", async function() {
    Page.prototype.fetchDoc = mockFetchDoc("order-page.html");

    let years = [...Array(16).keys()].sort((a, b) => b - a).map(
      (i) => ({year: (i + 2010), page_count: null, pages: []})
    );

    orders = new OrdersFetcher();
    await orders.init();

    expect(Page.prototype.fetchDoc).toHaveBeenCalledWith(`${base_url}&df=last_90_days&pn=1&ps=20`)
    expect(orders.years).toEqual(years);
  });

  test(".populate()", async function() {
    let runs = [
      [2025, 1, 1],
      [2024, 1, 2],
      [2024, 2, 2],
      [2023, 1, 3],
      [2023, 2, 3],
      [2023, 3, 3],
    ];

    let docs = runs.map(([year, page, of]) => fixtureDoc(`order-page-${year}-${page}-of-${of}.html`));
    let urls = runs.map(([year, page, of]) => [`${base_url}&df=${year}&pn=${page}&ps=40`]);

    Page.prototype.fetchDoc = mockFetchDocs(docs);

    let years = [
      {year: 2025, page_count: null, pages: []},
      {year: 2024, page_count: null, pages: []},
      {year: 2023, page_count: null, pages: []},
    ];

    orders = new OrdersFetcher();
    orders.years = years;
    await orders.populate();

    expect(Page.prototype.fetchDoc.mock.calls).toEqual(urls);

    let [year_2025, year_2024, year_2023] = orders.years;

    expect(year_2025.page_count).toBe(1);
    expect(year_2025.pages.length).toBe(1);
    expect(year_2025.pages[0].items.length).toBe(1);
    expect(year_2025.pages[0].items[0].title).toBe("Wind and Truth");

    expect(year_2024.page_count).toBe(2);
    expect(year_2024.pages.length).toBe(2);
    expect(year_2024.pages[0].items.length).toBe(70);
    expect(year_2024.pages[0].items[0].title).toBe("Demons of Good and Evil");

    expect(year_2023.page_count).toBe(3);
    expect(year_2023.pages.length).toBe(3);
    expect(year_2023.pages[0].items.length).toBe(33);
    expect(year_2023.pages[0].items[0].title).toBe("Pile of Bones");
  });

  test(".items", function() {
    let years = [
      {year: 2025, page_count: 1, pages: [{items:[
        { "url": "http://www.audible.com/pd/B0CQ3759C3", "title": "Wind and Truth", "author": "Brandon Sanderson", "purchase_date": "01-21-2025" },
        { "url": "http://www.audible.com/pd/B0BG96TCVH", "title": "Demons of Good and Evil", "author": "Kim Harrison", "purchase_date": "12-03-2024" },
        { "url": "http://www.audible.com/pd/1713569264", "title": "The Queen", "author": "Jennifer L. Armentrout", "purchase_date": "12-03-2024" },
      ]}]},
      {year: 2024, page_count: 1, pages: [{items:[
        { "url": "http://www.audible.com/pd/1250819148", "title": "The Lives of Saints", "author": "Leigh Bardugo", "purchase_date": "12-03-2024" },
        { "url": "http://www.audible.com/pd/B01AMIGU3K", "title": "Patterns in the Dark", "author": "Lindsay Buroker", "purchase_date": "12-03-2024" },
        { "url": "http://www.audible.com/pd/B071NQ26W4", "title": "Soulblade", "author": "Lindsay Buroker", "purchase_date": "12-03-2024" },
      ]}]},
    ];

    orders = new OrdersFetcher();
    orders.years = years;

    expect(orders.items.length).toBe(6);
  });

});
