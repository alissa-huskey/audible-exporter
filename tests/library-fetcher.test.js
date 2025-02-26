/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

require("../src/dev.js");
require("../src/util.js");
require("../src/element.js");
require("../src/list.js");
require("../src/page.js");
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

    expect(library.pages.length).toBe(2);
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

    expect(library.pages.length).toBe(3);
    expect(library.pages[0].books[0].title).toBe("Scorpion Shards: Star Shards Chronicles Series, Book 1");
    expect(library.pages[1].books[0].title).toBe("Stephen Leeds: Death & Faxes: Legion");
    expect(library.pages[2].books[0].title).toBe("Talon of the Silver Hawk: Conclave of Shadows, Book 1");
  });

});
