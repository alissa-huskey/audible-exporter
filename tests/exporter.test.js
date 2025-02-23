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
require("../src/book-page-parser.js");
require("../src/exporter.js");


describe("exporter", function() {
  exporter = Exporter();

  test("attr() function", function() {
    expect(exporter.attr).toBeDefined();
  });

  test("fetchDoc() function", function() {
    expect(exporter.fetchDoc).toBeDefined();
  });

  test("lengthOfBookInMinutes() function", function() {
    expect(exporter.lengthOfBookInMinutes("62 hrs and 48 mins")).toBe(3768);
    expect(exporter.lengthOfBookInMinutes("2 hrs")).toBe(120);
    expect(exporter.lengthOfBookInMinutes("50 mins")).toBe(50);
  });
});

describe("exporter: DOM functions", function() {
  let markup =
    '<ul>' +
    '  <li>a</li>' +
    '  <li class="selected">b</li>' +
    '  <li>c</li>' +
    '</ul>' +
    '<p id="text">xyz</p>'

  let doc = toDoc(markup);
  document.body.innerHTML = markup;
  exporter = Exporter();

  test("cn() function", function() {
    let res = exporter.cn(doc, "selected");

    expect(res.length).toBe(1)
    expect(res[0].innerHTML).toBe("b")
  });

  test("tn() function", function() {
    let res = exporter.tn(doc, "li");

    expect(res.length).toBe(3)
    expect(res[0].innerHTML).toBe("a")
  });

  test("gi() function", function() {
    let res = exporter.gi(doc, "text");

    expect(res.innerHTML).toBe("xyz")
  });

  test("ele()", function() {
    div = exporter.ele("div");

    expect(div.outerHTML).toBe("<div></div>")
  });

  test("attr()", function() {
    div = exporter.ele("div");
    exporter.attr(div, "id", "a")

    expect(div.attributes["id"].value).toBe("a")
  });

  test("a()", function() {
    div = exporter.ele("div");
    exporter.a(div, [
      ["id", "download_notifier"],
      ["style", "width: 100px"],
    ])

    expect(div.attributes["id"].value).toBe("download_notifier")
    expect(div.attributes["style"].value).toBe("width: 100px")
  });

  test("setStatus()", function() {
    document.body.innerHTML = "<html><body><div id='downloading_percentage_txt'>Hello.</div></body></html>";
    exporter.setStatus("Goodbye.");

    div = $("#downloading_percentage_txt");
    expect(div[0].innerText).toBe("Goodbye.");
  });

  // test(".getGenre(): tags include Fiction or Nonfiction", function() {
  //   let categories = [];
  //   let tags = ["Science Fiction", "Fiction"];
  //   genre = exporter.getGenre(categories, tags);

  //   expect(genre).toBe("fiction");
  // });

  // test(".getGenre(): categories include partial ficition or nonfiction", function() {
  //   genre = exporter.getGenre(["Science Fiction & Fantasy"], []);
  //   expect(genre).toBe("fiction");
  // });

  // test(".getGenre(): tags include partial ficition or nonfiction", function() {
  //   genre = exporter.getGenre([], ["Science Fiction"]);

  //   expect(genre).toBe("fiction");
  // });

  // test(".getGenre(): look up by category", function() {
  //   genre = exporter.getGenre(["Geography & Cultures"], []);
  //   expect(genre).toBe("nonfiction");

  //   genre = exporter.getGenre(["Children's Audiobooks"], ["Action & Adventure"]);
  //   expect(genre).toBe("fiction");
  // });

  // test(".getSubgenre(): two categories", function() {
  //   subgenre = exporter.getSubgenre(["Science Fiction & Fantasy", "Fantasy"], []);
  //   expect(subgenre).toBe("Fantasy");
  // });

  // test(".getSubgenre(): first listed subgenre", function() {
  //   subgenre = exporter.getSubgenre(["Mystery, Thriller & Suspense"], ["Suspense", "True Crime", "Thriller & Suspense"]);
  //   expect(subgenre).toBe("True Crime");
  // });

  // test(".getSubgenre(): first tag", function() {
  //   subgenre = exporter.getSubgenre(["Biographies & Memoirs"], ["Entertainment & Celebrities", "Inspiring"]);
  //   expect(subgenre).toBe("Entertainment & Celebrities");
  // });

  test("filterByInnerHTML()", function() {
    doc = toDoc("<ul><li>Cheese Pizza</li><li>Pepperoni Pizza</li><li>Cheeseburger</li></ul>")
    items = exporter.filterByInnerHTML(exporter.tn(doc, "li"), / Pizza$/)

    expect(items.length).toBe(2)
    expect(items[0].innerHTML).toBe("Cheese Pizza")
    expect(items[1].innerHTML).toBe("Pepperoni Pizza")
  });

  test("createDownloadHTML()", function() {
    document.body.innerHTML = "<html><body><p>Hello.</p></body></html>";

    exporter.createDownloadHTML();
    let div = Element.gi("downloading_notifier");
    let bar = div.gi("downloading_percentage_bar");
    let txt = div.gi("downloading_percentage_txt");

    expect(div.attributes["id"].value).toBe("downloading_notifier")
    expect(div.style.width).toBe("0px");
    expect(div.style.position).toBe("fixed");
    expect(div.style.top).toBe("100px");
    expect(div.style.left).toBe("0px");
    expect(div.style.border).toBe("1px solid #3de367");
    expect(div.style["border-radius"]).toBe("0.2em");
    expect(div.style.background).toMatch(/^rgb\(\d+, \d+, \d+\)$/);

    expect(bar.id).toBe("downloading_percentage_bar");
    expect(txt.id).toBe("downloading_percentage_txt");
    expect(txt.element.innerText).toBe("initiating download...");
  });
});

describe("exporter: parsing functions", function() {

  test("parseLibraryPage()", function() {
    let html = getFixtureFile("library.html");
    document.body.innerHTML = html;
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

});
