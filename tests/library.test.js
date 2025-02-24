/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

require("../src/dev.js");
require("../src/util.js");
require("../src/element.js");
require("../src/list.js");
require("../src/page.js");
require("../src/library-page-parser.js");
require("../src/library.js");

describe("Library", function() {

  let library = new Library();

  test("Library", function() {
    expect(library.constructor.name).toBe("Library");
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
    let mockFetchDoc = function() {
      return jest.fn().mockImplementation(() =>
        Promise.resolve(new DOMParser().parseFromString(getFixtureFile(`library-page-2.html`), "text/html")),
      );
    };

    Library.prototype.fetchDoc = mockFetchDoc();

    let library = new Library();
    let page = await library.fetchPage(1);

    expect(page.constructor.name).toBe("LibraryPageParser");
    expect(page.page_num).toBe(2);
  });

  test(".populate()", async function() {
    let mockFetchPage = function() {
      return jest.fn().mockImplementation(() =>
        Promise.resolve({page_size: 20, page_count: 2}),
      );
    };

    Library.prototype.fetchPage = mockFetchPage();

    let library = new Library()
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

    let library = new Library()
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

    let library = new Library()
    library.pages = pages;

    expect(library.books).toEqual(books);
  });

  test(".populate() (parsed pages)", async function() {
    let pages = ["1", "2", "3"].map((i) => 
      new LibraryPageParser(toDoc(getFixtureFile(`library-page-${i}-of-3.html`)))
    );

    let mockFetchPage = function() {
      return jest.fn().mockImplementation((i) =>
        Promise.resolve(pages[i-1]),
      );
    };

    Library.prototype.fetchPage = mockFetchPage();

    let library = new Library()
    await library.populate();

    expect(library.pages.length).toBe(3);
    expect(library.pages[0].books[0].title).toBe("Scorpion Shards: Star Shards Chronicles Series, Book 1");
    expect(library.pages[1].books[0].title).toBe("Stephen Leeds: Death & Faxes: Legion");
    expect(library.pages[2].books[0].title).toBe("Talon of the Silver Hawk: Conclave of Shadows, Book 1");
  });

});
