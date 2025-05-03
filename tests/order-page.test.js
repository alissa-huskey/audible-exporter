/**
 * @jest-environment jsdom
 */

require("../src/dev.js");
require("../src/order-page.js");

describe("OrderPage", () => {
  let doc = fixtureDoc("order-page.html");
  let page = new OrderPage(doc);

  test("new OrderPage(year, page)", async () => {
    OrderPage.prototype.fetchDoc = mockFetchDoc("order-page-2025-1-of-1.html");
    let page = new OrderPage(2025, 1);
    await page.get();

    expect(OrderPage.prototype.fetchDoc).toHaveBeenCalledWith(
      `${page.base_url}&df=2025&pn=1&ps=40`,
    );
    expect(page).toBeA(OrderPage);
    expect(page.year).toBe(2025);
    expect(page.page_num).toBe(1);
    expect(page.per_page).toBe(40);
    expect(page.doc).toBeA(Doc);
    expect(page.doc.title).toBe("Purchase History | Audible.com");
  });

  test("new OrderPage(date_range_string, page)", async () => {
    OrderPage.prototype.fetchDoc = mockFetchDoc("order-page.html");
    let page = new OrderPage("last_90_days", 1, 20);

    expect(page.year).toBe("last_90_days");
    expect(page.page_num).toBe(1);
    expect(page.per_page).toBe(20);
  });

  test("new OrderPage(year, page, per_page)", async () => {
    OrderPage.prototype.fetchDoc = mockFetchDoc("order-page.html");
    let page = new OrderPage(2025, 1, 20);

    expect(page).toBeA(OrderPage);
    expect(page.year).toBe(2025);
    expect(page.page_num).toBe(1);
    expect(page.per_page).toBe(20);
  });

  test("new OrderPage(doc)", () => {
    let page = new OrderPage(doc);
    expect(page.year).toBe(2025);
    expect(page.page_num).toBe(1);
    expect(page).toBeA(OrderPage);
    expect(page.doc).toBeA(Doc);
  });

  test(".get()", async () => {
    OrderPage.prototype.fetchDoc = mockFetchDoc("order-page.html");

    let page = new OrderPage("last_90_days", 1, 20);
    let element = await page.get();

    expect(OrderPage.prototype.fetchDoc).toHaveBeenCalledWith(
      `${page.base_url}&df=last_90_days&pn=1&ps=20`,
    );
    expect(element.title).toBe("Purchase History | Audible.com");
  });

  test(".page_count", () => {
    let page = new OrderPage(fixtureDoc("order-page-2024-1-of-2.html"));
    expect(page.page_count).toBe(2);
  });

  test(".years", () => {
    let years = ["2025", "2024", "2023"];

    page = new OrderPage(fixtureDoc("order-page-2025-1-of-1.html"));
    expect(page.years).toEqual(years);
  });

  test(".orders", () => {
    // prettier-ignore
    let orders = {
      "D01-7379715-3760239": { id: "D01-7379715-3760239", date: "1/21/2025", total: "1 Credit" },
      "D01-4905288-1517028": { id: "D01-4905288-1517028", date: "12/3/2024", total: "$77.30" },
      "D01-0506818-5008215": { id: "D01-0506818-5008215", date: "12/2/2024", total: "$95.67" },
      "D01-9703333-4870646": { id: "D01-9703333-4870646", date: "12/1/2024", total: "1 Credit" },
      "D01-1162658-5907410": { id: "D01-1162658-5907410", date: "11/4/2024", total: "1 Credit" },
      "D01-7262808-8163417": { id: "D01-7262808-8163417", date: "10/31/2024", total: "1 Credit" },
      "D01-5796677-8291425": { id: "D01-5796677-8291425", date: "10/29/2024", total: "1 Credit" },
      "D01-7247673-4073843": { id: "D01-7247673-4073843", date: "10/28/2024", total: "1 Credit" },
      "D01-2388300-9366627": { id: "D01-2388300-9366627", date: "10/28/2024", total: "$60.92" },
      "D01-4899140-6464226": { id: "D01-4899140-6464226", date: "10/25/2024", total: "1 Credit" },
      "D01-8770138-4333054": { id: "D01-8770138-4333054", date: "10/24/2024", total: "1 Credit" },
      "D01-6124148-0992254": { id: "D01-6124148-0992254", date: "10/23/2024", total: "1 Credit" },
      "D01-7466506-3280229": { id: "D01-7466506-3280229", date: "10/23/2024", total: "1 Credit" },
      "D01-5982790-0067405": { id: "D01-5982790-0067405", date: "10/21/2024", total: "1 Credit" },
      "D01-6834207-4877038": { id: "D01-6834207-4877038", date: "10/21/2024", total: "$59.99" },
      "D01-1471084-4086621": { id: "D01-1471084-4086621", date: "10/20/2024", total: "1 Credit" },
      "D01-6352719-4022627": { id: "D01-6352719-4022627", date: "10/19/2024", total: "1 Credit" },
      "D01-1087744-2694668": { id: "D01-1087744-2694668", date: "10/19/2024", total: "1 Credit" },
      "D01-0625368-9699437": { id: "D01-0625368-9699437", date: "10/16/2024", total: "1 Credit" },
      "D01-7076604-3849823": { id: "D01-7076604-3849823", date: "10/15/2024", total: "1 Credit" },
    };

    let page = new OrderPage(fixtureDoc("order-page.html"));
    expect(page.orders).toEqual(orders);
  });

  test(".purchases", () => {
    let page = new OrderPage(fixtureDoc("order-page.html"));
    // prettier-ignore
    let purchases = [
        { id: "B0CQ3759C3", order_id: "D01-7379715-3760239", amount: "1 Credit", credits: "1.0", title: "Wind and Truth", author: "Brandon Sanderson" },
        { id: "B0BG96TCVH", order_id: "D01-4905288-1517028", amount: "$11.85", credits: "0.0", title: "Demons of Good and Evil", author: "Kim Harrison" },
        { id: "1713569264", order_id: "D01-4905288-1517028", amount: "$2.83", credits: "0.0", title: "The Queen", author: "Jennifer L. Armentrout" },
        { id: "B07C63PS2B", order_id: "D01-4905288-1517028", amount: "$9.55", credits: "0.0", title: "Belle and the Pirate: An Adult Fairytale Romance", author: "Vivienne Savage" },
        { id: "B0CTNT9XWX", order_id: "D01-4905288-1517028", amount: "$11.85", credits: "0.0", title: "Demon's Bluff", author: "Kim Harrison" },
        { id: "B01MZG3QE8", order_id: "D01-4905288-1517028", amount: "$4.80", credits: "0.0", title: "Raptor", author: "Lindsay Buroker" },
        { id: "B0BXY5Z6FB", order_id: "D01-4905288-1517028", amount: "$3.54", credits: "0.0", title: "A Soul of Ash and Blood", author: "Jennifer L. Armentrout" },
        { id: "B01HDYBVN0", order_id: "D01-4905288-1517028", amount: "$4.45", credits: "0.0", title: "The Blade's Memory", author: "Lindsay Buroker" },
        { id: "1250819148", order_id: "D01-4905288-1517028", amount: "$3.95", credits: "0.0", title: "The Lives of Saints", author: "Leigh Bardugo" },
        { id: "B01AMIGU3K", order_id: "D01-4905288-1517028", amount: "$4.24", credits: "0.0", title: "Patterns in the Dark", author: "Lindsay Buroker" },
        { id: "B071NQ26W4", order_id: "D01-4905288-1517028", amount: "$4.95", credits: "0.0", title: "Soulblade", author: "Lindsay Buroker" },
        { id: "B09NQH714M", order_id: "D01-4905288-1517028", amount: "$5.39", credits: "0.0", title: "Demon in the Wood", author: "Leigh Bardugo" },
        { id: "B07DL95FPK", order_id: "D01-4905288-1517028", amount: "$4.24", credits: "0.0", title: "Oaths", author: "Lindsay Buroker" },
        { id: "B00WKNCP0I", order_id: "D01-4905288-1517028", amount: "$5.66", credits: "0.0", title: "Dragon Blood - Omnibus", author: "Lindsay Buroker" },
        { id: "B08QSM8ZD5", order_id: "D01-0506818-5008215", amount: "$4.94", credits: "0.0", title: "Students of the Order", author: "Edward W. Robertson, Sam Lang" },
        { id: "1977335020", order_id: "D01-0506818-5008215", amount: "$1.95", credits: "0.0", title: "Full Tilt", author: "Neal Shusterman" },
        { id: "B0CVQWX66S", order_id: "D01-0506818-5008215", amount: "$7.06", credits: "0.0", title: "The Shattered Path", author: "Edward W. Robertson" },
        { id: "B0D828ZG1Y", order_id: "D01-0506818-5008215", amount: "$5.38", credits: "0.0", title: "Drumindor", author: "Michael J. Sullivan" },
        { id: "B0BKR32DG4", order_id: "D01-0506818-5008215", amount: "$7.07", credits: "0.0", title: "The 13th God", author: "Edward W. Robertson" },
        { id: "B09ZLN963G", order_id: "D01-0506818-5008215", amount: "$1.95", credits: "0.0", title: "Stephen Leeds: Death & Faxes", author: "Brandon Sanderson, Max Epstein, David Pace, Michael Harkins" },
        { id: "1982556803", order_id: "D01-0506818-5008215", amount: "$2.26", credits: "0.0", title: "Souls of Fire and Steel", author: "Jill Criswell" },
        { id: "1549187538", order_id: "D01-0506818-5008215", amount: "$5.59", credits: "0.0", title: "How the King of Elfhame Learned to Hate Stories", author: "Holly Black, Rovina Cai - illustrator" },
        { id: "B0D1W1YF7R", order_id: "D01-0506818-5008215", amount: "$8.49", credits: "0.0", title: "The Cycle of Galand", author: "Edward W. Robertson" },
        { id: "B0B3LJ7JWH", order_id: "D01-0506818-5008215", amount: "$10.46", credits: "0.0", title: "The Stolen Heir", author: "Holly Black" },
        { id: "0062951602", order_id: "D01-0506818-5008215", amount: "$10.34", credits: "0.0", title: "King Bullet", author: "Richard Kadrey" },
        { id: "B00BQZ5JKY", order_id: "D01-0506818-5008215", amount: "$11.95", credits: "0.0", title: "Song of the Beast", author: "Carol Berg" },
        { id: "B00M8U0CJ4", order_id: "D01-0506818-5008215", amount: "$7.54", credits: "0.0", title: "The Sense of Style", author: "Steven Pinker" },
        { id: "B09D1DH6NX", order_id: "D01-0506818-5008215", amount: "$3.53", credits: "0.0", title: "Monster Hunter Bloodlines", author: "Larry Correia" },
        { id: "B00PHPT01I", order_id: "D01-0506818-5008215", amount: "$7.16", credits: "0.0", title: "Legion: Skin Deep", author: "Brandon Sanderson" },
        { id: "B0B29L7HZ8", order_id: "D01-9703333-4870646", amount: "1 Credit", credits: "1.0", title: "House of Blades", author: "Will Wight" },
        { id: "B003NX2RFM", order_id: "D01-1162658-5907410", amount: "1 Credit", credits: "1.0", title: "At the Gates of Darkness", author: "Raymond E. Feist" },
        { id: "B00425LNN2", order_id: "D01-7262808-8163417", amount: "1 Credit", credits: "1.0", title: "Rides a Dread Legion", author: "Raymond E. Feist" },
        { id: "0062975404", order_id: "D01-5796677-8291425", amount: "1 Credit", credits: "1.0", title: "Wrath of a Mad God", author: "Raymond E. Feist" },
        { id: "0062975374", order_id: "D01-7247673-4073843", amount: "1 Credit", credits: "1.0", title: "Into a Dark Realm", author: "Raymond E. Feist" },
        { id: "B0CK3QX5VL", order_id: "D01-2388300-9366627", amount: "$60.92", credits: "0.0", title: "Premium Plus Plan Extra 5 Credits", author: "" },
        { id: "0062975366", order_id: "D01-4899140-6464226", amount: "1 Credit", credits: "1.0", title: "Flight of the Nighthawks", author: "Raymond E. Feist" },
        { id: "0062975560", order_id: "D01-8770138-4333054", amount: "1 Credit", credits: "1.0", title: "Exile's Return", author: "Raymond E. Feist" },
        { id: "0062975544", order_id: "D01-6124148-0992254", amount: "1 Credit", credits: "1.0", title: "King of Foxes", author: "Raymond E. Feist" },
        { id: "0062975307", order_id: "D01-7466506-3280229", amount: "1 Credit", credits: "1.0", title: "Jimmy the Hand", author: "Raymond E. Feist, S.M. Stirling" },
        { id: "0062975528", order_id: "D01-5982790-0067405", amount: "1 Credit", credits: "1.0", title: "Talon of the Silver Hawk", author: "Raymond E. Feist" },
        { id: "B0C29VRJTJ", order_id: "D01-6834207-4877038", amount: "$59.99", credits: "0.0", title: "U.S. - 5 Credit Bundle", author: "" },
        { id: "0062975323", order_id: "D01-1471084-4086621", amount: "1 Credit", credits: "1.0", title: "Murder in LaMut", author: "Joel Rosenberg, Raymond E. Feist" },
        { id: "006297534X", order_id: "D01-6352719-4022627", amount: "1 Credit", credits: "1.0", title: "Honored Enemy", author: "Raymond E. Feist, William R. Forstchen" },
        { id: "0062978845", order_id: "D01-1087744-2694668", amount: "1 Credit", credits: "1.0", title: "Krondor: Tear of the Gods", author: "Raymond E. Feist" },
        { id: "0062975498", order_id: "D01-0625368-9699437", amount: "1 Credit", credits: "1.0", title: "Krondor: The Assassins", author: "Raymond E. Feist" },
        { id: "0062978810", order_id: "D01-7076604-3849823", amount: "1 Credit", credits: "1.0", title: "Krondor the Betrayal", author: "Raymond E. Feist" }
    ];

    expect(page.purchases).toEqual(purchases);
  });

  test(".items", () => {
    // prettier-ignore
    let items = [
        { id: "B0CQ3759C3", url: "http://www.audible.com/pd/B0CQ3759C3", title: "Wind and Truth", author: "Brandon Sanderson", purchase_date: "1/21/2025" },
        { id: "B0BG96TCVH", url: "http://www.audible.com/pd/B0BG96TCVH", title: "Demons of Good and Evil", author: "Kim Harrison", purchase_date: "12/3/2024" },
        { id: "1713569264", url: "http://www.audible.com/pd/1713569264", title: "The Queen", author: "Jennifer L. Armentrout", purchase_date: "12/3/2024" },
        { id: "B07C63PS2B", url: "http://www.audible.com/pd/B07C63PS2B", title: "Belle and the Pirate: An Adult Fairytale Romance", author: "Vivienne Savage", purchase_date: "12/3/2024" },
        { id: "B0CTNT9XWX", url: "http://www.audible.com/pd/B0CTNT9XWX", title: "Demon's Bluff", author: "Kim Harrison", purchase_date: "12/3/2024" },
        { id: "B01MZG3QE8", url: "http://www.audible.com/pd/B01MZG3QE8", title: "Raptor", author: "Lindsay Buroker", purchase_date: "12/3/2024" },
        { id: "B0BXY5Z6FB", url: "http://www.audible.com/pd/B0BXY5Z6FB", title: "A Soul of Ash and Blood", author: "Jennifer L. Armentrout", purchase_date: "12/3/2024" },
        { id: "B01HDYBVN0", url: "http://www.audible.com/pd/B01HDYBVN0", title: "The Blade's Memory", author: "Lindsay Buroker", purchase_date: "12/3/2024" },
        { id: "1250819148", url: "http://www.audible.com/pd/1250819148", title: "The Lives of Saints", author: "Leigh Bardugo", purchase_date: "12/3/2024" },
        { id: "B01AMIGU3K", url: "http://www.audible.com/pd/B01AMIGU3K", title: "Patterns in the Dark", author: "Lindsay Buroker", purchase_date: "12/3/2024" },
        { id: "B071NQ26W4", url: "http://www.audible.com/pd/B071NQ26W4", title: "Soulblade", author: "Lindsay Buroker", purchase_date: "12/3/2024" },
        { id: "B09NQH714M", url: "http://www.audible.com/pd/B09NQH714M", title: "Demon in the Wood", author: "Leigh Bardugo", purchase_date: "12/3/2024" },
        { id: "B07DL95FPK", url: "http://www.audible.com/pd/B07DL95FPK", title: "Oaths", author: "Lindsay Buroker", purchase_date: "12/3/2024" },
        { id: "B00WKNCP0I", url: "http://www.audible.com/pd/B00WKNCP0I", title: "Dragon Blood - Omnibus", author: "Lindsay Buroker", purchase_date: "12/3/2024" },
        { id: "B08QSM8ZD5", url: "http://www.audible.com/pd/B08QSM8ZD5", title: "Students of the Order", author: "Edward W. Robertson, Sam Lang", purchase_date: "12/2/2024" },
        { id: "1977335020", url: "http://www.audible.com/pd/1977335020", title: "Full Tilt", author: "Neal Shusterman", purchase_date: "12/2/2024" },
        { id: "B0CVQWX66S", url: "http://www.audible.com/pd/B0CVQWX66S", title: "The Shattered Path", author: "Edward W. Robertson", purchase_date: "12/2/2024" },
        { id: "B0D828ZG1Y", url: "http://www.audible.com/pd/B0D828ZG1Y", title: "Drumindor", author: "Michael J. Sullivan", purchase_date: "12/2/2024" },
        { id: "B0BKR32DG4", url: "http://www.audible.com/pd/B0BKR32DG4", title: "The 13th God", author: "Edward W. Robertson", purchase_date: "12/2/2024" },
        { id: "B09ZLN963G", url: "http://www.audible.com/pd/B09ZLN963G", title: "Stephen Leeds: Death & Faxes", author: "Brandon Sanderson, Max Epstein, David Pace, Michael Harkins", purchase_date: "12/2/2024" },
        { id: "1982556803", url: "http://www.audible.com/pd/1982556803", title: "Souls of Fire and Steel", author: "Jill Criswell", purchase_date: "12/2/2024" },
        { id: "1549187538", url: "http://www.audible.com/pd/1549187538", title: "How the King of Elfhame Learned to Hate Stories", author: "Holly Black, Rovina Cai - illustrator", purchase_date: "12/2/2024" },
        { id: "B0D1W1YF7R", url: "http://www.audible.com/pd/B0D1W1YF7R", title: "The Cycle of Galand", author: "Edward W. Robertson", purchase_date: "12/2/2024" },
        { id: "B0B3LJ7JWH", url: "http://www.audible.com/pd/B0B3LJ7JWH", title: "The Stolen Heir", author: "Holly Black", purchase_date: "12/2/2024" },
        { id: "0062951602", url: "http://www.audible.com/pd/0062951602", title: "King Bullet", author: "Richard Kadrey", purchase_date: "12/2/2024" },
        { id: "B00BQZ5JKY", url: "http://www.audible.com/pd/B00BQZ5JKY", title: "Song of the Beast", author: "Carol Berg", purchase_date: "12/2/2024" },
        { id: "B00M8U0CJ4", url: "http://www.audible.com/pd/B00M8U0CJ4", title: "The Sense of Style", author: "Steven Pinker", purchase_date: "12/2/2024" },
        { id: "B09D1DH6NX", url: "http://www.audible.com/pd/B09D1DH6NX", title: "Monster Hunter Bloodlines", author: "Larry Correia", purchase_date: "12/2/2024" },
        { id: "B00PHPT01I", url: "http://www.audible.com/pd/B00PHPT01I", title: "Legion: Skin Deep", author: "Brandon Sanderson", purchase_date: "12/2/2024" },
        { id: "B0B29L7HZ8", url: "http://www.audible.com/pd/B0B29L7HZ8", title: "House of Blades", author: "Will Wight", purchase_date: "12/1/2024" },
        { id: "B003NX2RFM", url: "http://www.audible.com/pd/B003NX2RFM", title: "At the Gates of Darkness", author: "Raymond E. Feist", purchase_date: "11/4/2024" },
        { id: "B00425LNN2", url: "http://www.audible.com/pd/B00425LNN2", title: "Rides a Dread Legion", author: "Raymond E. Feist", purchase_date: "10/31/2024" },
        { id: "0062975404", url: "http://www.audible.com/pd/0062975404", title: "Wrath of a Mad God", author: "Raymond E. Feist", purchase_date: "10/29/2024" },
        { id: "0062975374", url: "http://www.audible.com/pd/0062975374", title: "Into a Dark Realm", author: "Raymond E. Feist", purchase_date: "10/28/2024" },
        { id: "0062975366", url: "http://www.audible.com/pd/0062975366", title: "Flight of the Nighthawks", author: "Raymond E. Feist", purchase_date: "10/25/2024" },
        { id: "0062975560", url: "http://www.audible.com/pd/0062975560", title: "Exile's Return", author: "Raymond E. Feist", purchase_date: "10/24/2024" },
        { id: "0062975544", url: "http://www.audible.com/pd/0062975544", title: "King of Foxes", author: "Raymond E. Feist", purchase_date: "10/23/2024" },
        { id: "0062975307", url: "http://www.audible.com/pd/0062975307", title: "Jimmy the Hand", author: "Raymond E. Feist, S.M. Stirling", purchase_date: "10/23/2024" },
        { id: "0062975528", url: "http://www.audible.com/pd/0062975528", title: "Talon of the Silver Hawk", author: "Raymond E. Feist", purchase_date: "10/21/2024" },
        { id: "0062975323", url: "http://www.audible.com/pd/0062975323", title: "Murder in LaMut", author: "Joel Rosenberg, Raymond E. Feist", purchase_date: "10/20/2024" },
        { id: "006297534X", url: "http://www.audible.com/pd/006297534X", title: "Honored Enemy", author: "Raymond E. Feist, William R. Forstchen", purchase_date: "10/19/2024" },
        { id: "0062978845", url: "http://www.audible.com/pd/0062978845", title: "Krondor: Tear of the Gods", author: "Raymond E. Feist", purchase_date: "10/19/2024" },
        { id: "0062975498", url: "http://www.audible.com/pd/0062975498", title: "Krondor: The Assassins", author: "Raymond E. Feist", purchase_date: "10/16/2024" },
        { id: "0062978810", url: "http://www.audible.com/pd/0062978810", title: "Krondor the Betrayal", author: "Raymond E. Feist", purchase_date: "10/15/2024" }
    ];

    let doc = fixtureDoc("order-page.html");
    let page = new OrderPage(doc);
    expect(page.items).toEqual(items);
  });

  test(".items errors", () => {
    let page = new OrderPage();
    let spy = jest.spyOn(global.console, "error");
    global.console.errors = spy.mockImplementation(() => {});

    page.items;

    expect(spy.mock.calls).toHaveLength(1);
  });
});
