/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

require("../src/dev.js");
require("../src/util.js");
require("../src/list.js");
require("../src/element.js");
require("../src/book-page.js");

describe("BookPage", function() {

  let page = new BookPage();

  var digitalData = {product: [{productInfo: {
    "isAvailable":true,
    "productID":"B009CZNUGU",
    "isInWishlist":false,
    "language":"english",
    "productName":"Midnight Riot",
    "narrationAccent":"None",
    "contentDeliveryType":"MultiPartBook",
    "isFree":false,
    "publisherName":"Tantor Audio",
    "isPreorderable":false,
    "sku":"BK_TANT_002706",
    "isAdultProduct":false,
    "authors":[{"fullName":"Ben Aaronovitch","id":"B000AP1TJQ"}],
    "narrators":["Kobna Holdbrook-Smith"],
  }}]};

  test(".toMinutes()", function() {
    expect(page.toMinutes("62 hrs and 48 mins")).toBe(3768);
    expect(page.toMinutes("2 hrs")).toBe(120);
    expect(page.toMinutes("50 mins")).toBe(50);
  });

  test(".title", function() {
    page = new BookPage(null, digitalData);
    expect(page.title).toBe("Midnight Riot");
  });

  test(".release_date", function() {
    page.date = "09-28-12";
    expect(page.release_date).toBe("2012 Sep 28");
  });

  test(".release_timestamp", function() {
    page.date = "09-28-12";
    expect(page.release_timestamp).toBe(1348812000000);
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

  test(".data()", function() {
    let data = {
      title: 'Midnight Riot',
      language: 'English',
      release_date: '2012 Sep 28',
      release_timestamp: 1348812000000,
      publisher: 'Tantor Audio',
      audible_oginal: false
    }

    let result = page.data();
    expect(result).toEqual(data);
  });

});

describe("NormalBookPage", function() {

  let html = getFixtureFile("book-details-audible-original.html");
  let doc = toDoc(html);
  let page = new NormalBookPage(doc);

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
    let summary = "<b>On a nightmare world a thousand light years from Earth, one honest cop won’t rest until he solves the mystery of why his colony was condemned there, in this Audible Original story from best-selling author Larry Correia. </b><p>On a planet where life is cheap, in a city built on corruption, very few things are considered holy. The Landing Site is one of them. The remains of the century-old habitat pod—which delivered the colonists to the only barely habitable place on the cruel world of Croatoan—has become a monument to the hardscrabble people who somehow survived the unsurvivable.</p><p>So when blood is shed on that sacred ground, it’s seen as an attack against the entire colony. With a fanatical terrorist group holding hostages inside the monument, DCI Lutero Cade and the Zenith PD have to end the crisis and put the bad guys down.</p><p>Only there’s far more to this case than meets the eye. The lander may have been carrying a hidden cargo. And a shadowy figure with his own drone army will do anything to make sure the mission’s secrets stay buried—no matter how many nosy detectives he has to kill to do it.</p><p><br></p>";
    expect(page.publisher_summary).toBe(summary);
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

});
