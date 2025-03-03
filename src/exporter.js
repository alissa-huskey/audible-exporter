/**
 * exporter.js
 * ************************************************************************************
 */

Exporter = class {

  constructor(limit=null) {
    this.limit = limit;
    this.timer = new Timer();
    this.notifier = new StatusNotifier();
    this.modal = new Modal();
    this.orders = new OrdersFetcher();
    this.library = new LibraryFetcher();
    this.details = new DetailsFetcher();
    this.results = [];
  }

  async getOrders() {
    this.notifier.remove();
    this.notifier = new OrderNotifier();
    this.notifier.create();

    await this.orders.init()
    this.notifier.years = [...this.orders.years];

    await this.orders.populate(this.limit);

    log_table("purchases", this.orders.items);

    await delay(1000);

    return this.orders.items;
  }

  async getLibrary() {
    this.notifier.remove();
    this.notifier = new LibraryNotifier();
    this.notifier.create();
    await this.library.populate(this.limit);

    log_table("library", this.library.books);
    await delay(1000);
  }

  async getBookDetails() {
    this.notifier.remove();
    this.notifier = new DetailsNotifier();
    this.notifier.create();

    let library_info, order_info, book_info, info;

    this.details.library = this.library.books;
    await this.details.populate();

    log_table("details", this.details.books);
    await delay(1500);
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

  download(books) {
    this.notifier.remove();
    let file = new TSVFile(books);
    this.modal.file = [file.url, file.filename];
    this.modal.show()
  }

  async run(limit=null) {
    try {
      this.timer.start();
      this.limit = limit;

      this.notifier.create();
      this.modal.create();

      await this.getOrders();
      await this.getLibrary();
      await this.getBookDetails();
      this.getResults();

      if (!this.results || this.results.length == 0) {
        error("Failed to download books.")
        return;
      }

      this.timer.stop();

      info(`Done. (${this.results.length} results, ${this.timer.minutes} minutes)`);

      this.download(this.results);

    } catch (err) {
      error("Fatal error:", err, err.name, err.message);
    }
  }
}
