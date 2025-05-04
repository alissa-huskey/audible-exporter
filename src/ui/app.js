/**
 * User interface.
 */

require("../util.js");
require("../timer.js");

require("./domain.js");
require("./error-dialog.js");
require("./start-dialog.js");
require("./download-dialog.js");
require("./purchase-history-notifier.js");
require("./order-notifier.js");
require("./library-notifier.js");
require("./details-notifier.js");

require("../etl/exporter.js");

require("../json-file.js");
require("../tsv-file.js");

/**
 * Event listener to create the export file and start the download.
 */
download = () => {
  let app = window.ae;
  let modal = app.modal;
  if (!modal.filetype) return;
  let klass = app.formats[modal.filetype];

  if (klass == TSVFile) {
    app.exporter.flatten();
  }

  let file = new klass(app.exporter.results);
  modal.file = file;
  modal.hide();
};

/**
 * App class.
 */
App = class {
  formats = { json: JSONFile, tsv: TSVFile };

  constructor(limit = null) {
    this.limit = limit;
    this.timer = new Timer();
    this.notifier = new Notifier();
    this.exporter = new Exporter(limit);

    window.ae = this;

    this.style = new Style();
    this.style.create();
  }

  start() {
    this.modal = new StartDialog();
    this.modal.create();
  }

  isAudible() {
    let domain = Domain.fromURL(window.location.href);
    return domain.name == "audible" && domain.subdomain != "help";
  }

  isLoggedIn() {
    let res = Doc.gi("navigation-sign-out-link");
    return !!res.element;
  }

  showError(target, ...sentences) {
    let modal = new ErrorDialog(sentences);

    modal.content.method = "get";
    modal.content.action = target;
    modal.copy.append(modal.actions);
    modal.actions.append(modal.button("Go", {}, { autofocus: true }));
    modal.create();
    return modal;
  }

  async getPurchaseHistory() {
    let timer = new Timer(null, null, "getPurchaseHistory");
    timer.start();

    this.notifier.remove();
    this.notifier = new PurchaseHistoryNotifier();
    this.notifier.create();

    await this.exporter.getPurchaseHistory();

    await delay(1000);
    timer.stop();

    info(
      `getPurchaseHistory() took ${timer.minutes} minutes (${timer.seconds} seconds).`,
    );
  }

  async getLedger() {
    let timer = new Timer();
    timer.start();

    this.notifier.remove();
    this.notifier = new OrderNotifier(
      this.exporter.ledger.pages.length,
      this.exporter.ledger.years,
    );
    this.notifier.create();

    await this.exporter.getLedger();

    log_table("purchases", this.exporter.ledger.entries);

    await delay(1000);

    timer.stop();
    info(
      `getLedger() took ${timer.minutes} minutes (${timer.seconds} seconds).`,
    );
    return this.exporter.ledger.entries;
  }

  async getLibrary() {
    let timer = new Timer();
    timer.start();

    this.notifier.remove();
    this.notifier = new LibraryNotifier();
    this.notifier.create();
    await this.exporter.getLibrary();

    log_table("library", this.exporter.library.books);

    await delay(1000);
    timer.stop();
    info(
      `getLibrary() took ${timer.minutes} minutes (${timer.seconds} seconds).`,
    );
  }

  async getBookDetails() {
    let timer = new Timer();
    timer.start();

    this.notifier.remove();
    this.notifier = new DetailsNotifier();
    this.notifier.create();

    this.exporter.details.library = this.exporter.library.books;
    await this.exporter.getBookDetails();

    log_table("details", this.exporter.details.books);
    await delay(1500);
    timer.stop();
    info(
      `getBookDetails() took ${timer.minutes} minutes (${timer.seconds} seconds).`,
    );
  }

  getResults() {
    let results = this.exporter.getResults();
    log_table("Your audible data", results);

    this.results = results;
    return results;
  }

  /**
   * Display the download modal.
   */
  downloadReady() {
    this.notifier.remove();
    this.modal = new DownloadDialog();
    this.modal.create();
    this.modal.dl_btn.element.addEventListener("click", download);
    this.modal.show();
    return this.modal;
  }

  async run() {
    if (!this.isAudible()) {
      this.showError(
        "//audible.com",
        "Sorry, you must be on the audible website to continue.",
        "Go there and try again.",
      );
      return;
    }

    if (!this.isLoggedIn()) {
      this.showError(
        "//audible.com/signin",
        "Sorry, you must be on the logged into audible to continue.",
        "Please log in and try again.",
      );
      return;
    }

    try {
      this.timer.start();
      info(`Started at ${this.timer.started_at.toLocaleTimeString()}`);

      this.notifier.create();

      await this.getPurchaseHistory();
      await this.getLedger();
      await this.getLibrary();
      await this.getBookDetails();
      this.getResults();

      if (!this.exporter.results || this.exporter.results.length == 0) {
        error("Failed to download books.");
        return;
      }

      this.timer.stop();

      info(
        `Finished at ${this.timer.stopped_at.toLocaleTimeString()} (${this.results.length} results, ${this.timer.minutes} minutes)`,
      );

      this.downloadReady();
    } catch (err) {
      error("Fatal error:", err, err.name, err.message);
    }
  }
};
