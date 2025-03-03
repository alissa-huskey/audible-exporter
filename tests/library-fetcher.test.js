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
require("../src/library-book-row.js");
require("../src/library-page.js");
require("../src/library-fetcher.js");

describe("LibraryFetcher", function() {

  let library = new LibraryFetcher();

  test("LibraryFetcher", function() {
    expect(library.constructor.name).toBe("LibraryFetcher");
  });

  test(".pages", function() {
    expect(library.pages).toEqual([]);
  });

  test(".book_count", function() {
    library.pages.push({page_size: 20, page_count: 66});

    expect(library.book_count).toBe(1320);
  });

  test(".page_count", function() {
    library.pages.push({page_size: 20, page_count: 66});

    expect(library.page_count).toBe(27);
  });

  test(".fetchPage()", async function() {
    LibraryFetcher.prototype.fetchDoc = mockFetchDoc("library-page-2.html");

    let library = new LibraryFetcher();
    let page = await library.fetchPage(1);

    expect(page.constructor.name).toBe("LibraryPage");
    expect(page.page_num).toBe(2);
  });

  test(".populate()", async function() {
    let mockFetchPage = function() {
      return jest.fn().mockImplementation(() =>
        Promise.resolve({page_size: 20, page_count: 2}),
      );
    };

    LibraryFetcher.prototype.fetchPage = mockFetchPage();

    let library = new LibraryFetcher()
    await library.populate();

    // with two pages at a page size of 20, the page_count for a page_size of 50 is 1
    expect(library.pages.length).toBe(1);
  });

  test(".populate(limit)", async function() {
    let mockFetchPage = function() {
      return jest.fn().mockImplementation(() =>
        Promise.resolve({page_size: 50, page_count: 5}),
      );
    };

    LibraryFetcher.prototype.fetchPage = mockFetchPage();

    let library = new LibraryFetcher()
    await library.populate(1);

    expect(library.pages.length).toBe(1);
  });

  test(".books", async function() {
    let pages = [
      {
        books: [
          {url: "a", title: "a"},
          {url: "b", title: "b"},
          {url: "c", title: "c"},
        ]
      },
      {
        books: [
          {url: "d", title: "d"},
          {url: "e", title: "e"},
          {url: "f", title: "f"},
        ]
      },
    ];
    let books = [
      {url: "a", title: "a"},
      {url: "b", title: "b"},
      {url: "c", title: "c"},
      {url: "d", title: "d"},
      {url: "e", title: "e"},
      {url: "f", title: "f"},
    ];

    let library = new LibraryFetcher()
    library.pages = pages;

    expect(library.books).toEqual(books);
  });

  test(".books (duplicates)", async function() {
    let pages = [
      {
        books: [
          {url: "a", title: "a"},
          {url: "b", title: "b"},
          {url: "c", title: "c"},
        ]
      },
      {
        books: [
          {url: "c", title: "c"},
          {url: "d", title: "d"},
          {url: "e", title: "e"},
        ]
      },
    ];

    let books = [
      {url: "a", title: "a"},
      {url: "b", title: "b"},
      {url: "c", title: "c"},
      {url: "d", title: "d"},
      {url: "e", title: "e"},
    ];

    let library = new LibraryFetcher()
    library.pages = pages;

    expect(library.books).toEqual(books);
  });

  test(".populate() (parsed pages)", async function() {
    let pages = ["1", "2", "3"].map((i) => 
      new LibraryPage(toDoc(getFixtureFile(`library-page-${i}-of-3.html`)))
    );

    let mockFetchPage = function() {
      return jest.fn().mockImplementation((i) =>
        Promise.resolve(pages[i-1]),
      );
    };

    LibraryFetcher.prototype.fetchPage = mockFetchPage();

    let library = new LibraryFetcher()
    await library.populate();

    // with 3 pages at a page size of 20, the page_count for a page_size of 50 is 2
    // (in reality this would fetch pages that have a page size of 50, but
    // apparently the pages I downloaded have 20 per page)
    expect(library.pages.length).toBe(2);
    expect(library.pages[0].books[0].title).toBe("Scorpion Shards: Star Shards Chronicles Series, Book 1");
    expect(library.pages[1].books[0].title).toBe("Stephen Leeds: Death & Faxes: Legion");
  });

});
