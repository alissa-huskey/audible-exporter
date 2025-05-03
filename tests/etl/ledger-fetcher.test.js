const glob = require("glob").sync;

require("../../src/etl/ledger-fetcher.js");

describe("LedgerFetcher", () => {
  let base_url = new LedgerPage().base_url;

  test("new LedgerFetcher()", () => {
    let ledger = new LedgerFetcher();
    expect(ledger).toBeA(LedgerFetcher);
  });

  test(".init()", async () => {
    let files = await glob("tests/fixtures/ledger-page-*-1-of-*.html");
    let pat = /^.*\//;
    let filenames = [
      "ledger-page-2025-1-of-1.html",
      ...files.map((f) => f.replace(pat, "")).reverse(),
    ];
    let mockFn = mockFetchFixtureDocs(filenames);

    Page.prototype.fetchDoc = mockFn;

    let ledger = new LedgerFetcher();
    await ledger.init();

    expect(mockFn.mock.calls).toHaveLength(4);

    expect(ledger.pages.length).toEqual(6);
    expect(ledger.pages[0]).toBeA(LedgerPage);
    expect(ledger.pages[0].year).toBe(2025);
    expect(ledger.pages[0].page_num).toBe(1);
    expect(ledger.pages[0].page_count).toBe(1);

    expect(ledger.pages[1].year).toBe(2024);
    expect(ledger.pages[1].page_num).toBe(1);
    expect(ledger.pages[1].page_count).toBe(2);

    expect(ledger.pages[2].year).toBe(2024);
    expect(ledger.pages[2].page_num).toBe(2);
    expect(ledger.pages[2].doc).toBeNull();
  });

  test(".init(limit)", async () => {
    let filenames = [
      "ledger-page-2025-1-of-1.html",
      "ledger-page-2025-1-of-1.html",
    ];
    let mockFn = mockFetchFixtureDocs(filenames);

    Page.prototype.fetchDoc = mockFn;

    let ledger = new LedgerFetcher();
    await ledger.init(1);

    expect(mockFn.mock.calls).toHaveLength(2);
    expect(ledger.pages).toHaveLength(1);
  });

  test(".populate()", async () => {
    let files = await glob("tests/fixtures/ledger-page-*-1-of-*.html");
    let pat = /^.*\//;
    let docs = [
      fixtureDoc("ledger-page-2025-1-of-1.html"),
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

    let ledger = new LedgerFetcher();
    ledger.pages = [
      new LedgerPage(fixtureDoc("ledger-page-2025-1-of-1.html")),
      new LedgerPage(fixtureDoc("ledger-page-2024-1-of-2.html")),
      new LedgerPage(2024, 2),
      new LedgerPage(fixtureDoc("ledger-page-2023-1-of-3.html")),
      new LedgerPage(2023, 2),
      new LedgerPage(2023, 3),
    ];

    await ledger.populate();

    expect(Page.prototype.fetchDoc.mock.calls).toEqual(urls);
  });

  test(".populate(limit)", async () => {
    let doc = fixtureDoc("ledger-page-2025-1-of-1.html");
    let mockFn = mockFetchDocs([doc]);
    Page.prototype.fetchDoc = mockFn;

    let ledger = new LedgerFetcher();
    ledger.pages = [
      new LedgerPage(doc),
      new LedgerPage(2024, 1),
      new LedgerPage(2024, 2),
    ];
    await ledger.populate(1);

    expect(mockFn.mock.calls).toHaveLength(0);
    expect(ledger.pages).toHaveLength(1);
  });

  test(".entries", () => {
    // prettier-ignore
    let pages = [
      {
        entries: [
          { asin: "B0CQ3759C3", url: "http://www.audible.com/pd/B0CQ3759C3", title: "Wind and Truth", author: "Brandon Sanderson", purchased: "01-21-2025" },
          { asin: "B0BG96TCVH", url: "http://www.audible.com/pd/B0BG96TCVH", title: "Demons of Good and Evil", author: "Kim Harrison", purchased: "12-03-2024" },
          { asin: "1713569264", url: "http://www.audible.com/pd/1713569264", title: "The Queen", author: "Jennifer L. Armentrout", purchased: "12-03-2024" },
        ],
      },
      {
        entries: [
          { asin: "1250819148", url: "http://www.audible.com/pd/1250819148", title: "The Lives of Saints", author: "Leigh Bardugo", purchased: "12-03-2024" },
          { asin: "B01AMIGU3K", url: "http://www.audible.com/pd/B01AMIGU3K", title: "Patterns in the Dark", author: "Lindsay Buroker", purchased: "12-03-2024" },
          { asin: "B071NQ26W4", url: "http://www.audible.com/pd/B071NQ26W4", title: "Soulblade", author: "Lindsay Buroker", purchased: "12-03-2024" },
        ],
      },
    ];

    let ledger = new LedgerFetcher();
    ledger.pages = pages;

    expect(ledger.count).toBe(6);
    expect(ledger.entries["B0CQ3759C3"]).toEqual(pages[0].entries[0]);
  });
});
