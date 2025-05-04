require("../../src/etl/library-page.js");

describe("LibraryPage", () => {
  let html = getFixtureFile("library-page-1-of-3.html");
  let doc = toDoc(html);
  let page = new LibraryPage(doc);

  test(".doc", () => {
    let page = new LibraryPage("<html></html>");
    expect(page.doc).toBeA(Doc);
  });

  test(".rows", () => {
    expect(page.rows).toBeA(Array);
    expect(page.rows.length).toBe(20);
    expect(page.rows[0]).toBeA(LibraryBookRow);
  });

  test(".books", () => {
    let book = {
      asin: "1705240569",
      url: "/pd/Scorpion-Shards-Audiobook/1705240569",
      title: "Scorpion Shards: Star Shards Chronicles Series, Book 1",
      authors: [
        {
          name: "Neal Shusterman",
          id: "B000APTN0I",
          url: "/author/B000APTN0I",
        },
      ],
      narrators: ["Joe Hempel"],
      is_fav: false,
      series: [
        {
          id: "B08CVC76VZ",
          name: "Star Shards Chronicles",
          number: "1",
          url: "/series/Star-Shards-Chronicles-Audiobook/B08CVC76VZ",
        },
      ],
    };

    expect(page.books.length).toBe(20);
    expect(page.books[0]).toEqual(book);
  });

  test(".books (last page)", () => {
    let html = getFixtureFile("library-page-last.html");
    let doc = toDoc(html);
    let page = new LibraryPage(doc);

    expect(page.books.some((book) => book.title == "Your First Listen")).toBe(
      false,
    );
  });

  test(".page_size (default)", () => {
    expect(page.page_size).toBe(20);
  });

  test(".page_num", () => {
    let html = getFixtureFile("library-page-2.html");
    let doc = toDoc(html);
    let page = new LibraryPage(doc);
    expect(page.page_num).toBe(2);
  });

  test(".page_size (selected)", () => {
    let page = new LibraryPage(fixtureDoc("library-page-1-of-3.html"));
    expect(page.page_size).toBe(20);
  });

  test(".page_count", () => {
    expect(page.page_count).toBe(3);
  });

  test(".books errors", () => {
    let page = new LibraryPage();
    let spy = jest.spyOn(global.console, "error");
    global.console.errors = spy.mockImplementation(() => {});

    page.books;

    expect(spy.mock.calls).toHaveLength(1);
  });
});
