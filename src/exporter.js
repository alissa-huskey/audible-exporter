require("./util.js");
require("./timer.js");
require("./domain.js");
require("./library-fetcher.js");
require("./details-fetcher.js");
require("./orders-fetcher.js");
require("./error-dialog.js");
require("./start-dialog.js");
require("./download-dialog.js");
require("./purchase-history-notifier.js");
require("./order-notifier.js");
require("./library-notifier.js");
require("./details-notifier.js");
require("./json-file.js");
require("./tsv-file.js");
require("./result.js");

/**
 * Event listener to create the export file and start the download.
 */
download = () => {
  let exporter = window.ae;
  let modal = exporter.modal;
  if (!modal.filetype) return;
  let klass = exporter.formats[modal.filetype];
  let file = new klass(exporter.results);
  modal.file = file;
  modal.hide();
};

/**
 * Exporter class.
 */
Exporter = class {
  formats = { json: JSONFile, tsv: TSVFile };

  constructor(limit = null) {
    this.limit = limit;
    this.timer = new Timer();
    this.notifier = new Notifier();
    this.orders = new OrdersFetcher();
    this.library = new LibraryFetcher();
    this.details = new DetailsFetcher();
    this.results = [];

    window.ae = this;

    this.style = new Style();
    this.style.create();
  }

  start() {
    this.modal = new StartDialog();
    this.modal.create();
    return this.modal;
  }

  isAudible() {
    let domain = Domain.fromURL(window.location.href);
    return domain.name == "audible";
  }

  showError(...sentences) {
    let modal = new ErrorDialog([
      "Sorry, you must be on the audible website to continue.",
      "Go there and try again.",
    ]);

    modal.content.method = "get";
    modal.content.action = "//audible.com";
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

    await this.orders.init(this.limit);

    await delay(1000);
    timer.stop();

    info(
      `getPurchaseHistory() took ${timer.minutes} minutes (${timer.seconds} seconds).`,
    );
  }

  async getOrders() {
    let timer = new Timer();
    timer.start();

    this.notifier.remove();
    this.notifier = new OrderNotifier(
      this.orders.pages.length,
      this.orders.years,
    );
    this.notifier.create();

    await this.orders.populate(this.limit);

    log_table("purchases", this.orders.items);

    await delay(1000);

    timer.stop();
    info(
      `getOrders() took ${timer.minutes} minutes (${timer.seconds} seconds).`,
    );
    return this.orders.items;
  }

  async getLibrary() {
    let timer = new Timer();
    timer.start();

    this.notifier.remove();
    this.notifier = new LibraryNotifier();
    this.notifier.create();
    await this.library.populate(this.limit);

    log_table("library", this.library.books);

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

    this.details.library = this.library.books;
    await this.details.populate();

    log_table("details", this.details.books);
    await delay(1500);
    timer.stop();
    info(
      `getBookDetails() took ${timer.minutes} minutes (${timer.seconds} seconds).`,
    );
  }

  getResults() {
    let library_info, order_info, book_info, info;
    let results = [];

    for (library_info of this.library.books) {
      book_info = this.details.books[library_info.id];
      order_info = this.orders.items[library_info.id];
      let result = new Result(library_info, book_info, order_info);
      results.push(result.data());
    }

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
        "Sorry, you must be on the audible website to continue.",
        "Go there and try again.",
      );
      return;
    }

    try {
      this.timer.start();
      info(`Started at ${this.timer.started_at.toLocaleTimeString()}`);

      this.notifier.create();

      await this.getPurchaseHistory();
      await this.getOrders();
      await this.getLibrary();
      await this.getBookDetails();
      this.getResults();

      if (!this.results || this.results.length == 0) {
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
