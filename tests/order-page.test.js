/**
 * @jest-environment jsdom
 */

const $ = require("jquery");

require("../src/dev.js");
require("../src/util.js");
require("../src/element.js");
require("../src/list.js");
require("../src/page.js");
require("../src/order-page.js");

describe("OrderPage", function() {

  let html = getFixtureFile("order-page-1.html");
  let doc = toDoc(html);
  let page = new OrderPage(doc);

  test("new OrderPage(year, page)", async function() {
    OrderPage.prototype.fetchDoc = mockFetchDoc("order-page-1.html")
    let page = new OrderPage(2025, 1);
    await page.get();

    expect(page.constructor.name).toBe("OrderPage");
    expect(page.year).toBe(2025);
    expect(page.page_num).toBe(1);
    expect(page.doc.constructor.name).toBe("Element");
    expect(page.doc.title).toBe("Purchase History | Audible.com");
  });

  test("new OrderPage(doc)", function() {
    let page = new OrderPage(doc);
    expect(page.year).toBe(2025);
    expect(page.page_num).toBe(1);
    expect(page.constructor.name).toBe("OrderPage");
    expect(page.doc.constructor.name).toBe("Element");
  });

  test(".get()", async function() {
    OrderPage.prototype.fetchDoc = mockFetchDoc("order-page-1.html");

    let page = new OrderPage();
    let doc = await page.get();

    expect(doc.title).toBe("Purchase History | Audible.com");
  });

  test(".page_count", function() {
    expect(page.page_count).toBe(5);
  });

  test(".years", function() {
    let years = [
      "2025", "2024", "2023", "2022", "2021", "2020", "2019", "2018",
      "2017", "2016", "2015", "2014", "2013", "2012", "2011", "2010",
    ];

    expect(page.years).toEqual(years);
  });

  test(".orders", function() {
    let orders = {
      "D01-7379715-3760239": {id: "D01-7379715-3760239", date: "01-21-2025", total: "1 Credit"},
      "D01-4905288-1517028": {id: "D01-4905288-1517028", date: "12-03-2024", total: "$77.30"},
      "D01-0506818-5008215": {id: "D01-0506818-5008215", date: "12-02-2024", total: "$95.67"},
      "D01-9703333-4870646": {id: "D01-9703333-4870646", date: "12-01-2024", total: "1 Credit"},
      "D01-1162658-5907410": {id: "D01-1162658-5907410", date: "11-04-2024", total: "1 Credit"},
      "D01-7262808-8163417": {id: "D01-7262808-8163417", date: "10-31-2024", total: "1 Credit"},
      "D01-5796677-8291425": {id: "D01-5796677-8291425", date: "10-29-2024", total: "1 Credit"},
      "D01-7247673-4073843": {id: "D01-7247673-4073843", date: "10-28-2024", total: "1 Credit"},
      "D01-2388300-9366627": {id: "D01-2388300-9366627", date: "10-28-2024", total: "$60.92"},
      "D01-4899140-6464226": {id: "D01-4899140-6464226", date: "10-25-2024", total: "1 Credit"},
      "D01-8770138-4333054": {id: "D01-8770138-4333054", date: "10-24-2024", total: "1 Credit"},
      "D01-6124148-0992254": {id: "D01-6124148-0992254", date: "10-23-2024", total: "1 Credit"},
      "D01-7466506-3280229": {id: "D01-7466506-3280229", date: "10-23-2024", total: "1 Credit"},
      "D01-5982790-0067405": {id: "D01-5982790-0067405", date: "10-21-2024", total: "1 Credit"},
      "D01-6834207-4877038": {id: "D01-6834207-4877038", date: "10-21-2024", total: "$59.99"},
      "D01-1471084-4086621": {id: "D01-1471084-4086621", date: "10-20-2024", total: "1 Credit"},
      "D01-6352719-4022627": {id: "D01-6352719-4022627", date: "10-19-2024", total: "1 Credit"},
      "D01-1087744-2694668": {id: "D01-1087744-2694668", date: "10-19-2024", total: "1 Credit"},
      "D01-0625368-9699437": {id: "D01-0625368-9699437", date: "10-16-2024", total: "1 Credit"},
      "D01-7076604-3849823": {id: "D01-7076604-3849823", date: "10-15-2024", total: "1 Credit"},
    };

    expect(page.orders).toEqual(orders);
  });

  test(".purchases", function() {
    let purchases = {
        "1250819148": { "id": "1250819148", "order_id": "D01-4905288-1517028", "amount": "$3.95", "credits": "0.0", "title": "The Lives of Saints", "author": "Leigh Bardugo" },
        "1549187538": { "id": "1549187538", "order_id": "D01-0506818-5008215", "amount": "$5.59", "credits": "0.0", "title": "How the King of Elfhame Learned to Hate Stories", "author": "Holly Black, Rovina Cai - illustrator" },
        "1713569264": { "id": "1713569264", "order_id": "D01-4905288-1517028", "amount": "$2.83", "credits": "0.0", "title": "The Queen", "author": "Jennifer L. Armentrout" },
        "1977335020": { "id": "1977335020", "order_id": "D01-0506818-5008215", "amount": "$1.95", "credits": "0.0", "title": "Full Tilt", "author": "Neal Shusterman" },
        "1982556803": { "id": "1982556803", "order_id": "D01-0506818-5008215", "amount": "$2.26", "credits": "0.0", "title": "Souls of Fire and Steel", "author": "Jill Criswell" },
        "B0CQ3759C3": { "id": "B0CQ3759C3", "order_id": "D01-7379715-3760239", "amount": "1 Credit", "credits": "1.0", "title": "Wind and Truth", "author": "Brandon Sanderson" },
        "B0BG96TCVH": { "id": "B0BG96TCVH", "order_id": "D01-4905288-1517028", "amount": "$11.85", "credits": "0.0", "title": "Demons of Good and Evil", "author": "Kim Harrison" },
        "B07C63PS2B": { "id": "B07C63PS2B", "order_id": "D01-4905288-1517028", "amount": "$9.55", "credits": "0.0", "title": "Belle and the Pirate: An Adult Fairytale Romance", "author": "Vivienne Savage" },
        "B0CTNT9XWX": { "id": "B0CTNT9XWX", "order_id": "D01-4905288-1517028", "amount": "$11.85", "credits": "0.0", "title": "Demon's Bluff", "author": "Kim Harrison" },
        "B01MZG3QE8": { "id": "B01MZG3QE8", "order_id": "D01-4905288-1517028", "amount": "$4.80", "credits": "0.0", "title": "Raptor", "author": "Lindsay Buroker" },
        "B0BXY5Z6FB": { "id": "B0BXY5Z6FB", "order_id": "D01-4905288-1517028", "amount": "$3.54", "credits": "0.0", "title": "A Soul of Ash and Blood", "author": "Jennifer L. Armentrout" },
        "B01HDYBVN0": { "id": "B01HDYBVN0", "order_id": "D01-4905288-1517028", "amount": "$4.45", "credits": "0.0", "title": "The Blade's Memory", "author": "Lindsay Buroker" },
        "B01AMIGU3K": { "id": "B01AMIGU3K", "order_id": "D01-4905288-1517028", "amount": "$4.24", "credits": "0.0", "title": "Patterns in the Dark", "author": "Lindsay Buroker" },
        "B071NQ26W4": { "id": "B071NQ26W4", "order_id": "D01-4905288-1517028", "amount": "$4.95", "credits": "0.0", "title": "Soulblade", "author": "Lindsay Buroker" },
        "B09NQH714M": { "id": "B09NQH714M", "order_id": "D01-4905288-1517028", "amount": "$5.39", "credits": "0.0", "title": "Demon in the Wood", "author": "Leigh Bardugo" },
        "B07DL95FPK": { "id": "B07DL95FPK", "order_id": "D01-4905288-1517028", "amount": "$4.24", "credits": "0.0", "title": "Oaths", "author": "Lindsay Buroker" },
        "B00WKNCP0I": { "id": "B00WKNCP0I", "order_id": "D01-4905288-1517028", "amount": "$5.66", "credits": "0.0", "title": "Dragon Blood - Omnibus", "author": "Lindsay Buroker" },
        "B08QSM8ZD5": { "id": "B08QSM8ZD5", "order_id": "D01-0506818-5008215", "amount": "$4.94", "credits": "0.0", "title": "Students of the Order", "author": "Edward W. Robertson, Sam Lang" },
        "B0CVQWX66S": { "id": "B0CVQWX66S", "order_id": "D01-0506818-5008215", "amount": "$7.06", "credits": "0.0", "title": "The Shattered Path", "author": "Edward W. Robertson" },
        "B0D828ZG1Y": { "id": "B0D828ZG1Y", "order_id": "D01-0506818-5008215", "amount": "$5.38", "credits": "0.0", "title": "Drumindor", "author": "Michael J. Sullivan" },
        "B0BKR32DG4": { "id": "B0BKR32DG4", "order_id": "D01-0506818-5008215", "amount": "$7.07", "credits": "0.0", "title": "The 13th God", "author": "Edward W. Robertson" },
        "B09ZLN963G": { "id": "B09ZLN963G", "order_id": "D01-0506818-5008215", "amount": "$1.95", "credits": "0.0", "title": "Stephen Leeds: Death & Faxes", "author": "Brandon Sanderson, Max Epstein, David Pace, Michael Harkins" },
        "B0D1W1YF7R": { "id": "B0D1W1YF7R", "order_id": "D01-0506818-5008215", "amount": "$8.49", "credits": "0.0", "title": "The Cycle of Galand", "author": "Edward W. Robertson" },
        "B0B3LJ7JWH": { "id": "B0B3LJ7JWH", "order_id": "D01-0506818-5008215", "amount": "$10.46", "credits": "0.0", "title": "The Stolen Heir", "author": "Holly Black" },
        "0062951602": { "id": "0062951602", "order_id": "D01-0506818-5008215", "amount": "$10.34", "credits": "0.0", "title": "King Bullet", "author": "Richard Kadrey" },
        "B00BQZ5JKY": { "id": "B00BQZ5JKY", "order_id": "D01-0506818-5008215", "amount": "$11.95", "credits": "0.0", "title": "Song of the Beast", "author": "Carol Berg" },
        "B00M8U0CJ4": { "id": "B00M8U0CJ4", "order_id": "D01-0506818-5008215", "amount": "$7.54", "credits": "0.0", "title": "The Sense of Style", "author": "Steven Pinker" },
        "B09D1DH6NX": { "id": "B09D1DH6NX", "order_id": "D01-0506818-5008215", "amount": "$3.53", "credits": "0.0", "title": "Monster Hunter Bloodlines", "author": "Larry Correia" },
        "B00PHPT01I": { "id": "B00PHPT01I", "order_id": "D01-0506818-5008215", "amount": "$7.16", "credits": "0.0", "title": "Legion: Skin Deep", "author": "Brandon Sanderson" },
        "B0B29L7HZ8": { "id": "B0B29L7HZ8", "order_id": "D01-9703333-4870646", "amount": "1 Credit", "credits": "1.0", "title": "House of Blades", "author": "Will Wight" },
        "B003NX2RFM": { "id": "B003NX2RFM", "order_id": "D01-1162658-5907410", "amount": "1 Credit", "credits": "1.0", "title": "At the Gates of Darkness", "author": "Raymond E. Feist" },
        "B00425LNN2": { "id": "B00425LNN2", "order_id": "D01-7262808-8163417", "amount": "1 Credit", "credits": "1.0", "title": "Rides a Dread Legion", "author": "Raymond E. Feist" },
        "0062975404": { "id": "0062975404", "order_id": "D01-5796677-8291425", "amount": "1 Credit", "credits": "1.0", "title": "Wrath of a Mad God", "author": "Raymond E. Feist" },
        "0062975374": { "id": "0062975374", "order_id": "D01-7247673-4073843", "amount": "1 Credit", "credits": "1.0", "title": "Into a Dark Realm", "author": "Raymond E. Feist" },
        "B0CK3QX5VL": { "id": "B0CK3QX5VL", "order_id": "D01-2388300-9366627", "amount": "$60.92", "credits": "0.0", "title": "Premium Plus Plan Extra 5 Credits", "author": "" },
        "0062975366": { "id": "0062975366", "order_id": "D01-4899140-6464226", "amount": "1 Credit", "credits": "1.0", "title": "Flight of the Nighthawks", "author": "Raymond E. Feist" },
        "0062975560": { "id": "0062975560", "order_id": "D01-8770138-4333054", "amount": "1 Credit", "credits": "1.0", "title": "Exile's Return", "author": "Raymond E. Feist" },
        "0062975544": { "id": "0062975544", "order_id": "D01-6124148-0992254", "amount": "1 Credit", "credits": "1.0", "title": "King of Foxes", "author": "Raymond E. Feist" },
        "0062975307": { "id": "0062975307", "order_id": "D01-7466506-3280229", "amount": "1 Credit", "credits": "1.0", "title": "Jimmy the Hand", "author": "Raymond E. Feist, S.M. Stirling" },
        "0062975528": { "id": "0062975528", "order_id": "D01-5982790-0067405", "amount": "1 Credit", "credits": "1.0", "title": "Talon of the Silver Hawk", "author": "Raymond E. Feist" },
        "B0C29VRJTJ": { "id": "B0C29VRJTJ", "order_id": "D01-6834207-4877038", "amount": "$59.99", "credits": "0.0", "title": "U.S. - 5 Credit Bundle", "author": "" },
        "0062975323": { "id": "0062975323", "order_id": "D01-1471084-4086621", "amount": "1 Credit", "credits": "1.0", "title": "Murder in LaMut", "author": "Joel Rosenberg, Raymond E. Feist" },
        "006297534X": { "id": "006297534X", "order_id": "D01-6352719-4022627", "amount": "1 Credit", "credits": "1.0", "title": "Honored Enemy", "author": "Raymond E. Feist, William R. Forstchen" },
        "0062978845": { "id": "0062978845", "order_id": "D01-1087744-2694668", "amount": "1 Credit", "credits": "1.0", "title": "Krondor: Tear of the Gods", "author": "Raymond E. Feist" },
        "0062975498": { "id": "0062975498", "order_id": "D01-0625368-9699437", "amount": "1 Credit", "credits": "1.0", "title": "Krondor: The Assassins", "author": "Raymond E. Feist" },
        "0062978810": { "id": "0062978810", "order_id": "D01-7076604-3849823", "amount": "1 Credit", "credits": "1.0", "title": "Krondor the Betrayal", "author": "Raymond E. Feist" }
    };

    expect(page.purchases).toEqual(purchases);
  });

  test(".items", function() {
    let items = [
      { "url": "/pd/1250819148", "title": "The Lives of Saints", "author": "Leigh Bardugo", "purchase_date": "12-03-2024" },
      { "url": "/pd/1549187538", "title": "How the King of Elfhame Learned to Hate Stories", "author": "Holly Black, Rovina Cai - illustrator", "purchase_date": "12-02-2024" },
      { "url": "/pd/1713569264", "title": "The Queen", "author": "Jennifer L. Armentrout", "purchase_date": "12-03-2024" },
      { "url": "/pd/1977335020", "title": "Full Tilt", "author": "Neal Shusterman", "purchase_date": "12-02-2024" },
      { "url": "/pd/1982556803", "title": "Souls of Fire and Steel", "author": "Jill Criswell", "purchase_date": "12-02-2024" },
      { "url": "/pd/B0CQ3759C3", "title": "Wind and Truth", "author": "Brandon Sanderson", "purchase_date": "01-21-2025" },
      { "url": "/pd/B0BG96TCVH", "title": "Demons of Good and Evil", "author": "Kim Harrison", "purchase_date": "12-03-2024" },
      { "url": "/pd/B07C63PS2B", "title": "Belle and the Pirate: An Adult Fairytale Romance", "author": "Vivienne Savage", "purchase_date": "12-03-2024" },
      { "url": "/pd/B0CTNT9XWX", "title": "Demon's Bluff", "author": "Kim Harrison", "purchase_date": "12-03-2024" },
      { "url": "/pd/B01MZG3QE8", "title": "Raptor", "author": "Lindsay Buroker", "purchase_date": "12-03-2024" },
      { "url": "/pd/B0BXY5Z6FB", "title": "A Soul of Ash and Blood", "author": "Jennifer L. Armentrout", "purchase_date": "12-03-2024" },
      { "url": "/pd/B01HDYBVN0", "title": "The Blade's Memory", "author": "Lindsay Buroker", "purchase_date": "12-03-2024" },
      { "url": "/pd/B01AMIGU3K", "title": "Patterns in the Dark", "author": "Lindsay Buroker", "purchase_date": "12-03-2024" },
      { "url": "/pd/B071NQ26W4", "title": "Soulblade", "author": "Lindsay Buroker", "purchase_date": "12-03-2024" },
      { "url": "/pd/B09NQH714M", "title": "Demon in the Wood", "author": "Leigh Bardugo", "purchase_date": "12-03-2024" },
      { "url": "/pd/B07DL95FPK", "title": "Oaths", "author": "Lindsay Buroker", "purchase_date": "12-03-2024" },
      { "url": "/pd/B00WKNCP0I", "title": "Dragon Blood - Omnibus", "author": "Lindsay Buroker", "purchase_date": "12-03-2024" },
      { "url": "/pd/B08QSM8ZD5", "title": "Students of the Order", "author": "Edward W. Robertson, Sam Lang", "purchase_date": "12-02-2024" },
      { "url": "/pd/B0CVQWX66S", "title": "The Shattered Path", "author": "Edward W. Robertson", "purchase_date": "12-02-2024" },
      { "url": "/pd/B0D828ZG1Y", "title": "Drumindor", "author": "Michael J. Sullivan", "purchase_date": "12-02-2024" },
      { "url": "/pd/B0BKR32DG4", "title": "The 13th God", "author": "Edward W. Robertson", "purchase_date": "12-02-2024" },
      { "url": "/pd/B09ZLN963G", "title": "Stephen Leeds: Death & Faxes", "author": "Brandon Sanderson, Max Epstein, David Pace, Michael Harkins", "purchase_date": "12-02-2024" },
      { "url": "/pd/B0D1W1YF7R", "title": "The Cycle of Galand", "author": "Edward W. Robertson", "purchase_date": "12-02-2024" },
      { "url": "/pd/B0B3LJ7JWH", "title": "The Stolen Heir", "author": "Holly Black", "purchase_date": "12-02-2024" },
      { "url": "/pd/0062951602", "title": "King Bullet", "author": "Richard Kadrey", "purchase_date": "12-02-2024" },
      { "url": "/pd/B00BQZ5JKY", "title": "Song of the Beast", "author": "Carol Berg", "purchase_date": "12-02-2024" },
      { "url": "/pd/B00M8U0CJ4", "title": "The Sense of Style", "author": "Steven Pinker", "purchase_date": "12-02-2024" },
      { "url": "/pd/B09D1DH6NX", "title": "Monster Hunter Bloodlines", "author": "Larry Correia", "purchase_date": "12-02-2024" },
      { "url": "/pd/B00PHPT01I", "title": "Legion: Skin Deep", "author": "Brandon Sanderson", "purchase_date": "12-02-2024" },
      { "url": "/pd/B0B29L7HZ8", "title": "House of Blades", "author": "Will Wight", "purchase_date": "12-01-2024" },
      { "url": "/pd/B003NX2RFM", "title": "At the Gates of Darkness", "author": "Raymond E. Feist", "purchase_date": "11-04-2024" },
      { "url": "/pd/B00425LNN2", "title": "Rides a Dread Legion", "author": "Raymond E. Feist", "purchase_date": "10-31-2024" },
      { "url": "/pd/0062975404", "title": "Wrath of a Mad God", "author": "Raymond E. Feist", "purchase_date": "10-29-2024" },
      { "url": "/pd/0062975374", "title": "Into a Dark Realm", "author": "Raymond E. Feist", "purchase_date": "10-28-2024" },
      { "url": "/pd/B0CK3QX5VL", "title": "Premium Plus Plan Extra 5 Credits", "author": "", "purchase_date": "10-28-2024" },
      { "url": "/pd/0062975366", "title": "Flight of the Nighthawks", "author": "Raymond E. Feist", "purchase_date": "10-25-2024" },
      { "url": "/pd/0062975560", "title": "Exile's Return", "author": "Raymond E. Feist", "purchase_date": "10-24-2024" },
      { "url": "/pd/0062975544", "title": "King of Foxes", "author": "Raymond E. Feist", "purchase_date": "10-23-2024" },
      { "url": "/pd/0062975307", "title": "Jimmy the Hand", "author": "Raymond E. Feist, S.M. Stirling", "purchase_date": "10-23-2024" },
      { "url": "/pd/0062975528", "title": "Talon of the Silver Hawk", "author": "Raymond E. Feist", "purchase_date": "10-21-2024" },
      { "url": "/pd/B0C29VRJTJ", "title": "U.S. - 5 Credit Bundle", "author": "", "purchase_date": "10-21-2024" },
      { "url": "/pd/0062975323", "title": "Murder in LaMut", "author": "Joel Rosenberg, Raymond E. Feist", "purchase_date": "10-20-2024" },
      { "url": "/pd/006297534X", "title": "Honored Enemy", "author": "Raymond E. Feist, William R. Forstchen", "purchase_date": "10-19-2024" },
      { "url": "/pd/0062978845", "title": "Krondor: Tear of the Gods", "author": "Raymond E. Feist", "purchase_date": "10-19-2024" },
      { "url": "/pd/0062975498", "title": "Krondor: The Assassins", "author": "Raymond E. Feist", "purchase_date": "10-16-2024" },
      { "url": "/pd/0062978810", "title": "Krondor the Betrayal", "author": "Raymond E. Feist", "purchase_date": "10-15-2024" }
    ];

    expect(page.items).toEqual(items);
  });

});
