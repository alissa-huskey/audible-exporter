/**
 * @jest-environment jsdom
 */

const $ = require("jquery");
const fs = require("fs")
const path = require("path");

require("../src/exporter.js");


describe("exporter", function() {
  exporter = Exporter();

  test("run() function", function() {
    expect(exporter.run).toBeDefined();
  });

  test("rando() function", function() {
    expect(exporter.rando(10)).toBeGreaterThanOrEqual(0);
  });

  test("reg() function", function() {
    expect(exporter.reg(/\d+/.exec("abc 53"), 0)).toBe("53");
    expect(exporter.reg(/\d+/.exec("abc"), 0)).toBe("");
  });

  test("cleanObject() function", function() {
    let includedTypes = {
      a: true,
      b: "b",
      c: Symbol("id"),
      d: 5,
      e: () => 1,
      f: {A: 1},
      g: [1, 2, 3],
    }

    expect(exporter.cleanObject({a: null, b: "", c: undefined})).toEqual({});
    expect(exporter.cleanObject(includedTypes)).toEqual(includedTypes)
  });

  test("str() function", function() {
    expect(exporter.str(1)).toBe(1)
    expect(exporter.str({a: 1, b: "B"}))
      .toBe('{\\\"a\\\":1,\\\"b\\\":\\\"B\\\"}');
  });

  test("attr() function", function() {
    expect(exporter.attr).toBeDefined();
  });

  test("fetchDoc() function", function() {
    expect(exporter.fetchDoc).toBeDefined();
  });

  test("tryFloat()", function() {
    expect(exporter.tryFloat("1.2")).toBe(1.2);
  });

  test("dateString()", function() {
    expect(exporter.dateString("01-21-2025")).toBe("2025 Jan 21");
  });

  test("tsvReady()", function() {
    expect(exporter.tsvReady("a \r b \r c")).toBe("a ↵ b ↵ c");
    expect(exporter.tsvReady("a \n b \n c")).toBe("a ↵ b ↵ c");
    expect(exporter.tsvReady("a \t b \t c")).toBe("a   b   c");
    expect(exporter.tsvReady("a \v b \v c")).toBe("a   b   c");
    expect(exporter.tsvReady("a \f b \f c")).toBe("a   b   c");
    expect(exporter.tsvReady("a \0 b \0 c")).toBe("a  b  c");
    expect(exporter.tsvReady("a \\ b \\ c")).toEqual("a \\\\ b \\\\ c");
    expect(exporter.tsvReady("a ' b ' c")).toEqual("a \\' b \\' c");
    expect(exporter.tsvReady('a " b " c')).toEqual('a \\" b \\" c');
    expect(exporter.tsvReady("a \u0009 b \u0009 c")).toBe("a   b   c");
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

  test("createDownloadHTML()", function() {
    document.body.innerHTML = "<html><body><p>Hello.</p></body></html>";
    exporter.createDownloadHTML();
    notifier = document.body.children[1];
    bar = document.body.children[1].firstChild;
    txt = document.body.children[1].firstChild.firstChild;

    expect(notifier.attributes["id"].value).toBe("downloading_notifier")
    expect(bar.attributes["id"].value).toBe("downloading_percentage_bar")
    expect(txt.attributes["id"].value).toBe("downloading_percentage_txt")
  });

  test("setStatus()", function() {
    document.body.innerHTML = "<html><body><div id='downloading_percentage_txt'>Hello.</div></body></html>";
    exporter.setStatus("Goodbye.");

    div = $("#downloading_percentage_txt");
    expect(div[0].innerText).toBe("Goodbye.");
  });

  test("filterByInnerHTML()", function() {
    doc = toDoc("<ul><li>Cheese Pizza</li><li>Pepperoni Pizza</li><li>Cheeseburger</li></ul>")
    items = exporter.filterByInnerHTML(exporter.tn(doc, "li"), / Pizza$/)

    expect(items.length).toBe(2)
    expect(items[0].innerHTML).toBe("Cheese Pizza")
    expect(items[1].innerHTML).toBe("Pepperoni Pizza")
  });

  // test("createDownloadHTML()", function() {
  //   document.body.innerHTML = "<html><body><p>Hello.</p></body></html>";
  //   // console.log("---------->", document.body.children.length, "<----------");
  //   console.log("---------->", document.body.innerHTML, "<----------");

  //   exporter.createDownloadHTML();
  //   console.log("---------->", document.body.children[1].innerHTML, "<----------");
  //   console.log("---------->", document.body.children[1].firstChild.innerHTML, "<----------");

  //   // expect(div.attributes["id"].value).toBe("download_notifier")
  //   // expect(div.attributes["style"].value).toBe("width: 100px")
  // });
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

  // test("parseBookDetails(): basic", function() {
  //   let html = getFixtureFile("book-details.html");
  //   let doc = toDoc(html);

  //   let book = {
  //       url: "pd/Ghosts-of-Zenith-Audiobook/B0BL84CBLZZ",
  //       title: "Midnight Riot",
  //       author: "Ben Aaronovitch",
  //       narrator: "Kobna Holdbrook-Smith",
  //       series: "Rivers of London",
  //       book: "1"
  //   };

  //   let result = exporter.parseBookDetails(doc);
  //   console.log(result);

  //   // expect(result).toEqual(book)
  // });

  test("parseBookDetails(): audible original", function() {
    let html = getFixtureFile("book-details-audible-original.html");
    let doc = toDoc(html);

    let book = {
      title: "Ghosts of Zenith",
      main_category: "Science Fiction &amp; Fantasy",
      sub_category: "Science Fiction",
      categories: [
        "Science Fiction",
        "Fiction",
        "Funny",
        "Scary",
        "Detective",
        "Solar System",
        "Science Fiction &amp; Fantasy",
        "Science Fiction"
      ],
      duration_minutes: 145,
      language: "English",
      release_date: "2023 Jan 12",
      release_timestamp: 1673506800000,
      publisher: "Audible Originals",
      category_type: 0,
      publisher_summary: "<b>On a nightmare world a thousand light years from Earth, one honest cop won’t rest until he solves the mystery of why his colony was condemned there, in this Audible Original story from best-selling author Larry Correia. </b><p>On a planet where life is cheap, in a city built on corruption, very few things are considered holy. The Landing Site is one of them. The remains of the century-old habitat pod—which delivered the colonists to the only barely habitable place on the cruel world of Croatoan—has become a monument to the hardscrabble people who somehow survived the unsurvivable.</p><p>So when blood is shed on that sacred ground, it’s seen as an attack against the entire colony. With a fanatical terrorist group holding hostages inside the monument, DCI Lutero Cade and the Zenith PD have to end the crisis and put the bad guys down.</p><p>Only there’s far more to this case than meets the eye. The lander may have been carrying a hidden cargo. And a shadowy figure with his own drone army will do anything to make sure the mission’s secrets stay buried—no matter how many nosy detectives he has to kill to do it.</p><p><br></p>",
      audible_oginal: true,
      book: '2',
      rating: 4.6,
      num_ratings: 1719
    };

    let result = exporter.parseBookDetails(doc);

    expect(result).toEqual(book)
  });

});
