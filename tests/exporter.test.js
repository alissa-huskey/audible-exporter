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
require("../src/parser.js");
require("../src/page.js");
require("../src/book-page.js");
require("../src/library-page.js");
require("../src/library-book-row.js");
require("../src/library-fetcher.js");
require("../src/details-fetcher.js");
require("../src/order-row.js");
require("../src/purchase.js");
require("../src/order-page.js");
require("../src/year-fetcher.js");
require("../src/orders-fetcher.js");
require("../src/dom.js");
require("../src/modal.js");
require("../src/status-notifier.js");
require("../src/order-notifier.js");
require("../src/library-notifier.js");
require("../src/details-notifier.js");
require("../src/file.js");
require("../src/tsv-file.js");
require("../src/result.js");
require("../src/exporter.js");

describe("Exporter", function() {

  test(".getOrders()", async function() {
    let mockFn = mockFetchDocs([fixtureDoc("order-page.html"), fixtureDoc("order-page.html")]);
    Page.prototype.fetchDoc = mockFn;

    let exporter = new Exporter();
    let items = await exporter.getOrders();
    let page = exporter.orders.years[0].pages[0];

    expect(mockFn.mock.calls).toHaveLength(2);
    expect(exporter.orders.count).toBe(44);
  });

  test(".getLibrary()", async function() {
    let docs = ["1", "2"].map((i) => 
      toDoc(getFixtureFile(`library-page-${i}-of-3.html`))
    );

    Page.prototype.fetchDoc = mockFetchDocs(docs);
    let exporter = new Exporter();

    await exporter.getLibrary();
    let books = exporter.library.books;

    let titles = books.map((b) => b.title);

    // in a real call, this would fetch pages with 50 per page, but since the
    // pages I downloaded apparently have 20 per page, it only does two requests
    expect(books.length).toBe(40);
    expect(books[0].title).toBe("Scorpion Shards: Star Shards Chronicles Series, Book 1");
  });

  test(".getBookDetails()", async function() {
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
    expect(exporter.orders.years).toHaveLength(1);
    expect(exporter.orders.years[0].pages).toHaveLength(1);
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
    expect(item.id).toBe("B0BL84CBLZ");
    expect(item.title).toBe("Ghosts of Zenith");
  });

  test(".getResults()", async function() {

    let exporter = new Exporter();

    exporter.orders.items = {
      "B0CQ3759C3": { "id": "B0CQ3759C3", "url": "http://www.audible.com/pd/B0CQ3759C3", "title": "Wind and Truth", "author": "Brandon Sanderson", "purchase_date": "01-21-2025" },
      "B0BG96TCVH": { "id": "B0BG96TCVH", "url": "http://www.audible.com/pd/B0BG96TCVH", "title": "Demons of Good and Evil", "author": "Kim Harrison", "purchase_date": "12-03-2024" },
      "1713569264": { "id": "1713569264", "url": "http://www.audible.com/pd/1713569264", "title": "The Queen", "author": "Jennifer L. Armentrout", "purchase_date": "12-03-2024" },
    };

    exporter.library.books = [
      { "id": "B0CQ3759C3", "url": "/pd/Wind-and-Truth-Audiobook/B0CQ3759C3", "title": "Wind and Truth: Book Five of the Stormlight Archive", "author": "Brandon Sanderson", "narrator": "Kate Reading", "series": "The Stormlight Archive" },
      { "id": "B0BG96TCVH", "url": "/pd/Demons-of-Good-and-Evil-Audiobook/B0BG96TCVH", "title": "Demons of Good and Evil: Hollows, Book 17", "author": "Kim Harrison", "narrator": "Marguerite Gavin", "series": "The Hollows" },
      { "id": "1713569264", "url": "/pd/The-Queen-Audiobook/1713569264", "title": "The Queen: A Wicked Novella (1001 Dark Nights)", "author": "Jennifer L. Armentrout", "narrator": "Amy Landon", "series": "Wicked Saga" },
    ];

    exporter.details.books = {
      "B0CQ3759C3": { "id": "B0CQ3759C3", "title": "Wind and Truth", "duration_minutes": 3768, "language": "English", "release_date": "2024 Dec 6", "release_timestamp": 1733468401000, "publisher": "Macmillan Audio", "publisher_summary": "\"The endearing husband-and-wife team of Kate Reading and Michael Kramer continue their stunning narration of the Stormlight Archive series...The narration coupled with the fascinating fantasy epic is a must-listen for series fans—and will keep newcomers intrigued by its deep world-building.\"—AudioFile Long-listed, Barnes and Noble Best New Books of the Year, 2024 Long-listed, Audible.com Best of the Year, 2024 The long-awaited explosive climax to the first arc of the #1 New York Times bestselling Stormlight Archive—the iconic epic fantasy masterpiece that has sold more than 10 million copies, from acclaimed bestselling author Brandon Sanderson. Dalinar Kholin challenged the evil god Odium to a contest of champions with the future of Roshar on the line. The Knights Radiant have only ten days to prepare—and the sudden ascension of the crafty and ruthless Taravangian to take Odium’s place has thrown everything into disarray. Desperate fighting continues simultaneously worldwide—Adolin in Azir, Sigzil and Venli at the Shattered Plains, and Jasnah in Thaylenah. The former assassin, Szeth, must cleanse his homeland of Shinovar from the dark influence of the Unmade. He is accompanied by Kaladin, who faces a new battle helping Szeth fight his own demons . . . and who must do the same for the insane Herald of the Almighty, Ishar. At the same time, Shallan, Renarin, and Rlain work to unravel the mystery behind the Unmade Ba-Ado-Mishram and her involvement in the enslavement of the singer race and in the ancient Knights Radiant killing their spren. And Dalinar and Navani seek an edge against Odium’s champion that can be found only in the Spiritual Realm, where memory and possibility combine in chaos. The fate of the entire Cosmere hangs in the balance. A Macmillan Audio production from Tor Books. PLEASE NOTE: When you purchase this title, the accompanying PDF will be available in your Audible Library along with the audio.", "audible_oginal": false, "book": "5", "category_type": "fiction", "main_category": "Science Fiction & Fantasy", "sub_category": "Fantasy", "categories": [ "Action &amp; Adventure", "Best of 2024", "Editors Select", "Epic", "Fantasy", "Military", "Scary", "Royalty", "War", "King" ], "rating": 4.6, "num_ratings": 13444 },
      "B0BG96TCVH": { "id": "B0BG96TCVH", "title": "Demons of Good and Evil", "duration_minutes": 1047, "language": "English", "release_date": "2023 Jun 13", "release_timestamp": 1686636001000, "publisher": "Penguin Audio", "publisher_summary": "Rachel Morgan will learn that the price of loyalty is blood in the next Hollows novel from #1 New York Times bestselling author Kim Harrison. Rachel Morgan, witch-born demon, suspected that protecting the paranormal citizens of Cincinnati as the demon subrosa would be trouble. But it’s rapidly becoming way more trouble than even she could have imagined. While Rachel and her friends may have vanquished the trickster demon Hodin, his mysterious associate known only as “The Mage” is eager to finish what Hodin started, beginning with taking down Rachel’s power structure piece by piece. With her world falling apart, Rachel desperately needs help. But with all of her supporters under attack, her only hope is to make a deal with the unlikeliest of allies. . . .", "audible_oginal": false, "book": "17", "category_type": "fiction", "main_category": "Science Fiction & Fantasy", "sub_category": "Fantasy", "categories": [ "Fantasy", "Paranormal", "Urban" ], "rating": 4.8, "num_ratings": 477 },
      "1713569264": { "id": "1713569264", "title": "The Queen", "duration_minutes": 323, "language": "English", "release_date": "2021 Sep 21", "release_timestamp": 1632204001000, "publisher": "Brilliance Audio", "publisher_summary": "From #1 New York Times and USA Today bestselling author Jennifer L. Armentrout comes the next installment in her Wicked series. The King must have his Queen.... Bestowed the forbidden Summer’s Kiss by the King of the Summer fae, Brighton Jussier is no longer just human. What she is, what she will become, no one knows for sure, but that isn’t her biggest concern at the moment. Now Caden, the King, refuses to let her go, even at the cost of his Court. When the doorway to the Otherworld is breached, both Brighton and Caden must do the unthinkable - not just to survive themselves, but also to save mankind from the evil that threatens the world. **Every 1001 Dark Nights novella is a standalone story. For new readers, it’s an introduction to an author’s world. And for fans, it’s a bonus book in the author’s series. We hope you'll enjoy each one as much as we do.**", "audible_oginal": false, "book": "3", "category_type": "fiction", "main_category": "Romance", "sub_category": "Fantasy", "categories": [ "Fantasy", "Paranormal", "Paranormal Romance", "Summer" ], "rating": 4.8, "num_ratings": 313 },
    };

    let results = [
      { "id": "B0CQ3759C3", "url": "http://www.audible.com/pd/B0CQ3759C3", "title": "Wind and Truth", "author": "Brandon Sanderson", "narrator": "Kate Reading", "series": "The Stormlight Archive", "duration_minutes": 3768, "language": "English", "release_date": "2024 Dec 6", "release_timestamp": 1733468401000, "publisher": "Macmillan Audio", "publisher_summary": "\"The endearing husband-and-wife team of Kate Reading and Michael Kramer continue their stunning narration of the Stormlight Archive series...The narration coupled with the fascinating fantasy epic is a must-listen for series fans—and will keep newcomers intrigued by its deep world-building.\"—AudioFile Long-listed, Barnes and Noble Best New Books of the Year, 2024 Long-listed, Audible.com Best of the Year, 2024 The long-awaited explosive climax to the first arc of the #1 New York Times bestselling Stormlight Archive—the iconic epic fantasy masterpiece that has sold more than 10 million copies, from acclaimed bestselling author Brandon Sanderson. Dalinar Kholin challenged the evil god Odium to a contest of champions with the future of Roshar on the line. The Knights Radiant have only ten days to prepare—and the sudden ascension of the crafty and ruthless Taravangian to take Odium’s place has thrown everything into disarray. Desperate fighting continues simultaneously worldwide—Adolin in Azir, Sigzil and Venli at the Shattered Plains, and Jasnah in Thaylenah. The former assassin, Szeth, must cleanse his homeland of Shinovar from the dark influence of the Unmade. He is accompanied by Kaladin, who faces a new battle helping Szeth fight his own demons . . . and who must do the same for the insane Herald of the Almighty, Ishar. At the same time, Shallan, Renarin, and Rlain work to unravel the mystery behind the Unmade Ba-Ado-Mishram and her involvement in the enslavement of the singer race and in the ancient Knights Radiant killing their spren. And Dalinar and Navani seek an edge against Odium’s champion that can be found only in the Spiritual Realm, where memory and possibility combine in chaos. The fate of the entire Cosmere hangs in the balance. A Macmillan Audio production from Tor Books. PLEASE NOTE: When you purchase this title, the accompanying PDF will be available in your Audible Library along with the audio.", "audible_oginal": false, "book": "5", "category_type": "fiction", "main_category": "Science Fiction & Fantasy", "sub_category": "Fantasy", "categories": [ "Action &amp; Adventure", "Best of 2024", "Editors Select", "Epic", "Fantasy", "Military", "Scary", "Royalty", "War", "King" ], "rating": 4.6, "num_ratings": 13444, "purchase_date": "01-21-2025" },
      { "id": "B0BG96TCVH", "url": "http://www.audible.com/pd/B0BG96TCVH", "title": "Demons of Good and Evil", "author": "Kim Harrison", "narrator": "Marguerite Gavin", "series": "The Hollows", "duration_minutes": 1047, "language": "English", "release_date": "2023 Jun 13", "release_timestamp": 1686636001000, "publisher": "Penguin Audio", "publisher_summary": "Rachel Morgan will learn that the price of loyalty is blood in the next Hollows novel from #1 New York Times bestselling author Kim Harrison. Rachel Morgan, witch-born demon, suspected that protecting the paranormal citizens of Cincinnati as the demon subrosa would be trouble. But it’s rapidly becoming way more trouble than even she could have imagined. While Rachel and her friends may have vanquished the trickster demon Hodin, his mysterious associate known only as “The Mage” is eager to finish what Hodin started, beginning with taking down Rachel’s power structure piece by piece. With her world falling apart, Rachel desperately needs help. But with all of her supporters under attack, her only hope is to make a deal with the unlikeliest of allies. . . .", "audible_oginal": false, "book": "17", "category_type": "fiction", "main_category": "Science Fiction & Fantasy", "sub_category": "Fantasy", "categories": [ "Fantasy", "Paranormal", "Urban" ], "rating": 4.8, "num_ratings": 477, "purchase_date": "12-03-2024" },
      { "id": "1713569264", "url": "http://www.audible.com/pd/1713569264", "title": "The Queen", "author": "Jennifer L. Armentrout", "narrator": "Amy Landon", "series": "Wicked Saga", "duration_minutes": 323, "language": "English", "release_date": "2021 Sep 21", "release_timestamp": 1632204001000, "publisher": "Brilliance Audio", "publisher_summary": "From #1 New York Times and USA Today bestselling author Jennifer L. Armentrout comes the next installment in her Wicked series. The King must have his Queen.... Bestowed the forbidden Summer’s Kiss by the King of the Summer fae, Brighton Jussier is no longer just human. What she is, what she will become, no one knows for sure, but that isn’t her biggest concern at the moment. Now Caden, the King, refuses to let her go, even at the cost of his Court. When the doorway to the Otherworld is breached, both Brighton and Caden must do the unthinkable - not just to survive themselves, but also to save mankind from the evil that threatens the world. **Every 1001 Dark Nights novella is a standalone story. For new readers, it’s an introduction to an author’s world. And for fans, it’s a bonus book in the author’s series. We hope you'll enjoy each one as much as we do.**", "audible_oginal": false, "book": "3", "category_type": "fiction", "main_category": "Romance", "sub_category": "Fantasy", "categories": [ "Fantasy", "Paranormal", "Paranormal Romance", "Summer" ], "rating": 4.8, "num_ratings": 313, "purchase_date": "12-03-2024" },
    ];

    exporter.getResults();

    expect(exporter.results).toEqual(results);
  });

  test(".run()", async function() {
    let mockFn = mockFetchDocs([
      fixtureDoc("order-page.html"),
      fixtureDoc("order-page.html"),
      fixtureDoc("library-page-1-of-1.html") ,
      fixtureDoc("book-details-audible-original.html"),
    ]);
    Page.prototype.fetchDoc = mockFn;

    let exporter = new Exporter();
    await exporter.run();

    expect(mockFn.mock.calls).toHaveLength(4);
    expect(exporter.results).toHaveLength(1);
  });

});
