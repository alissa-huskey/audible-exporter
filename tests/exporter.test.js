/**
 * @jest-environment jsdom
 */

const $ = require("jquery");
const fs = require("fs")
const path = require("path");

require("../src/dev.js");
require("../src/util.js");
require("../src/element.js");
require("../src/list.js");
require("../src/book-page.js");
require("../src/page.js");
require("../src/library-page.js");
require("../src/library.js");
require("../src/order-page.js");
require("../src/status-notifier.js");
require("../src/exporter.js");


describe("exporter", function() {
  exporter = Exporter();

  test("fetchDoc() function", function() {
    expect(exporter.fetchDoc).toBeDefined();
  });
});

describe("exporter: parsing functions", function() {

  test("parseLibraryPage()", function() {
    let html = getFixtureFile("library.html");
    let doc = new toDoc(html);

    let books = exporter.parseLibraryPage(doc);

    let book = {
        url: "/pd/Ghosts-of-Zenith-Audiobook/B0BL84CBLZ",
        title: "Ghosts of Zenith: Lost Planet Homicide",
        author: "Larry Correia",
        narrator: "Oliver Wyman",
        series: "Lost Planet Homicide",
    };

    expect(books[0]).toEqual(book)
  });

  test("parseBookDetails(): adbl", function() {
    globalThis.digitalData = {
      product: [ { productInfo: {
        productName: "Midnight Riot",
        language: "English",
        publisherName: "Tantor Audio"
    } } ] };

    let html = getFixtureFile("book-details.html");
    let doc = toDoc(html);

    let summary = "Probationary constable Peter Grant dreams of being a detective in London's Metropolitan Police. Too bad his superior plans to assign him to the Case Progression Unit, where the biggest threat he'll face is a paper cut. But Peter's prospects change in the aftermath of a puzzling murder, when he gains exclusive information from an eyewitness who happens to be a ghost. Peter's ability to speak with the lingering dead brings him to the attention of Detective Chief Inspector Thomas Nightingale, who investigates crimes involving magic and other manifestations of the uncanny.  Now, as a wave of brutal and bizarre murders engulfs the city, Peter is plunged into a world where gods and goddesses mingle with mortals and a long-dead evil is making a comeback on a rising tide of magic.";
    let categories = [
      "Fantasy",
      "Fantasy Essentials",
      "Mystery",
      "Paranormal",
      "Police Procedural",
      "Urban",
      "City",
      "Witty",
      "Suspenseful",
      "England"
    ];

    let book = exporter.parseBookDetails(doc);

    expect(book.title).toEqual("Midnight Riot");
    expect(book.duration_minutes).toEqual(596);
    expect(book.language).toEqual("English");
    expect(book.release_date).toEqual("2012 Sep 28");
    expect(book.release_timestamp).toEqual(1348812000000);
    expect(book.publisher).toEqual("Tantor Audio");
    expect(book.audible_oginal).toBe(false);
    expect(book.rating).toBe(4.3);
    expect(book.num_ratings).toBe(7856);
    expect(book.book).toBe("1");
    expect(book.publisher_summary).toBe(summary);
    expect(book.category_type).toBe("fiction");
    expect(book.main_category).toBe("Mystery, Thriller & Suspense");
    expect(book.sub_category).toBe("Fantasy");
    expect(book.categories).toEqual(categories);
  });

  test("parseBookDetails(): audible original", function() {
    globalThis.digitalData = { product: [ { productInfo: {
      productName: "Ghosts of Zenith",
      language: "English",
      publisherName: "Audible Originals"
    } } ] };

    let html = getFixtureFile("book-details-audible-original.html");
    document.body.innerHTML = html;

    let summary = "<b>On a nightmare world a thousand light years from Earth, one honest cop won’t rest until he solves the mystery of why his colony was condemned there, in this Audible Original story from best-selling author Larry Correia. </b><p>On a planet where life is cheap, in a city built on corruption, very few things are considered holy. The Landing Site is one of them. The remains of the century-old habitat pod—which delivered the colonists to the only barely habitable place on the cruel world of Croatoan—has become a monument to the hardscrabble people who somehow survived the unsurvivable.</p><p>So when blood is shed on that sacred ground, it’s seen as an attack against the entire colony. With a fanatical terrorist group holding hostages inside the monument, DCI Lutero Cade and the Zenith PD have to end the crisis and put the bad guys down.</p><p>Only there’s far more to this case than meets the eye. The lander may have been carrying a hidden cargo. And a shadowy figure with his own drone army will do anything to make sure the mission’s secrets stay buried—no matter how many nosy detectives he has to kill to do it.</p><p><br></p>";
    let categories = [
      "Funny",
      "Scary",
      "Detective",
      "Solar System",
    ];

    let book = exporter.parseBookDetails(document.documentElement);

    expect(book.title).toEqual("Ghosts of Zenith");
    expect(book.duration_minutes).toEqual(145);
    expect(book.language).toEqual("English");
    expect(book.release_date).toEqual("2023 Jan 12");
    expect(book.release_timestamp).toEqual(1673506800000);
    expect(book.publisher).toEqual("Audible Originals");
    expect(book.audible_oginal).toBe(true);
    expect(book.rating).toBe(4.6);
    expect(book.num_ratings).toBe(1719);
    expect(book.book).toBe("2");
    expect(book.publisher_summary).toBe(summary);
    expect(book.category_type).toBe("fiction");
    expect(book.main_category).toBe("Science Fiction & Fantasy");
    expect(book.sub_category).toBe("Science Fiction");
    expect(book.categories).toEqual(categories);
  });

  test("loopThroughtAudibleLibrary", async function() {
    let docs = ["1", "2", "3"].map((i) => 
      toDoc(getFixtureFile(`library-page-${i}-of-3.html`))
    );

    Library.prototype.fetchDoc = mockFetchDocs(docs);
    let exporter = Exporter();
    exporter.createDownloadHTML();

    let books = await exporter.loopThroughtAudibleLibrary();

    let titles = books.map((b) => b.title);
    expect(books.length).toBe(60);

    expect(books[0].title).toBe("Scorpion Shards: Star Shards Chronicles Series, Book 1");
    expect(books[59].title).toBe("Skysworn");
  });

  test("getOrderPageByDate", async function() {
    let years = [
      "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018",
      "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010",
    ];

    OrderPage.prototype.fetchDoc = mockFetchDoc("order-page.html");
    let exporter = Exporter();
    exporter.fetchDoc = mockFetchDoc("order-page.html");

    let page = await exporter.getOrderPageByDate(2025, 1);

    expect(page.page_count).toEqual(5);
    expect(page.years).toEqual(years);
    expect(Object.keys(page.items).length).toEqual(44);
    expect(page.items[0].title).toBe("Wind and Truth");
  });

});
