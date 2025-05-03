/**
 * @jest-environment jsdom
 */

const fs = require("fs");
const path = require("path");

require("../src/dev.js");
require("../src/exporter.js");

var LOCATION = window.location;

describe("Exporter", () => {
  beforeEach(() => {
    delete window.location;
    window.location = { href: "http://audible.com/" };
  });

  test("new Exporter()", () => {
    let exporter = new Exporter();

    expect(exporter).toBeA(Exporter);
    expect(window.ae).toEqual(exporter);
  });

  test.each([
    ["http://google.com", false],
    ["http://www.audible.fake-site.com", false],
    ["http://audible.com", true],
    ["http://audible.de", true],
    ["http://www.audible.com", true],
  ])("isAudible(%s)", (url, expected) => {
    window.location.href = url;

    let exporter = new Exporter();

    expect(exporter.isAudible()).toBe(expected);
  });

  test(".getPurchaseHistory()", async () => {
    let mockFn = mockFetchDocs([
      fixtureDoc("order-page.html"),
      fixtureDoc("order-page.html"),
    ]);
    Page.prototype.fetchDoc = mockFn;

    let exporter = new Exporter();
    await exporter.getPurchaseHistory();

    expect(mockFn.mock.calls).toHaveLength(2);
    expect(exporter.orders.pages).toHaveLength(1);
  });

  test(".getOrders()", async () => {
    let mockFn = mockFetchDocs([fixtureDoc("order-page-2025-1-of-1.html")]);
    Page.prototype.fetchDoc = mockFn;

    let exporter = new Exporter();
    exporter.orders.years = ["2025"];
    exporter.orders.pages = [new OrderPage(2025, 1)];

    await exporter.getOrders();

    expect(mockFn.mock.calls).toHaveLength(1);
    expect(exporter.orders.count).toBe(1);
  });

  test(".getLibrary()", async () => {
    let docs = ["1", "2"].map((i) =>
      toDoc(getFixtureFile(`library-page-${i}-of-3.html`)),
    );

    Page.prototype.fetchDoc = mockFetchDocs(docs);
    let exporter = new Exporter();

    await exporter.getLibrary();
    let books = exporter.library.books;

    let titles = books.map((b) => b.title);

    // in a real call, this would fetch pages with 50 per page, but since the
    // pages I downloaded apparently have 20 per page, it only does two requests
    expect(books.length).toBe(40);
    expect(books[0].title).toBe(
      "Scorpion Shards: Star Shards Chronicles Series, Book 1",
    );
  });

  test(".getBookDetails()", async () => {
    let mockFn = mockFetchDocs([
      fixtureDoc("order-page.html"),
      fixtureDoc("order-page.html"),
      fixtureDoc("library-page-1-of-1.html"),
      fixtureDoc("book-details-audible-original.html"),
    ]);
    Page.prototype.fetchDoc = mockFn;

    let exporter = new Exporter();

    await exporter.orders.init();
    await exporter.orders.populate();

    // make sure the order setup worked as expected
    expect(exporter.orders.pages).toHaveLength(1);
    expect(exporter.orders.count).toBe(44);

    await exporter.library.populate();

    // make sure the library setup worked as expected
    expect(exporter.library.page_count).toBe(1);
    expect(exporter.library.books).toHaveLength(1);
    expect(mockFn.mock.calls).toHaveLength(3);

    await exporter.getBookDetails();
    let item = Object.values(exporter.details.books)[0];

    expect(mockFn.mock.calls).toHaveLength(4);
    expect(Object.values(exporter.details.books)).toHaveLength(1);
    expect(item.asin).toBe("B0BL84CBLZ");
    expect(item.title).toBe("Ghosts of Zenith");
  });

  test(".getResults()", async () => {
    let exporter = new Exporter();

    // prettier-ignore
    exporter.orders.items = {
      B0CQ3759C3: { asin: "B0CQ3759C3", url: "http://www.audible.com/pd/B0CQ3759C3", title: "Wind and Truth", author: "Brandon Sanderson", purchased: "1/21/2025" },
      B0BG96TCVH: { asin: "B0BG96TCVH", url: "http://www.audible.com/pd/B0BG96TCVH", title: "Demons of Good and Evil", author: "Kim Harrison", purchased: "12/3/2024" },
      1713569264: { asin: "1713569264", url: "http://www.audible.com/pd/1713569264", title: "The Queen", author: "Jennifer L. Armentrout", purchased: "12/3/2024" },
    };

    // prettier-ignore
    exporter.library.books = [
      { asin: "B0CQ3759C3", url: "/pd/Wind-and-Truth-Audiobook/B0CQ3759C3", title: "Wind and Truth: Book Five of the Stormlight Archive", authors: ["Brandon Sanderson"], narrators: ["Kate Reading"], series: "The Stormlight Archive" },
      { asin: "B0BG96TCVH", url: "/pd/Demons-of-Good-and-Evil-Audiobook/B0BG96TCVH", title: "Demons of Good and Evil: Hollows, Book 17", authors: ["Kim Harrison"], narrators: ["Marguerite Gavin"], series: "The Hollows" },
      { asin: "1713569264", url: "/pd/The-Queen-Audiobook/1713569264", title: "The Queen: A Wicked Novella (1001 Dark Nights)", authors: ["Jennifer L. Armentrout"], narrators: ["Amy Landon"], series: "Wicked Saga" },
    ];

    // prettier-ignore
    exporter.details.books = {
      B0CQ3759C3: { asin: "B0CQ3759C3", title: "Wind and Truth", authors: ["Brandon Sanderson"], duration: 3768, language: "English", released: "12/6/2024", released_ts: 1733468401000, publisher: "Macmillan Audio", summary: "\"The endearing husband-and-wife team of Kate Reading and Michael Kramer continue their stunning narration of the Stormlight Archive series...The narration coupled with the fascinating fantasy epic is a must-listen for series fans—and will keep newcomers intrigued by its deep world-building.\"—AudioFile Long-listed, Barnes and Noble Best New Books of the Year, 2024 Long-listed, Audible.com Best of the Year, 2024 The long-awaited explosive climax to the first arc of the #1 New York Times bestselling Stormlight Archive—the iconic epic fantasy masterpiece that has sold more than 10 million copies, from acclaimed bestselling author Brandon Sanderson. Dalinar Kholin challenged the evil god Odium to a contest of champions with the future of Roshar on the line. The Knights Radiant have only ten days to prepare—and the sudden ascension of the crafty and ruthless Taravangian to take Odium’s place has thrown everything into disarray. Desperate fighting continues simultaneously worldwide—Adolin in Azir, Sigzil and Venli at the Shattered Plains, and Jasnah in Thaylenah. The former assassin, Szeth, must cleanse his homeland of Shinovar from the dark influence of the Unmade. He is accompanied by Kaladin, who faces a new battle helping Szeth fight his own demons . . . and who must do the same for the insane Herald of the Almighty, Ishar. At the same time, Shallan, Renarin, and Rlain work to unravel the mystery behind the Unmade Ba-Ado-Mishram and her involvement in the enslavement of the singer race and in the ancient Knights Radiant killing their spren. And Dalinar and Navani seek an edge against Odium’s champion that can be found only in the Spiritual Realm, where memory and possibility combine in chaos. The fate of the entire Cosmere hangs in the balance. A Macmillan Audio production from Tor Books. PLEASE NOTE: When you purchase this title, the accompanying PDF will be available in your Audible Library along with the audio.", audible_original: false, book: "5", type: "Fiction", genre: "Science Fiction & Fantasy", subgenre: "Fantasy", tags: [ "Action &amp; Adventure", "Best of 2024", "Editors Select", "Epic", "Fantasy", "Military", "Scary", "Royalty", "War", "King" ], rating: 4.6, num_ratings: 13444, is_adult: false },
      B0BG96TCVH: { asin: "B0BG96TCVH", title: "Demons of Good and Evil", authors: ["Kim Harrison"], duration: 1047, language: "English", released: "6/13/2023", released_ts: 1686636001000, publisher: "Penguin Audio", summary: "Rachel Morgan will learn that the price of loyalty is blood in the next Hollows novel from #1 New York Times bestselling author Kim Harrison. Rachel Morgan, witch-born demon, suspected that protecting the paranormal citizens of Cincinnati as the demon subrosa would be trouble. But it’s rapidly becoming way more trouble than even she could have imagined. While Rachel and her friends may have vanquished the trickster demon Hodin, his mysterious associate known only as “The Mage” is eager to finish what Hodin started, beginning with taking down Rachel’s power structure piece by piece. With her world falling apart, Rachel desperately needs help. But with all of her supporters under attack, her only hope is to make a deal with the unlikeliest of allies. . . .", audible_original: false, book: "17", type: "Fiction", genre: "Science Fiction & Fantasy", subgenre: "Fantasy", tags: [ "Fantasy", "Paranormal", "Urban" ], rating: 4.8, num_ratings: 477, is_adult: false },
      1713569264: { asin: "1713569264", title: "The Queen", authors: ["Jennifer L. Armentrout"], duration: 323, language: "English", released: "9/21/2021", released_ts: 1632204001000, publisher: "Brilliance Audio", summary: "From #1 New York Times and USA Today bestselling author Jennifer L. Armentrout comes the next installment in her Wicked series. The King must have his Queen.... Bestowed the forbidden Summer’s Kiss by the King of the Summer fae, Brighton Jussier is no longer just human. What she is, what she will become, no one knows for sure, but that isn’t her biggest concern at the moment. Now Caden, the King, refuses to let her go, even at the cost of his Court. When the doorway to the Otherworld is breached, both Brighton and Caden must do the unthinkable - not just to survive themselves, but also to save mankind from the evil that threatens the world. **Every 1001 Dark Nights novella is a standalone story. For new readers, it’s an introduction to an author’s world. And for fans, it’s a bonus book in the author’s series. We hope you'll enjoy each one as much as we do.**", audible_original: false, book: "3", type: "Fiction", genre: "Romance", subgenre: "Fantasy", tags: [ "Fantasy", "Paranormal", "Paranormal Romance", "Summer" ], rating: 4.8, num_ratings: 313, is_adult: false },
    };

    // prettier-ignore
    let results = [
      { asin: "B0CQ3759C3", url: "http://www.audible.com/pd/B0CQ3759C3", title: "Wind and Truth", authors: ["Brandon Sanderson"], narrators: ["Kate Reading"], series: "The Stormlight Archive", duration: 3768, language: "English", released: "12/6/2024", released_ts: 1733468401000, publisher: "Macmillan Audio", summary: "\"The endearing husband-and-wife team of Kate Reading and Michael Kramer continue their stunning narration of the Stormlight Archive series...The narration coupled with the fascinating fantasy epic is a must-listen for series fans—and will keep newcomers intrigued by its deep world-building.\"—AudioFile Long-listed, Barnes and Noble Best New Books of the Year, 2024 Long-listed, Audible.com Best of the Year, 2024 The long-awaited explosive climax to the first arc of the #1 New York Times bestselling Stormlight Archive—the iconic epic fantasy masterpiece that has sold more than 10 million copies, from acclaimed bestselling author Brandon Sanderson. Dalinar Kholin challenged the evil god Odium to a contest of champions with the future of Roshar on the line. The Knights Radiant have only ten days to prepare—and the sudden ascension of the crafty and ruthless Taravangian to take Odium’s place has thrown everything into disarray. Desperate fighting continues simultaneously worldwide—Adolin in Azir, Sigzil and Venli at the Shattered Plains, and Jasnah in Thaylenah. The former assassin, Szeth, must cleanse his homeland of Shinovar from the dark influence of the Unmade. He is accompanied by Kaladin, who faces a new battle helping Szeth fight his own demons . . . and who must do the same for the insane Herald of the Almighty, Ishar. At the same time, Shallan, Renarin, and Rlain work to unravel the mystery behind the Unmade Ba-Ado-Mishram and her involvement in the enslavement of the singer race and in the ancient Knights Radiant killing their spren. And Dalinar and Navani seek an edge against Odium’s champion that can be found only in the Spiritual Realm, where memory and possibility combine in chaos. The fate of the entire Cosmere hangs in the balance. A Macmillan Audio production from Tor Books. PLEASE NOTE: When you purchase this title, the accompanying PDF will be available in your Audible Library along with the audio.", audible_original: false, type: "Fiction", genre: "Science Fiction & Fantasy", subgenre: "Fantasy", tags: [ "Action &amp; Adventure", "Best of 2024", "Editors Select", "Epic", "Fantasy", "Military", "Scary", "Royalty", "War", "King" ], rating: 4.6, num_ratings: 13444, purchased: "1/21/2025", is_adult: false },
      { asin: "B0BG96TCVH", url: "http://www.audible.com/pd/B0BG96TCVH", title: "Demons of Good and Evil", authors: ["Kim Harrison"], narrators: ["Marguerite Gavin"], series: "The Hollows", duration: 1047, language: "English", released: "6/13/2023", released_ts: 1686636001000, publisher: "Penguin Audio", summary: "Rachel Morgan will learn that the price of loyalty is blood in the next Hollows novel from #1 New York Times bestselling author Kim Harrison. Rachel Morgan, witch-born demon, suspected that protecting the paranormal citizens of Cincinnati as the demon subrosa would be trouble. But it’s rapidly becoming way more trouble than even she could have imagined. While Rachel and her friends may have vanquished the trickster demon Hodin, his mysterious associate known only as “The Mage” is eager to finish what Hodin started, beginning with taking down Rachel’s power structure piece by piece. With her world falling apart, Rachel desperately needs help. But with all of her supporters under attack, her only hope is to make a deal with the unlikeliest of allies. . . .", audible_original: false, type: "Fiction", genre: "Science Fiction & Fantasy", subgenre: "Fantasy", tags: [ "Fantasy", "Paranormal", "Urban" ], rating: 4.8, num_ratings: 477, purchased: "12/3/2024", is_adult: false },
      { asin: "1713569264", url: "http://www.audible.com/pd/1713569264", title: "The Queen", authors: ["Jennifer L. Armentrout"], narrators: ["Amy Landon"], series: "Wicked Saga", duration: 323, language: "English", released: "9/21/2021", released_ts: 1632204001000, publisher: "Brilliance Audio", summary: "From #1 New York Times and USA Today bestselling author Jennifer L. Armentrout comes the next installment in her Wicked series. The King must have his Queen.... Bestowed the forbidden Summer’s Kiss by the King of the Summer fae, Brighton Jussier is no longer just human. What she is, what she will become, no one knows for sure, but that isn’t her biggest concern at the moment. Now Caden, the King, refuses to let her go, even at the cost of his Court. When the doorway to the Otherworld is breached, both Brighton and Caden must do the unthinkable - not just to survive themselves, but also to save mankind from the evil that threatens the world. **Every 1001 Dark Nights novella is a standalone story. For new readers, it’s an introduction to an author’s world. And for fans, it’s a bonus book in the author’s series. We hope you'll enjoy each one as much as we do.**", audible_original: false, type: "Fiction", genre: "Romance", subgenre: "Fantasy", tags: [ "Fantasy", "Paranormal", "Paranormal Romance", "Summer" ], rating: 4.8, num_ratings: 313, purchased: "12/3/2024", is_adult: false },
    ];

    exporter.getResults();

    expect(exporter.results).toEqual(results);
  });

  test("downloadReady()", () => {
    let exporter = new Exporter();
    exporter.downloadReady();

    expect(exporter.modal).toBeA(DownloadDialog);
  });

  test("download()", async () => {
    let exporter = new Exporter();
    exporter.results = ["a", "b", "c"];

    exporter.modal = new DownloadDialog();
    exporter.modal.create();
    exporter.modal.ft_select.selectedIndex = 2;

    download();

    expect(exporter.modal.file).toBeA(TSVFile);
  });

  test(".run()", async () => {
    let mockFn = mockFetchDocs([
      fixtureDoc("order-page.html"),
      fixtureDoc("order-page.html"),
      fixtureDoc("library-page-1-of-1.html"),
      fixtureDoc("book-details-audible-original.html"),
    ]);
    Page.prototype.fetchDoc = mockFn;

    // evade the login check
    let giMocker = jest.fn().mockImplementation(() => true);
    document.getElementById = giMocker;

    let exporter = new Exporter();
    await exporter.run();

    expect(mockFn.mock.calls).toHaveLength(4);
    expect(exporter.results).toHaveLength(1);
  });
});
