/**
 * @jest-environment jsdom
 */

const glob = require("glob").sync;

require("../src/dev.js");
require("../src/util.js");
require("../src/element.js");
require("../src/list.js");
require("../src/timer.js");
require("../src/parser.js");
require("../src/page.js");
require("../src/purchase.js");
require("../src/order-row.js");
require("../src/order-page.js");
require("../src/orders-fetcher.js");

describe("OrdersFetcher", () => {
  let base_url = new OrderPage().base_url;

  test("new OrdersFetcher()", () => {
    orders = new OrdersFetcher();
    expect(orders).toBeA(OrdersFetcher);
  });

  test(".init()", async () => {
    let files = await glob("tests/fixtures/order-page-*-1-of-*.html");
    let pat = /^.*\//;
    let filenames = [
      "order-page-2025-1-of-1.html",
      ...files.map((f) => f.replace(pat, "")).reverse(),
    ];
    let mockFn = mockFetchFixtureDocs(filenames);

    Page.prototype.fetchDoc = mockFn;

    orders = new OrdersFetcher();
    await orders.init();

    expect(mockFn.mock.calls).toHaveLength(4);

    expect(orders.pages.length).toEqual(6);
    expect(orders.pages[0]).toBeA(OrderPage);
    expect(orders.pages[0].year).toBe(2025);
    expect(orders.pages[0].page_num).toBe(1);
    expect(orders.pages[0].page_count).toBe(1);

    expect(orders.pages[1].year).toBe(2024);
    expect(orders.pages[1].page_num).toBe(1);
    expect(orders.pages[1].page_count).toBe(2);

    expect(orders.pages[2].year).toBe(2024);
    expect(orders.pages[2].page_num).toBe(2);
    expect(orders.pages[2].doc).toBeNull();
  });

  test(".init(limit)", async () => {
    let filenames = [
      "order-page-2025-1-of-1.html",
      "order-page-2025-1-of-1.html",
    ];
    let mockFn = mockFetchFixtureDocs(filenames);

    Page.prototype.fetchDoc = mockFn;

    orders = new OrdersFetcher();
    await orders.init(1);

    expect(mockFn.mock.calls).toHaveLength(2);
    expect(orders.pages).toHaveLength(1);
  });

  test(".populate()", async () => {
    let files = await glob("tests/fixtures/order-page-*-1-of-*.html");
    let pat = /^.*\//;
    let docs = [
      fixtureDoc("order-page-2025-1-of-1.html"),
      ...files.map((f) => fixtureDoc(f.replace(pat, ""))).reverse(),
    ];

    let runs = [
      [2024, 2],
      [2023, 2],
      [2023, 3],
    ];
    let urls = runs.map(([year, page]) => [
      `${base_url}&df=${year}&pn=${page}&ps=40`,
    ]);

    Page.prototype.fetchDoc = mockFetchDocs(docs);

    orders = new OrdersFetcher();
    orders.pages = [
      new OrderPage(fixtureDoc("order-page-2025-1-of-1.html")),
      new OrderPage(fixtureDoc("order-page-2024-1-of-2.html")),
      new OrderPage(2024, 2),
      new OrderPage(fixtureDoc("order-page-2023-1-of-3.html")),
      new OrderPage(2023, 2),
      new OrderPage(2023, 3),
    ];

    await orders.populate();

    expect(Page.prototype.fetchDoc.mock.calls).toEqual(urls);
  });

  test(".populate(limit)", async () => {
    let doc = fixtureDoc("order-page-2025-1-of-1.html");
    let mockFn = mockFetchDocs([doc]);
    Page.prototype.fetchDoc = mockFn;

    orders = new OrdersFetcher();
    orders.pages = [
      new OrderPage(doc),
      new OrderPage(2024, 1),
      new OrderPage(2024, 2),
    ];
    await orders.populate(1);

    expect(mockFn.mock.calls).toHaveLength(0);
    expect(orders.pages).toHaveLength(1);
  });

  test(".items", () => {
    // prettier-ignore
    let pages = [
      {
        items: [
          { id: "B0CQ3759C3", url: "http://www.audible.com/pd/B0CQ3759C3", title: "Wind and Truth", author: "Brandon Sanderson", purchase_date: "01-21-2025" },
          { id: "B0BG96TCVH", url: "http://www.audible.com/pd/B0BG96TCVH", title: "Demons of Good and Evil", author: "Kim Harrison", purchase_date: "12-03-2024" },
          { id: "1713569264", url: "http://www.audible.com/pd/1713569264", title: "The Queen", author: "Jennifer L. Armentrout", purchase_date: "12-03-2024" },
        ],
      },
      {
        items: [
          { id: "1250819148", url: "http://www.audible.com/pd/1250819148", title: "The Lives of Saints", author: "Leigh Bardugo", purchase_date: "12-03-2024" },
          { id: "B01AMIGU3K", url: "http://www.audible.com/pd/B01AMIGU3K", title: "Patterns in the Dark", author: "Lindsay Buroker", purchase_date: "12-03-2024" },
          { id: "B071NQ26W4", url: "http://www.audible.com/pd/B071NQ26W4", title: "Soulblade", author: "Lindsay Buroker", purchase_date: "12-03-2024" },
        ],
      },
    ];

    orders = new OrdersFetcher();
    orders.pages = pages;

    expect(orders.count).toBe(6);
    expect(orders.items["B0CQ3759C3"]).toEqual(pages[0].items[0]);
  });
});
