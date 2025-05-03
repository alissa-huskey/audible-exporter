require("../../src/etl/library-fetcher.js");

describe("LibraryFetcher", () => {
  let library = new LibraryFetcher();

  test("LibraryFetcher", () => {
    expect(library).toBeA(LibraryFetcher);
  });

  test(".pages", () => {
    expect(library.pages).toEqual([]);
  });

  test(".book_count", () => {
    library.pages.push({ page_size: 20, page_count: 66 });

    expect(library.book_count).toBe(1320);
  });

  test(".page_count", () => {
    library.pages.push({ page_size: 20, page_count: 66 });

    expect(library.page_count).toBe(27);
  });

  test(".books", async () => {
    let pages = [
      {
        books: [
          { url: "a", title: "a" },
          { url: "b", title: "b" },
          { url: "c", title: "c" },
        ],
      },
      {
        books: [
          { url: "d", title: "d" },
          { url: "e", title: "e" },
          { url: "f", title: "f" },
        ],
      },
    ];
    let books = [
      { url: "a", title: "a" },
      { url: "b", title: "b" },
      { url: "c", title: "c" },
      { url: "d", title: "d" },
      { url: "e", title: "e" },
      { url: "f", title: "f" },
    ];

    let library = new LibraryFetcher();
    library.pages = pages;

    expect(library.books).toEqual(books);
  });

  test(".books (duplicates)", async () => {
    let pages = [
      {
        books: [
          { url: "a", title: "a" },
          { url: "b", title: "b" },
          { url: "c", title: "c" },
        ],
      },
      {
        books: [
          { url: "c", title: "c" },
          { url: "d", title: "d" },
          { url: "e", title: "e" },
        ],
      },
    ];

    let books = [
      { url: "a", title: "a" },
      { url: "b", title: "b" },
      { url: "c", title: "c" },
      { url: "d", title: "d" },
      { url: "e", title: "e" },
    ];

    let library = new LibraryFetcher();
    library.pages = pages;

    expect(library.books).toEqual(books);
  });

  test(".fetchPage()", async () => {
    Page.prototype.fetchDoc = mockFetchDoc("library-page-2.html");

    let library = new LibraryFetcher();
    let page = await library.fetchPage(1);

    expect(page).toBeA(LibraryPage);
    expect(page.page_num).toBe(2);
  });

  test(".populate()", async () => {
    let docs = ["1", "2", "3"].map((i) =>
      fixtureDoc(`library-page-${i}-of-3.html`),
    );

    let mockFn = mockFetchDocs(docs);
    Page.prototype.fetchDoc = mockFn;

    let library = new LibraryFetcher();
    await library.populate();

    // with 3 pages at a page size of 20, the page_count for a page_size of 50 is 2
    // (in reality this would fetch pages that have a page size of 50, but
    // apparently the pages I downloaded have 20 per page)
    expect(library.pages).toHaveLength(2);
    expect(library.pages[0].books[0].title).toBe(
      "Scorpion Shards: Star Shards Chronicles Series, Book 1",
    );
    expect(library.pages[1].books[0].title).toBe(
      "Stephen Leeds: Death & Faxes: Legion",
    );
  });

  test(".populate(limit)", async () => {
    let mockFn = mockFetchDoc("library-page-1-of-3.html");
    Page.prototype.fetchDoc = mockFn;

    let library = new LibraryFetcher();
    await library.populate(1);

    expect(mockFn.mock.calls).toHaveLength(1);
    expect(library.pages.length).toBe(1);
  });
});
