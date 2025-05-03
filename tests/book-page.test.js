/**
 * @jest-environment jsdom
 */

require("../src/dev.js");
require("../src/book-page.js");

let fixtures = [
  "book-details-ace.html",
  "book-details-audible-original.html",
  "book-details-award.html",
  "book-details-multiple-series.html",
  "book-details-no-series.html",
  "book-details.html",
];

let docs = Object.fromEntries(fixtures.map((f) => [f, fixtureDoc(f)]));

describe("BookPage", () => {
  let page = new BookPage();

  test.each([
    {
      fixture: "book-details-audible-original.html",
      klass: NormalBookPage,
    },
    {
      fixture: "book-details.html",
      klass: ADBLBookPage,
    },
  ])("BookPage.new()", ({ fixture, klass }) => {
    let doc = docs[fixture];
    let page = BookPage.new(doc);
    expect(page).toBeA(klass);
  });

  test("BookPage.get()", async () => {
    Page.prototype.fetchDoc = mockFetchDocs([
      docs["book-details-audible-original.html"],
      docs["book-details.html"],
    ]);

    let page = await BookPage.get("https://www.audible.com/pd/0062978810");
    expect(page).toBeA(NormalBookPage);

    page = await BookPage.get("https://www.audible.com/pd/0062978810");
    expect(page).toBeA("ADBLBookPage");
  });

  test.each([
    {
      fixture: "book-details-audible-original.html",
      narrators: ["Oliver Wyman"],
    },
    {
      fixture: "book-details-award.html",
      narrators: ["Colin Firth"],
    },
    {
      fixture: "book-details-no-series.html",
      narrators: ["Ben Barnes", "Lauren Fortgang"],
    },
    {
      fixture: "book-details-multiple-series.html",
      narrators: ["Kate Reading", "Michael Kramer"],
    },
    {
      fixture: "book-details-ace.html",
      narrators: ["Roger Clark"],
    },
  ])(".narrators", async ({ fixture, narrators }) => {
    let doc = docs[fixture];
    let page = BookPage.new(doc);

    expect(page.narrators).toBeA(Array);
    expect(page.narrators).toEqual(narrators);
  });

  test.each([
    {
      fixture: "book-details-audible-original.html",
      series: [
        {
          id: "B0BLFCYN8D",
          url: "/series/Lost-Planet-Homicide-Audiobooks/B0BLFCYN8D",
          name: "Lost Planet Homicide",
          number: "2",
        },
      ],
    },
    {
      fixture: "book-details-award.html",
      series: [],
    },
    {
      fixture: "book-details-no-series.html",
      series: [],
    },
    {
      fixture: "book-details-multiple-series.html",
      series: [
        {
          id: "B0DMXTJ8WH",
          url: "/series/The-Cosmere-Audiobooks/B0DMXTJ8WH",
          name: "The Cosmere",
          number: "",
        },
        {
          id: "B006K1RP8I",
          url: "/series/The-Stormlight-Archive-Audiobooks/B006K1RP8I",
          name: "The Stormlight Archive",
          number: "5",
        },
      ],
    },
    {
      fixture: "book-details-ace.html",
      series: [
        {
          id: "B08QYMW9V3",
          url: "/series/Audible-Original-Stories-Audiobooks/B08QYMW9V3",
          name: "Audible Original Stories",
          number: "",
        },
        {
          id: "B099RGZYQF",
          url: "/series/Black-Badge-Series-Audiobooks/B099RGZYQF",
          name: "Black Badge Series",
          number: "0.5",
        },
      ],
    },
  ])(".series", async ({ fixture, series }) => {
    let doc = docs[fixture];
    let page = BookPage.new(doc);

    expect(page.series).toBeA(Array);
    expect(page.series).toEqual(series);
  });

  test.each([
    {
      genre: "Science Fiction & Fantasy",
      subgenre: "Fantasy",
      tags: ["Funny", "Scary", "Detective", "Solar System"],
      type: "Fiction",
    },
    {
      genre: "Romance",
      subgenre: "Fantasy",
      tags: ["Epic Fantasy", "Science Fiction", "Steampunk", "Paleontology"],
      type: "Fiction",
    },
    {
      genre: "Romance",
      subgenre: "Paranormal",
      tags: ["Fiction", "Fairy Tales", "Fantasy"],
      type: "Fiction",
    },
    {
      genre: "Romance",
      subgenre: "Fantasy",
      tags: [],
      type: "Fiction",
    },
    {
      genre: "Education & Learning",
      subgenre: "Words, Language & Grammar",
      tags: [],
      type: "Nonfiction",
    },
    {
      genre: "Comedy & Humor",
      subgenre: "Performing Arts",
      tags: [],
      type: "Nonfiction",
    },
    {
      genre: "Teen & Young Adult",
      subgenre: "Mystery, Thriller & Suspense",
      tags: ["Fairy Tales, Folk Tales & Myths"],
      type: "Fiction",
    },
    {
      genre: "Teen & Young Adult",
      subgenre: "Mystery, Thriller & Suspense",
      tags: ["True Crime"],
      type: "Nonfiction",
    },
    {
      genre: "Mystery, Thriller & Suspense",
      subgenre: "Mystery",
      tags: ["History"],
      type: "Fiction",
    },
  ])(".type", async ({ genre, subgenre, tags, type }) => {
    let page = BookPage.new();

    jest.spyOn(BookPage.prototype, "genre", "get").mockReturnValue(genre);
    jest.spyOn(BookPage.prototype, "subgenre", "get").mockReturnValue(subgenre);

    for (let klass of [BookPage, NormalBookPage, ADBLBookPage]) {
      jest.spyOn(klass.prototype, "tags_list", "get").mockReturnValue(tags);
    }

    expect(page.type).toBe(type);
  });
});

describe("NormalBookPage", () => {
  let doc = docs["book-details-audible-original.html"];
  let page = new NormalBookPage(doc);

  test(".json", () => {
    expect(page.json).toBeA(Object);
    expect(Object.keys(page.json)).toEqual([
      "Organization",
      "Audiobook",
      "BreadcrumbList",
      "Product",
    ]);
  });

  test(".audiobook_data", () => {
    let json = {
      "@context": "http://schema.org",
      "@type": "Audiobook",
      bookFormat: "AudiobookFormat",
      name: "Ghosts of Zenith",
      image: "https://m.media-amazon.com/images/I/51lF5xL--dL._SL500_.jpg",
      author: [{ "@type": "Person", name: "Larry Correia" }],
      readBy: [{ "@type": "Person", name: "Oliver Wyman" }],
      publisher: "Audible Originals",
      datePublished: "2023-01-12",
      inLanguage: "english",
      duration: "PT2H25M",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.64281559045957",
        ratingCount: "1719",
      },
    };

    expect(page.audiobook_data).toBeA(Object);
    expect(page.audiobook_data).toMatchObject(json);
    expect(page.audiobook_data.description).toMatch("On a nightmare world");
  });

  test(".product_data", () => {
    let json = {
      "@context": "http://schema.org",
      "@type": "Product",
      additionalType: "http://www.productontology.org/id/Audiobook",
      productID: "B0BL84CBLZ",
      name: "Ghosts of Zenith",
      image: "https://m.media-amazon.com/images/I/51lF5xL--dL._SL500_.jpg",
      sku: "OR_ORIG_002162",
      brand: "Audible Originals",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.64281559045957",
        ratingCount: "1719",
      },
    };

    expect(page.product_data).toBeTruthy();
    expect(page.product_data).toMatchObject(json);
  });

  test(".product_info", () => {
    expect(page.product_info).toBeA(Object);
    expect(page.product_info).toEqual({
      isAvailable: true,
      productID: "B0BL84CBLZ",
      isInWishlist: false,
      language: "english",
      productName: "Ghosts of Zenith",
      narrationAccent: "None",
      contentDeliveryType: "SinglePartBook",
      isFree: false,
      publisherName: "Audible Originals",
      isPreorderable: false,
      sku: "OR_ORIG_002162",
      isAdultProduct: false,
      authors: [{ fullName: "Larry Correia", id: "B002D68HL8" }],
      narrators: ["Oliver Wyman"],
    });
  });

  test(".id", () => {
    expect(page.id).toBe("B0BL84CBLZ");
  });

  test(".title", () => {
    expect(page.title).toBe("Ghosts of Zenith");
  });

  test(".authors", () => {
    let author = [
      {
        name: "Larry Correia",
        id: "B002D68HL8",
        url: "/author/B002D68HL8",
      },
    ];
    expect(page.authors).toEqual(author);
  });

  test(".narrators", () => {
    expect(page.narrators).toEqual(["Oliver Wyman"]);
  });

  test(".date", () => {
    jest
      .spyOn(NormalBookPage.prototype, "date", "get")
      .mockReturnValue("09-28-12");
    expect(page.release_date).toBe("9/28/2012");
  });

  test(".duration", () => {
    expect(page.duration).toBe(145);
  });

  test(".rating", () => {
    expect(page.rating).toBe(4.6);
  });

  test(".num_ratings", () => {
    expect(page.num_ratings).toBe(1719);
  });

  test(".is_adult", () => {
    expect(page.is_adult).toBe(false);
  });

  test(".series", () => {
    expect(page.series).toEqual([
      {
        id: "B0BLFCYN8D",
        url: "/series/Lost-Planet-Homicide-Audiobooks/B0BLFCYN8D",
        name: "Lost Planet Homicide",
        number: "2",
      },
    ]);
  });

  test(".summary", () => {
    let summary =
      "On a nightmare world a thousand light years from Earth, one honest cop won’t rest until he solves the mystery of why his colony was condemned there, in this Audible Original story from best-selling author Larry Correia. On a planet where life is cheap, in a city built on corruption, very few things are considered holy. The Landing Site is one of them. The remains of the century-old habitat pod—which delivered the colonists to the only barely habitable place on the cruel world of Croatoan—has become a monument to the hardscrabble people who somehow survived the unsurvivable. So when blood is shed on that sacred ground, it’s seen as an attack against the entire colony. With a fanatical terrorist group holding hostages inside the monument, DCI Lutero Cade and the Zenith PD have to end the crisis and put the bad guys down. Only there’s far more to this case than meets the eye. The lander may have been carrying a hidden cargo. And a shadowy figure with his own drone army will do anything to make sure the mission’s secrets stay buried—no matter how many nosy detectives he has to kill to do it.";
    expect(page.summary).toBe(summary);
  });

  test(".publisher", () => {
    expect(page.publisher).toBe("Audible Originals");
  });

  test(".language", () => {
    expect(page.language).toBe("English");
  });

  test(".audible_original", () => {
    expect(page.audible_original).toBe(true);
  });

  test(".data()", () => {
    let data = {
      id: "B0BL84CBLZ",
      title: "Ghosts of Zenith",
      authors: [
        {
          name: "Larry Correia",
          id: "B002D68HL8",
          url: "/author/B002D68HL8",
        },
      ],
      narrators: ["Oliver Wyman"],
      duration: 145,
      language: "English",
      release_date: "1/12/2023",
      release_timestamp: 1673506801000,
      publisher: "Audible Originals",
      summary:
        "On a nightmare world a thousand light years from Earth, one honest cop won’t rest until he solves the mystery of why his colony was condemned there, in this Audible Original story from best-selling author Larry Correia. On a planet where life is cheap, in a city built on corruption, very few things are considered holy. The Landing Site is one of them. The remains of the century-old habitat pod—which delivered the colonists to the only barely habitable place on the cruel world of Croatoan—has become a monument to the hardscrabble people who somehow survived the unsurvivable. So when blood is shed on that sacred ground, it’s seen as an attack against the entire colony. With a fanatical terrorist group holding hostages inside the monument, DCI Lutero Cade and the Zenith PD have to end the crisis and put the bad guys down. Only there’s far more to this case than meets the eye. The lander may have been carrying a hidden cargo. And a shadowy figure with his own drone army will do anything to make sure the mission’s secrets stay buried—no matter how many nosy detectives he has to kill to do it.",
      audible_original: true,
      type: "Fiction",
      genre: "Science Fiction & Fantasy",
      subgenre: "Science Fiction",
      tags: ["Funny", "Scary", "Detective", "Solar System"],
      rating: 4.6,
      num_ratings: 1719,
      is_adult: false,
      series: [
        {
          id: "B0BLFCYN8D",
          name: "Lost Planet Homicide",
          number: "2",
          url: "/series/Lost-Planet-Homicide-Audiobooks/B0BLFCYN8D",
        },
      ],
    };

    let result = page.data();
    expect(result).toEqual(data);
  });

  test(".genre", () => {
    expect(page.genre).toEqual("Science Fiction & Fantasy");
  });

  test(".tags_list", () => {
    let tags = [
      "Science Fiction",
      "Fiction",
      "Funny",
      "Scary",
      "Detective",
      "Solar System",
    ];
    expect(page.tags_list).toEqual(tags);
  });

  test(".tags", () => {
    let tags = ["Funny", "Scary", "Detective", "Solar System"];

    expect(page.tags).toEqual(tags);
  });

  test(".subgenre", () => {
    expect(page.subgenre).toBe("Science Fiction");
  });
});

describe("ADBLBookPage", () => {
  let doc = docs["book-details.html"];
  let page = new ADBLBookPage(doc);

  test(".id", () => {
    expect(page.id).toBe("B009CZNUGU");
  });

  test(".title", () => {
    expect(page.title).toBe("Midnight Riot");
  });

  test(".authors", () => {
    let author = [
      {
        name: "Ben Aaronovitch",
        id: "B000AP1TJQ",
        url: "/author/B000AP1TJQ",
      },
    ];
    expect(page.authors).toEqual(author);
  });

  test(".narrators", () => {
    expect(page.narrators).toEqual(["Kobna Holdbrook-Smith"]);
  });

  test(".date", () => {
    expect(page.date).toEqual(new Date("09-28-12 00:00:01"));
  });

  test(".duration", () => {
    expect(page.duration).toBe(596);
  });

  test(".rating", () => {
    expect(page.rating).toBe(4.3);
  });

  test(".num_ratings", () => {
    expect(page.num_ratings).toBe(7856);
  });

  test(".is_adult", () => {
    expect(page.is_adult).toBe(false);
  });

  test(".summary", () => {
    let summary =
      "Probationary constable Peter Grant dreams of being a detective in London's Metropolitan Police. Too bad his superior plans to assign him to the Case Progression Unit, where the biggest threat he'll face is a paper cut. But Peter's prospects change in the aftermath of a puzzling murder, when he gains exclusive information from an eyewitness who happens to be a ghost. Peter's ability to speak with the lingering dead brings him to the attention of Detective Chief Inspector Thomas Nightingale, who investigates crimes involving magic and other manifestations of the uncanny.  Now, as a wave of brutal and bizarre murders engulfs the city, Peter is plunged into a world where gods and goddesses mingle with mortals and a long-dead evil is making a comeback on a rising tide of magic.";
    expect(page.summary).toBe(summary);
  });

  test(".publisher", () => {
    expect(page.publisher).toBe("Tantor Audio");
  });

  test(".language", () => {
    expect(page.language).toBe("English");
  });

  test(".audible_original", () => {
    expect(page.audible_original).toBe(false);
  });

  test(".genre", () => {
    expect(page.genre).toBe("Mystery, Thriller & Suspense");
  });

  test(".tags_list", () => {
    expect(page.tags_list).toEqual([
      "Fantasy",
      "Fantasy Essentials",
      "Fiction",
      "Mystery",
      "Paranormal",
      "Police Procedural",
      "Urban",
      "City",
      "Witty",
      "Suspenseful",
      "England",
    ]);
  });

  test(".tags_list (with ampersand)", () => {
    let doc = docs["book-details-no-series.html"];
    let page = new ADBLBookPage(doc);

    expect(page.tags_list).toEqual([
      "Action & Adventure",
      "Fantasy",
      "Literature & Fiction",
      "Science Fiction & Fantasy",
      "Young Adult",
      "Fiction",
      "Royalty",
      "King",
      "Heartfelt",
    ]);
  });

  test(".tags", () => {
    expect(page.tags).toEqual([
      "Fantasy",
      "Fantasy Essentials",
      "Paranormal",
      "Police Procedural",
      "Urban",
      "City",
      "Witty",
      "Suspenseful",
      "England",
    ]);
  });

  test(".series", () => {
    expect(page.series).toEqual([
      {
        id: "B009F1KOPG",
        url: "/series/Rivers-of-London-Series-Audiobooks/B009F1KOPG",
        name: "Rivers of London Series",
        number: "1",
      },
    ]);
  });

  test(".subgenre", () => {
    expect(page.subgenre).toBe("Mystery");
  });

  test(".data() errors", () => {
    let field_count = 17;
    let page = new BookPage();
    let spy = jest.spyOn(global.console, "error");
    global.console.errors = spy.mockImplementation(() => {});

    page.data();

    expect(spy.mock.calls).toHaveLength(field_count);
  });
});
