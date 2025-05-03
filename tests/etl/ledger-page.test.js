require("../../src/etl/ledger-page.js");

describe("LedgerPage", () => {
  let doc = fixtureDoc("ledger-page.html");
  let page = new LedgerPage(doc);

  test("new LedgerPage(year, page)", async () => {
    LedgerPage.prototype.fetchDoc = mockFetchDoc(
      "ledger-page-2025-1-of-1.html",
    );
    let page = new LedgerPage(2025, 1);
    await page.get();

    expect(LedgerPage.prototype.fetchDoc).toHaveBeenCalledWith(
      `${page.base_url}&df=2025&pn=1&ps=40`,
    );
    expect(page).toBeA(LedgerPage);
    expect(page.year).toBe(2025);
    expect(page.page_num).toBe(1);
    expect(page.per_page).toBe(40);
    expect(page.doc).toBeA(Doc);
    expect(page.doc.title).toBe("Purchase History | Audible.com");
  });

  test("new LedgerPage(date_range_string, page)", async () => {
    LedgerPage.prototype.fetchDoc = mockFetchDoc("ledger-page.html");
    let page = new LedgerPage("last_90_days", 1, 20);

    expect(page.year).toBe("last_90_days");
    expect(page.page_num).toBe(1);
    expect(page.per_page).toBe(20);
  });

  test("new LedgerPage(year, page, per_page)", async () => {
    LedgerPage.prototype.fetchDoc = mockFetchDoc("ledger-page.html");
    let page = new LedgerPage(2025, 1, 20);

    expect(page).toBeA(LedgerPage);
    expect(page.year).toBe(2025);
    expect(page.page_num).toBe(1);
    expect(page.per_page).toBe(20);
  });

  test("new LedgerPage(doc)", () => {
    let page = new LedgerPage(doc);
    expect(page.year).toBe(2025);
    expect(page.page_num).toBe(1);
    expect(page).toBeA(LedgerPage);
    expect(page.doc).toBeA(Doc);
  });

  test(".get()", async () => {
    LedgerPage.prototype.fetchDoc = mockFetchDoc("ledger-page.html");

    let page = new LedgerPage("last_90_days", 1, 20);
    let element = await page.get();

    expect(LedgerPage.prototype.fetchDoc).toHaveBeenCalledWith(
      `${page.base_url}&df=last_90_days&pn=1&ps=20`,
    );
    expect(element.title).toBe("Purchase History | Audible.com");
  });

  test(".page_count", () => {
    let page = new LedgerPage(fixtureDoc("ledger-page-2024-1-of-2.html"));
    expect(page.page_count).toBe(2);
  });

  test(".years", () => {
    let years = ["2025", "2024", "2023"];

    page = new LedgerPage(fixtureDoc("ledger-page-2025-1-of-1.html"));
    expect(page.years).toEqual(years);
  });

  test(".orders", () => {
    // prettier-ignore
    let orders = {
   "D01-7379715-3760239": { id: "D01-7379715-3760239", date: "1/21/2025", total: "1 Credit", url: "/account/order-details?orderId=D01-7379715-3760239" },
   "D01-4905288-1517028": { id: "D01-4905288-1517028", date: "12/3/2024", total: "$77.30", url: "/account/order-details?orderId=D01-4905288-1517028" },
   "D01-0506818-5008215": { id: "D01-0506818-5008215", date: "12/2/2024", total: "$95.67", url: "/account/order-details?orderId=D01-0506818-5008215" },
   "D01-9703333-4870646": { id: "D01-9703333-4870646", date: "12/1/2024", total: "1 Credit", url: "/account/order-details?orderId=D01-9703333-4870646" },
   "D01-1162658-5907410": { id: "D01-1162658-5907410", date: "11/4/2024", total: "1 Credit", url: "/account/order-details?orderId=D01-1162658-5907410" },
   "D01-7262808-8163417": { id: "D01-7262808-8163417", date: "10/31/2024", total: "1 Credit", url: "/account/order-details?orderId=D01-7262808-8163417" },
   "D01-5796677-8291425": { id: "D01-5796677-8291425", date: "10/29/2024", total: "1 Credit", url: "/account/order-details?orderId=D01-5796677-8291425" },
   "D01-7247673-4073843": { id: "D01-7247673-4073843", date: "10/28/2024", total: "1 Credit", url: "/account/order-details?orderId=D01-7247673-4073843" },
   "D01-2388300-9366627": { id: "D01-2388300-9366627", date: "10/28/2024", total: "$60.92", url: "/account/order-details?orderId=D01-2388300-9366627" },
   "D01-4899140-6464226": { id: "D01-4899140-6464226", date: "10/25/2024", total: "1 Credit", url: "/account/order-details?orderId=D01-4899140-6464226" },
   "D01-8770138-4333054": { id: "D01-8770138-4333054", date: "10/24/2024", total: "1 Credit", url: "/account/order-details?orderId=D01-8770138-4333054" },
   "D01-6124148-0992254": { id: "D01-6124148-0992254", date: "10/23/2024", total: "1 Credit", url: "/account/order-details?orderId=D01-6124148-0992254" },
   "D01-7466506-3280229": { id: "D01-7466506-3280229", date: "10/23/2024", total: "1 Credit", url: "/account/order-details?orderId=D01-7466506-3280229" },
   "D01-5982790-0067405": { id: "D01-5982790-0067405", date: "10/21/2024", total: "1 Credit", url: "/account/order-details?orderId=D01-5982790-0067405" },
   "D01-6834207-4877038": { id: "D01-6834207-4877038", date: "10/21/2024", total: "$59.99", url: "/account/order-details?orderId=D01-6834207-4877038" },
   "D01-1471084-4086621": { id: "D01-1471084-4086621", date: "10/20/2024", total: "1 Credit", url: "/account/order-details?orderId=D01-1471084-4086621" },
   "D01-6352719-4022627": { id: "D01-6352719-4022627", date: "10/19/2024", total: "1 Credit", url: "/account/order-details?orderId=D01-6352719-4022627" },
   "D01-1087744-2694668": { id: "D01-1087744-2694668", date: "10/19/2024", total: "1 Credit", url: "/account/order-details?orderId=D01-1087744-2694668" },
   "D01-0625368-9699437": { id: "D01-0625368-9699437", date: "10/16/2024", total: "1 Credit", url: "/account/order-details?orderId=D01-0625368-9699437" },
   "D01-7076604-3849823": { id: "D01-7076604-3849823", date: "10/15/2024", total: "1 Credit", url: "/account/order-details?orderId=D01-7076604-3849823" },
    };

    let page = new LedgerPage(fixtureDoc("ledger-page.html"));
    expect(page.orders).toEqual(orders);
  });

  test(".purchases", () => {
    let page = new LedgerPage(fixtureDoc("ledger-page.html"));
    // prettier-ignore
    let purchases = [
        { asin: "B0CQ3759C3", order_id: "D01-7379715-3760239", amount: "1 Credit", credits: "1.0", title: "Wind and Truth", author: "Brandon Sanderson" },
        { asin: "B0BG96TCVH", order_id: "D01-4905288-1517028", amount: "$11.85", credits: "0.0", title: "Demons of Good and Evil", author: "Kim Harrison" },
        { asin: "1713569264", order_id: "D01-4905288-1517028", amount: "$2.83", credits: "0.0", title: "The Queen", author: "Jennifer L. Armentrout" },
        { asin: "B07C63PS2B", order_id: "D01-4905288-1517028", amount: "$9.55", credits: "0.0", title: "Belle and the Pirate: An Adult Fairytale Romance", author: "Vivienne Savage" },
        { asin: "B0CTNT9XWX", order_id: "D01-4905288-1517028", amount: "$11.85", credits: "0.0", title: "Demon's Bluff", author: "Kim Harrison" },
        { asin: "B01MZG3QE8", order_id: "D01-4905288-1517028", amount: "$4.80", credits: "0.0", title: "Raptor", author: "Lindsay Buroker" },
        { asin: "B0BXY5Z6FB", order_id: "D01-4905288-1517028", amount: "$3.54", credits: "0.0", title: "A Soul of Ash and Blood", author: "Jennifer L. Armentrout" },
        { asin: "B01HDYBVN0", order_id: "D01-4905288-1517028", amount: "$4.45", credits: "0.0", title: "The Blade's Memory", author: "Lindsay Buroker" },
        { asin: "1250819148", order_id: "D01-4905288-1517028", amount: "$3.95", credits: "0.0", title: "The Lives of Saints", author: "Leigh Bardugo" },
        { asin: "B01AMIGU3K", order_id: "D01-4905288-1517028", amount: "$4.24", credits: "0.0", title: "Patterns in the Dark", author: "Lindsay Buroker" },
        { asin: "B071NQ26W4", order_id: "D01-4905288-1517028", amount: "$4.95", credits: "0.0", title: "Soulblade", author: "Lindsay Buroker" },
        { asin: "B09NQH714M", order_id: "D01-4905288-1517028", amount: "$5.39", credits: "0.0", title: "Demon in the Wood", author: "Leigh Bardugo" },
        { asin: "B07DL95FPK", order_id: "D01-4905288-1517028", amount: "$4.24", credits: "0.0", title: "Oaths", author: "Lindsay Buroker" },
        { asin: "B00WKNCP0I", order_id: "D01-4905288-1517028", amount: "$5.66", credits: "0.0", title: "Dragon Blood - Omnibus", author: "Lindsay Buroker" },
        { asin: "B08QSM8ZD5", order_id: "D01-0506818-5008215", amount: "$4.94", credits: "0.0", title: "Students of the Order", author: "Edward W. Robertson, Sam Lang" },
        { asin: "1977335020", order_id: "D01-0506818-5008215", amount: "$1.95", credits: "0.0", title: "Full Tilt", author: "Neal Shusterman" },
        { asin: "B0CVQWX66S", order_id: "D01-0506818-5008215", amount: "$7.06", credits: "0.0", title: "The Shattered Path", author: "Edward W. Robertson" },
        { asin: "B0D828ZG1Y", order_id: "D01-0506818-5008215", amount: "$5.38", credits: "0.0", title: "Drumindor", author: "Michael J. Sullivan" },
        { asin: "B0BKR32DG4", order_id: "D01-0506818-5008215", amount: "$7.07", credits: "0.0", title: "The 13th God", author: "Edward W. Robertson" },
        { asin: "B09ZLN963G", order_id: "D01-0506818-5008215", amount: "$1.95", credits: "0.0", title: "Stephen Leeds: Death & Faxes", author: "Brandon Sanderson, Max Epstein, David Pace, Michael Harkins" },
        { asin: "1982556803", order_id: "D01-0506818-5008215", amount: "$2.26", credits: "0.0", title: "Souls of Fire and Steel", author: "Jill Criswell" },
        { asin: "1549187538", order_id: "D01-0506818-5008215", amount: "$5.59", credits: "0.0", title: "How the King of Elfhame Learned to Hate Stories", author: "Holly Black, Rovina Cai - illustrator" },
        { asin: "B0D1W1YF7R", order_id: "D01-0506818-5008215", amount: "$8.49", credits: "0.0", title: "The Cycle of Galand", author: "Edward W. Robertson" },
        { asin: "B0B3LJ7JWH", order_id: "D01-0506818-5008215", amount: "$10.46", credits: "0.0", title: "The Stolen Heir", author: "Holly Black" },
        { asin: "0062951602", order_id: "D01-0506818-5008215", amount: "$10.34", credits: "0.0", title: "King Bullet", author: "Richard Kadrey" },
        { asin: "B00BQZ5JKY", order_id: "D01-0506818-5008215", amount: "$11.95", credits: "0.0", title: "Song of the Beast", author: "Carol Berg" },
        { asin: "B00M8U0CJ4", order_id: "D01-0506818-5008215", amount: "$7.54", credits: "0.0", title: "The Sense of Style", author: "Steven Pinker" },
        { asin: "B09D1DH6NX", order_id: "D01-0506818-5008215", amount: "$3.53", credits: "0.0", title: "Monster Hunter Bloodlines", author: "Larry Correia" },
        { asin: "B00PHPT01I", order_id: "D01-0506818-5008215", amount: "$7.16", credits: "0.0", title: "Legion: Skin Deep", author: "Brandon Sanderson" },
        { asin: "B0B29L7HZ8", order_id: "D01-9703333-4870646", amount: "1 Credit", credits: "1.0", title: "House of Blades", author: "Will Wight" },
        { asin: "B003NX2RFM", order_id: "D01-1162658-5907410", amount: "1 Credit", credits: "1.0", title: "At the Gates of Darkness", author: "Raymond E. Feist" },
        { asin: "B00425LNN2", order_id: "D01-7262808-8163417", amount: "1 Credit", credits: "1.0", title: "Rides a Dread Legion", author: "Raymond E. Feist" },
        { asin: "0062975404", order_id: "D01-5796677-8291425", amount: "1 Credit", credits: "1.0", title: "Wrath of a Mad God", author: "Raymond E. Feist" },
        { asin: "0062975374", order_id: "D01-7247673-4073843", amount: "1 Credit", credits: "1.0", title: "Into a Dark Realm", author: "Raymond E. Feist" },
        { asin: "B0CK3QX5VL", order_id: "D01-2388300-9366627", amount: "$60.92", credits: "0.0", title: "Premium Plus Plan Extra 5 Credits", author: "" },
        { asin: "0062975366", order_id: "D01-4899140-6464226", amount: "1 Credit", credits: "1.0", title: "Flight of the Nighthawks", author: "Raymond E. Feist" },
        { asin: "0062975560", order_id: "D01-8770138-4333054", amount: "1 Credit", credits: "1.0", title: "Exile's Return", author: "Raymond E. Feist" },
        { asin: "0062975544", order_id: "D01-6124148-0992254", amount: "1 Credit", credits: "1.0", title: "King of Foxes", author: "Raymond E. Feist" },
        { asin: "0062975307", order_id: "D01-7466506-3280229", amount: "1 Credit", credits: "1.0", title: "Jimmy the Hand", author: "Raymond E. Feist, S.M. Stirling" },
        { asin: "0062975528", order_id: "D01-5982790-0067405", amount: "1 Credit", credits: "1.0", title: "Talon of the Silver Hawk", author: "Raymond E. Feist" },
        { asin: "B0C29VRJTJ", order_id: "D01-6834207-4877038", amount: "$59.99", credits: "0.0", title: "U.S. - 5 Credit Bundle", author: "" },
        { asin: "0062975323", order_id: "D01-1471084-4086621", amount: "1 Credit", credits: "1.0", title: "Murder in LaMut", author: "Joel Rosenberg, Raymond E. Feist" },
        { asin: "006297534X", order_id: "D01-6352719-4022627", amount: "1 Credit", credits: "1.0", title: "Honored Enemy", author: "Raymond E. Feist, William R. Forstchen" },
        { asin: "0062978845", order_id: "D01-1087744-2694668", amount: "1 Credit", credits: "1.0", title: "Krondor: Tear of the Gods", author: "Raymond E. Feist" },
        { asin: "0062975498", order_id: "D01-0625368-9699437", amount: "1 Credit", credits: "1.0", title: "Krondor: The Assassins", author: "Raymond E. Feist" },
        { asin: "0062978810", order_id: "D01-7076604-3849823", amount: "1 Credit", credits: "1.0", title: "Krondor the Betrayal", author: "Raymond E. Feist" }
    ];

    expect(page.purchases).toEqual(purchases);
  });

  test(".entries", () => {
    // prettier-ignore
    let entries = [
        { asin: "B0CQ3759C3", url: "http://www.audible.com/pd/B0CQ3759C3", title: "Wind and Truth", author: "Brandon Sanderson", purchased: "1/21/2025" },
        { asin: "B0BG96TCVH", url: "http://www.audible.com/pd/B0BG96TCVH", title: "Demons of Good and Evil", author: "Kim Harrison", purchased: "12/3/2024" },
        { asin: "1713569264", url: "http://www.audible.com/pd/1713569264", title: "The Queen", author: "Jennifer L. Armentrout", purchased: "12/3/2024" },
        { asin: "B07C63PS2B", url: "http://www.audible.com/pd/B07C63PS2B", title: "Belle and the Pirate: An Adult Fairytale Romance", author: "Vivienne Savage", purchased: "12/3/2024" },
        { asin: "B0CTNT9XWX", url: "http://www.audible.com/pd/B0CTNT9XWX", title: "Demon's Bluff", author: "Kim Harrison", purchased: "12/3/2024" },
        { asin: "B01MZG3QE8", url: "http://www.audible.com/pd/B01MZG3QE8", title: "Raptor", author: "Lindsay Buroker", purchased: "12/3/2024" },
        { asin: "B0BXY5Z6FB", url: "http://www.audible.com/pd/B0BXY5Z6FB", title: "A Soul of Ash and Blood", author: "Jennifer L. Armentrout", purchased: "12/3/2024" },
        { asin: "B01HDYBVN0", url: "http://www.audible.com/pd/B01HDYBVN0", title: "The Blade's Memory", author: "Lindsay Buroker", purchased: "12/3/2024" },
        { asin: "1250819148", url: "http://www.audible.com/pd/1250819148", title: "The Lives of Saints", author: "Leigh Bardugo", purchased: "12/3/2024" },
        { asin: "B01AMIGU3K", url: "http://www.audible.com/pd/B01AMIGU3K", title: "Patterns in the Dark", author: "Lindsay Buroker", purchased: "12/3/2024" },
        { asin: "B071NQ26W4", url: "http://www.audible.com/pd/B071NQ26W4", title: "Soulblade", author: "Lindsay Buroker", purchased: "12/3/2024" },
        { asin: "B09NQH714M", url: "http://www.audible.com/pd/B09NQH714M", title: "Demon in the Wood", author: "Leigh Bardugo", purchased: "12/3/2024" },
        { asin: "B07DL95FPK", url: "http://www.audible.com/pd/B07DL95FPK", title: "Oaths", author: "Lindsay Buroker", purchased: "12/3/2024" },
        { asin: "B00WKNCP0I", url: "http://www.audible.com/pd/B00WKNCP0I", title: "Dragon Blood - Omnibus", author: "Lindsay Buroker", purchased: "12/3/2024" },
        { asin: "B08QSM8ZD5", url: "http://www.audible.com/pd/B08QSM8ZD5", title: "Students of the Order", author: "Edward W. Robertson, Sam Lang", purchased: "12/2/2024" },
        { asin: "1977335020", url: "http://www.audible.com/pd/1977335020", title: "Full Tilt", author: "Neal Shusterman", purchased: "12/2/2024" },
        { asin: "B0CVQWX66S", url: "http://www.audible.com/pd/B0CVQWX66S", title: "The Shattered Path", author: "Edward W. Robertson", purchased: "12/2/2024" },
        { asin: "B0D828ZG1Y", url: "http://www.audible.com/pd/B0D828ZG1Y", title: "Drumindor", author: "Michael J. Sullivan", purchased: "12/2/2024" },
        { asin: "B0BKR32DG4", url: "http://www.audible.com/pd/B0BKR32DG4", title: "The 13th God", author: "Edward W. Robertson", purchased: "12/2/2024" },
        { asin: "B09ZLN963G", url: "http://www.audible.com/pd/B09ZLN963G", title: "Stephen Leeds: Death & Faxes", author: "Brandon Sanderson, Max Epstein, David Pace, Michael Harkins", purchased: "12/2/2024" },
        { asin: "1982556803", url: "http://www.audible.com/pd/1982556803", title: "Souls of Fire and Steel", author: "Jill Criswell", purchased: "12/2/2024" },
        { asin: "1549187538", url: "http://www.audible.com/pd/1549187538", title: "How the King of Elfhame Learned to Hate Stories", author: "Holly Black, Rovina Cai - illustrator", purchased: "12/2/2024" },
        { asin: "B0D1W1YF7R", url: "http://www.audible.com/pd/B0D1W1YF7R", title: "The Cycle of Galand", author: "Edward W. Robertson", purchased: "12/2/2024" },
        { asin: "B0B3LJ7JWH", url: "http://www.audible.com/pd/B0B3LJ7JWH", title: "The Stolen Heir", author: "Holly Black", purchased: "12/2/2024" },
        { asin: "0062951602", url: "http://www.audible.com/pd/0062951602", title: "King Bullet", author: "Richard Kadrey", purchased: "12/2/2024" },
        { asin: "B00BQZ5JKY", url: "http://www.audible.com/pd/B00BQZ5JKY", title: "Song of the Beast", author: "Carol Berg", purchased: "12/2/2024" },
        { asin: "B00M8U0CJ4", url: "http://www.audible.com/pd/B00M8U0CJ4", title: "The Sense of Style", author: "Steven Pinker", purchased: "12/2/2024" },
        { asin: "B09D1DH6NX", url: "http://www.audible.com/pd/B09D1DH6NX", title: "Monster Hunter Bloodlines", author: "Larry Correia", purchased: "12/2/2024" },
        { asin: "B00PHPT01I", url: "http://www.audible.com/pd/B00PHPT01I", title: "Legion: Skin Deep", author: "Brandon Sanderson", purchased: "12/2/2024" },
        { asin: "B0B29L7HZ8", url: "http://www.audible.com/pd/B0B29L7HZ8", title: "House of Blades", author: "Will Wight", purchased: "12/1/2024" },
        { asin: "B003NX2RFM", url: "http://www.audible.com/pd/B003NX2RFM", title: "At the Gates of Darkness", author: "Raymond E. Feist", purchased: "11/4/2024" },
        { asin: "B00425LNN2", url: "http://www.audible.com/pd/B00425LNN2", title: "Rides a Dread Legion", author: "Raymond E. Feist", purchased: "10/31/2024" },
        { asin: "0062975404", url: "http://www.audible.com/pd/0062975404", title: "Wrath of a Mad God", author: "Raymond E. Feist", purchased: "10/29/2024" },
        { asin: "0062975374", url: "http://www.audible.com/pd/0062975374", title: "Into a Dark Realm", author: "Raymond E. Feist", purchased: "10/28/2024" },
        { asin: "0062975366", url: "http://www.audible.com/pd/0062975366", title: "Flight of the Nighthawks", author: "Raymond E. Feist", purchased: "10/25/2024" },
        { asin: "0062975560", url: "http://www.audible.com/pd/0062975560", title: "Exile's Return", author: "Raymond E. Feist", purchased: "10/24/2024" },
        { asin: "0062975544", url: "http://www.audible.com/pd/0062975544", title: "King of Foxes", author: "Raymond E. Feist", purchased: "10/23/2024" },
        { asin: "0062975307", url: "http://www.audible.com/pd/0062975307", title: "Jimmy the Hand", author: "Raymond E. Feist, S.M. Stirling", purchased: "10/23/2024" },
        { asin: "0062975528", url: "http://www.audible.com/pd/0062975528", title: "Talon of the Silver Hawk", author: "Raymond E. Feist", purchased: "10/21/2024" },
        { asin: "0062975323", url: "http://www.audible.com/pd/0062975323", title: "Murder in LaMut", author: "Joel Rosenberg, Raymond E. Feist", purchased: "10/20/2024" },
        { asin: "006297534X", url: "http://www.audible.com/pd/006297534X", title: "Honored Enemy", author: "Raymond E. Feist, William R. Forstchen", purchased: "10/19/2024" },
        { asin: "0062978845", url: "http://www.audible.com/pd/0062978845", title: "Krondor: Tear of the Gods", author: "Raymond E. Feist", purchased: "10/19/2024" },
        { asin: "0062975498", url: "http://www.audible.com/pd/0062975498", title: "Krondor: The Assassins", author: "Raymond E. Feist", purchased: "10/16/2024" },
        { asin: "0062978810", url: "http://www.audible.com/pd/0062978810", title: "Krondor the Betrayal", author: "Raymond E. Feist", purchased: "10/15/2024" }
    ];

    let doc = fixtureDoc("ledger-page.html");
    let page = new LedgerPage(doc);
    expect(page.entries).toEqual(entries);
  });

  test(".entries errors", () => {
    let page = new LedgerPage();
    let spy = jest.spyOn(global.console, "error");
    global.console.errors = spy.mockImplementation(() => {});

    page.entries;

    expect(spy.mock.calls).toHaveLength(1);
  });
});
