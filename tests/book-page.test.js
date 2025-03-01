/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

require("../src/dev.js");
require("../src/util.js");
require("../src/list.js");
require("../src/element.js");
require("../src/page.js");
require("../src/book-page.js");

describe("BookPage", function() {

  let page = new BookPage();

  test(".toMinutes()", function() {
    expect(page.toMinutes("62 hrs and 48 mins")).toBe(3768);
    expect(page.toMinutes("2 hrs")).toBe(120);
    expect(page.toMinutes("50 mins")).toBe(50);
  });

  test("BookPage.get()", async function() {
    Page.prototype.fetchDoc = mockFetchDocs([
      fixtureDoc("book-details-audible-original.html"),
      fixtureDoc("book-details.html"),
    ]);

    let page = await BookPage.get("https://www.audible.com/pd/0062978810")
    expect(page.constructor.name).toBe("NormalBookPage");

    page = await BookPage.get("https://www.audible.com/pd/0062978810")
    expect(page.constructor.name).toBe("ADBLBookPage");
  });

});

describe("NormalBookPage", function() {

  let html = getFixtureFile("book-details-audible-original.html");
  let doc = toDoc(html);
  let page = new NormalBookPage(doc);

  test("json_audiobook", function() {
    expect(page.json_audiobook).toBeTruthy();
    expect(page.json_audiobook["@type"]).toBe("Audiobook");
  });

  test("json_product", function() {
    expect(page.json_product).toBeTruthy();
    expect(page.json_product["@type"]).toBe("Product");
  });

  test(".id", function() {
    expect(page.id).toBe("B0BL84CBLZ");
  });

  test(".title", function() {
    expect(page.title).toBe("Ghosts of Zenith");
  });

  test(".date", function() {
    page.date = "09-28-12";
    expect(page.release_date).toBe("2023 Jan 12");
  });

  test(".duration_minutes", function() {
    expect(page.duration_minutes).toBe(145);
  });

  test(".rating", function() {
    expect(page.rating).toBe(4.6);
  });

  test(".num_ratings", function() {
    expect(page.num_ratings).toBe(1719);
  });

  test(".book", function() {
    expect(page.book).toBe("2");
  });

  test(".publisher_summary", function() {
    let summary = "On a nightmare world a thousand light years from Earth, one honest cop won’t rest until he solves the mystery of why his colony was condemned there, in this Audible Original story from best-selling author Larry Correia. On a planet where life is cheap, in a city built on corruption, very few things are considered holy. The Landing Site is one of them. The remains of the century-old habitat pod—which delivered the colonists to the only barely habitable place on the cruel world of Croatoan—has become a monument to the hardscrabble people who somehow survived the unsurvivable. So when blood is shed on that sacred ground, it’s seen as an attack against the entire colony. With a fanatical terrorist group holding hostages inside the monument, DCI Lutero Cade and the Zenith PD have to end the crisis and put the bad guys down. Only there’s far more to this case than meets the eye. The lander may have been carrying a hidden cargo. And a shadowy figure with his own drone army will do anything to make sure the mission’s secrets stay buried—no matter how many nosy detectives he has to kill to do it.";
    expect(page.publisher_summary).toBe(summary);
  });

  test(".publisher", function() {
    expect(page.publisher).toBe("Audible Originals");
  });

  test(".language", function() {
    expect(page.language).toBe("English");
  });

  test(".audible_oginal", function() {
    expect(page.audible_oginal).toBe(true);
  });

  test(".data()", function() {
    let data = {
      id: "B0BL84CBLZ",
      title: "Ghosts of Zenith",
      duration_minutes: 145,
      language: "English",
      release_date: "2023 Jan 12",
      release_timestamp: 1673506801000,
      publisher: "Audible Originals",
      publisher_summary: "On a nightmare world a thousand light years from Earth, one honest cop won’t rest until he solves the mystery of why his colony was condemned there, in this Audible Original story from best-selling author Larry Correia. On a planet where life is cheap, in a city built on corruption, very few things are considered holy. The Landing Site is one of them. The remains of the century-old habitat pod—which delivered the colonists to the only barely habitable place on the cruel world of Croatoan—has become a monument to the hardscrabble people who somehow survived the unsurvivable. So when blood is shed on that sacred ground, it’s seen as an attack against the entire colony. With a fanatical terrorist group holding hostages inside the monument, DCI Lutero Cade and the Zenith PD have to end the crisis and put the bad guys down. Only there’s far more to this case than meets the eye. The lander may have been carrying a hidden cargo. And a shadowy figure with his own drone army will do anything to make sure the mission’s secrets stay buried—no matter how many nosy detectives he has to kill to do it.",
      audible_oginal: true,
      book: "2",
      category_type: "fiction",
      main_category: "Science Fiction & Fantasy",
      sub_category: "Science Fiction",
      categories: [ "Funny", "Scary", "Detective", "Solar System" ],
      rating: 4.6,
      num_ratings: 1719
    }

    let result = page.data();
    expect(result).toEqual(data);
  });

  test(".categories_list", function() {
    let categories = ["Science Fiction & Fantasy", "Science Fiction"];
    expect(page.categories_list).toEqual(categories);
  });

  test(".main_category", function() {
    expect(page.main_category).toEqual("Science Fiction & Fantasy");
  });

  test(".tags_list", function() {
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

  test(".tags", function() {
    let tags = [
      "Science Fiction",
      "Funny",
      "Scary",
      "Detective",
      "Solar System",
    ];

    expect(page.tags).toEqual(tags);
  });

  test(".sub_category", function() {

    expect(page.tags).toEqual([
      "Science Fiction",
      "Funny",
      "Scary",
      "Detective",
      "Solar System",
    ]);

    expect(page.sub_category).toBe("Science Fiction");
  });

});

describe("ADBLBookPage", function() {

  let html = getFixtureFile("book-details.html");
  let doc = toDoc(html);
  let page = new ADBLBookPage(doc);

  test(".id", function() {
    expect(page.id).toBe("B009CZNUGU");
  });

  test(".title", function() {
    expect(page.title).toBe("Midnight Riot");
  });

  test(".date", function() {
    expect(page.date).toEqual(new Date("09-28-12 00:00:01"));
  });

  test(".duration_minutes", function() {
    expect(page.duration_minutes).toBe(596);
  });

  test(".rating", function() {
    expect(page.rating).toBe(4.3);
  });

  test(".num_ratings", function() {
    expect(page.num_ratings).toBe(7856);
  });

  test(".book", function() {
    expect(page.book).toBe("1");
  });

  test(".publisher_summary", function() {
    let summary = "Probationary constable Peter Grant dreams of being a detective in London's Metropolitan Police. Too bad his superior plans to assign him to the Case Progression Unit, where the biggest threat he'll face is a paper cut. But Peter's prospects change in the aftermath of a puzzling murder, when he gains exclusive information from an eyewitness who happens to be a ghost. Peter's ability to speak with the lingering dead brings him to the attention of Detective Chief Inspector Thomas Nightingale, who investigates crimes involving magic and other manifestations of the uncanny.  Now, as a wave of brutal and bizarre murders engulfs the city, Peter is plunged into a world where gods and goddesses mingle with mortals and a long-dead evil is making a comeback on a rising tide of magic.";
    expect(page.publisher_summary).toBe(summary);
  });

  test(".publisher", function() {
    expect(page.publisher).toBe("Tantor Audio");
  });

  test(".language", function() {
    expect(page.language).toBe("English");
  });

  test(".audible_oginal", function() {
    expect(page.audible_oginal).toBe(false);
  });

  test(".data", function() {
    expect(page.audible_oginal).toBe(false);
  });

  test(".categories_list", function() {
    expect(page.categories_list).toEqual(["Mystery, Thriller & Suspense"]);
  });

  test(".main_category", function() {
    expect(page.main_category).toBe("Mystery, Thriller & Suspense");
  });

  test(".tags_list", function() {
    expect(page.tags).toEqual([
      "Fantasy",
      "Fantasy Essentials",
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

  test(".tags", function() {
    expect(page.tags).toEqual([
      "Fantasy",
      "Fantasy Essentials",
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

  test(".sub_category", function() {
    expect(page.sub_category).toBe("Fantasy");
  });

  test(".data() errors", function() {
    let page = new BookPage();
    let spy = jest.spyOn(global.console, "error")
    global.console.errors = spy.mockImplementation(() => {});;

    page.data();

    expect(spy.mock.calls).toHaveLength(10);
  });

});
