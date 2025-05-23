require("../../src/etl/library-book-row.js");

let fixtures = [
  "library-book-row-fav-finished-pdf.html",
  "library-book-row-multiple-authors.html",
  "library-book-row-no-series.html",
  "library-book-row.html",
];
let docs = Object.fromEntries(
  fixtures.map((f) => [f, fixtureElement(f, ".adbl-library-content-row:first-child")]),
);

describe("LibraryBookRow", () => {
  let row = new LibraryBookRow(docs["library-book-row.html"]);

  test("new LibraryBookRow()", () => {
    let row = new LibraryBookRow();
    expect(row).toBeA(LibraryBookRow);
  });

  test("new LibraryBookRow(doc)", () => {
    expect(row.doc).toBeA(Doc);
  });

  test("new LibraryBookRow(doc, page, row)", () => {
    let row = new LibraryBookRow(docs["library-book-row.html"], 1, 5);
    expect(row.doc).toBeA(Doc);
    expect(row.page_num).toBe(1);
    expect(row.row_num).toBe(5);
  });

  test(".asin", () => {
    expect(row.asin).toBe("1705240569");
  });

  test("ul", () => {
    expect(row.ul).toBeA(Doc);
    expect(row.ul.element).toBeA(HTMLUListElement);
  });

  test("url", () => {
    expect(row.url).toBe("/pd/Scorpion-Shards-Audiobook/1705240569");
  });

  test("title", () => {
    expect(row.title).toBe(
      "Scorpion Shards: Star Shards Chronicles Series, Book 1",
    );
  });

  test("authors (multiple)", () => {
    let row = new LibraryBookRow(docs["library-book-row-multiple-authors.html"]);

    let authors = [
      {
        name: "Brandon Sanderson",
        id: "B001IGFHW6",
        url: "/author/B001IGFHW6",
      },
      { name: "Max Epstein" },
      { name: "David Pace" },
      { name: "Michael Harkins" },
    ];

    expect(row.authors).toEqual(authors);
  });

  test("authors (single)", () => {
    let author = [
      {
        name: "Neal Shusterman",
        id: "B000APTN0I",
        url: "/author/B000APTN0I",
      },
    ];
    expect(row.authors).toEqual(author);
  });

  test("narrators", () => {
    expect(row.narrators).toEqual(["Joe Hempel"]);
  });

  test.each([
    {
      fixture: "library-book-row.html",
      is_fav: false,
    },
    {
      fixture: "library-book-row-fav-finished-pdf.html",
      is_fav: true,
    },
  ])(".is_fav", ({ fixture, is_fav }) => {
    let row = new LibraryBookRow(docs[fixture]);
    expect(row.is_fav).toBe(is_fav);
  });

  test.each([
    {
      fixture: "library-book-row.html",
      rating: 3,
    },
    {
      fixture: "library-book-row-fav-finished-pdf.html",
      rating: null,
    },
  ])(".my_rating", ({ fixture, rating }) => {
    let row = new LibraryBookRow(docs[fixture]);
    expect(row.my_rating).toBe(rating);
  });

  test.each([
    { fixture: "-no-series", desc: "No Series", series: [] },
    {
      fixture: "",
      desc: "One Series",
      series: [
        {
          id: "B08CVC76VZ",
          url: "/series/Star-Shards-Chronicles-Audiobook/B08CVC76VZ",
          name: "Star Shards Chronicles",
          number: "1",
        },
      ],
    },
    {
      fixture: "-fav-finished-pdf",
      desc: "Multiple Series",
      series: [
        {
          id: "B0DMXTJ8WH",
          url: "/series/The-Cosmere-Audiobook/B0DMXTJ8WH",
          name: "The Cosmere",
          number: "",
        },
        {
          id: "B006K1RP8I",
          url: "/series/The-Stormlight-Archive-Audiobook/B006K1RP8I",
          name: "The Stormlight Archive",
          number: "5",
        },
      ],
    },
  ])("series: $desc", ({ fixture, desc, series }) => {
    let row = new LibraryBookRow(docs[`library-book-row${fixture}.html`]);
    expect(row.series).toEqual(series);
  });

  test(".data()", () => {
    let data = {
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
      my_rating: 3,
      series: [
        {
          id: "B08CVC76VZ",
          name: "Star Shards Chronicles",
          number: "1",
          url: "/series/Star-Shards-Chronicles-Audiobook/B08CVC76VZ",
        },
      ],
    };

    expect(row.data()).toEqual(data);
  });

  test(".data() errors", () => {
    let spy = jest.spyOn(global.console, "error");
    global.console.errors = spy.mockImplementation(() => {});

    let row = new LibraryBookRow(null, 2, 8);
    let field_count = row._fields.length;

    row.data();

    expect(spy.mock.calls).toHaveLength(field_count);
  });
});
