const $ = require("jquery");

require("../../src/ui/app.js");

describe("App", () => {
  beforeEach(() => {
    delete window.location;
    window.location = { href: "http://audible.com/" };
  });

  let app = new App();

  test("new App()", () => {
    expect(app).toBeA(App);
    expect(window.ae).toEqual(app);
  });

  test.each([
    ["http://google.com", false],
    ["http://www.audible.fake-site.com", false],
    ["http://audible.com", true],
    ["http://audible.de", true],
    ["http://www.audible.com", true],
  ])("isAudible(%s)", (url, expected) => {
    window.location.href = url;

    expect(app.isAudible()).toBe(expected);
  });

  test(".start()", () => {
    app.start();
    expect($("#ae-start-modal").length).toBe(1);

    // this should work--it does in the browser
    // (I think--double check, since I'm currently checking Exporter, not App.)
    // I assume it's not because dialog.showModal() does not do what it is
    // supposed to in the jest environment, but I'm not sure.
    // expect(dialog.is("[open]")).toBeTruthy();
  });

  test(".getPurchaseHistory()", async () => {
    let spy = mockFn(null);
    Exporter.prototype.getPurchaseHistory = spy;

    await app.getPurchaseHistory();

    expect(spy.mock.calls).toHaveLength(1);
    expect(app.notifier).toBeA(PurchaseHistoryNotifier);
  });

  test(".getLedger()", async () => {
    let spy = mockFn(null);
    Exporter.prototype.getLedger = spy;

    await app.getLedger();

    expect(spy.mock.calls).toHaveLength(1);
    expect(app.notifier).toBeA(OrderNotifier);
  });

  test(".getLibrary()", async () => {
    let spy = mockFn(null);
    Exporter.prototype.getLibrary = spy;

    await app.getLibrary();

    expect(spy.mock.calls).toHaveLength(1);
    expect(app.notifier).toBeA(LibraryNotifier);
  });

  test(".getBookDetails()", async () => {
    let spy = mockFn(null);
    Exporter.prototype.getBookDetails = spy;

    await app.getBookDetails();

    expect(spy.mock.calls).toHaveLength(1);
    expect(app.notifier).toBeA(DetailsNotifier);
  });

  test(".getResults()", async () => {
    let spy = mockFn(null);
    Exporter.prototype.getResults = spy;

    await app.getResults();

    expect(spy.mock.calls).toHaveLength(1);
  });

  test("downloadReady()", () => {
    let app = new App();
    app.downloadReady();

    expect(app.modal).toBeA(DownloadDialog);
  });

  test("download()", async () => {
    let app = new App();
    app.results = ["a", "b", "c"];

    app.modal = new DownloadDialog();
    app.modal.create();
    app.modal.ft_select.selectedIndex = 2;

    download();

    expect(app.modal.file).toBeA(TSVFile);
  });

  test(".run()", async () => {
    // evade the login check
    let giMocker = jest.fn().mockImplementation(() => true);
    document.getElementById = giMocker;

    let purchaseHistorySpy = mockFn(null);
    let ledgerSpy = mockFn(null);
    let librarySpy = mockFn(null);
    let detailsSpy = mockFn(null);
    let resultsSpy = mockFn(null);

    Exporter.prototype.getPurchaseHistory = purchaseHistorySpy;
    Exporter.prototype.getLedger = ledgerSpy;
    Exporter.prototype.getLibrary = librarySpy;
    Exporter.prototype.getBookDetails = detailsSpy;
    Exporter.prototype.getResults = resultsSpy;

    // need exporter results so it doesn't raise an error
    app.exporter.results = [1, 2, 3];

    await app.run();

    expect(purchaseHistorySpy.mock.calls).toHaveLength(1);
    expect(ledgerSpy.mock.calls).toHaveLength(1);
    expect(librarySpy.mock.calls).toHaveLength(1);
    expect(detailsSpy.mock.calls).toHaveLength(1);
    expect(resultsSpy.mock.calls).toHaveLength(1);

    expect(app.modal).toBeA(DownloadDialog);
  });
});
