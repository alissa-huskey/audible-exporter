Exporter = class {

  constructor() {
    this.notifier = new StatusNotifier();
    this.modal = new Modal();
    this.orders = new OrdersFetcher();
    this.library = new LibraryFetcher();
    this.details = new DetailsFetcher();
    this.results = [];
  }
  async getOrders() {
    this.notifier.reset();
    this.notifier.text = "Retrieving purchases...";

    await this.orders.init()
    await this.orders.populate((year, page, page_count, percent) => {
      this.notifier.updateProgress(percent, page);
      this.notifier.text = `Retrieving ${year} purchases: page ${page} of ${page_count}`;
    });
    log_table("purchases", this.orders.items);
    return this.orders.items;
  }

  async getLibrary() {
    this.notifier.reset();
    this.notifier.text = "Retrieving library...";
    await this.library.populate((i, page_count) => {
      let page = i + 1;
      let percent = page/page_count;
      this.notifier.updateProgress(percent, i);
      this.notifier.text = `Retrieving library: page ${page} of ${page_count}`;
    });
    log_table("library", this.library.books);
    return this.library.books;
  }

  async getBookDetails() {
    let library_info, order_info, book_info, info;

    this.notifier.reset();
    this.notifier.text = "Retrieving additional information on titles...";

    this.details.library = this.library.books;
    await this.details.populate((i, total, data) => {
      let percent = i/total;
      let remaining = total - i;

      this.notifier.updateProgress(percent, i);
      this.notifier.text = `
        Retrieving book ${(i+1).toLocaleString()} of ${total.toLocaleString()} (approx ${this.notifier.timeLeft(remaining)} minutes remaining)
      `.trim();
    });

    log_table("details", this.details.books);
  }

  getResults() {
    let library_info, order_info, book_info, info;
    let results = [];

    for (library_info of this.library.books) {
      book_info = this.details.books[library_info.id];
      order_info = this.orders.items[library_info.id];
      info = cleanObject({...library_info, ...book_info, ...order_info});
      results.push(info);
    }

    log_table("Your audible data", results);

    this.results = results;
    return results;
  }

  download(books) {
    let file = new TSVFile(books);
    this.modal.file = [file.url, file.filename];
    this.notifier.delete();
    this.modal.show()
  }

  async run() {
    try {
      let before = new Date().getTime();

      this.modal.create();
      this.notifier.create();
      this.notifier.text = "Initiating download...";

      await this.getOrders();
      await this.getLibrary();
      await this.getBookDetails();
      this.getResults();

      if (!books) {
        error("Failed to download books.")
        this.notifier.reset();
        this.notifier.text = "Failed."
        return;
      }

      let after = new Date().getTime();
      let elapsed = (after - before) / 1000 / 60;

      info(`Done. (${books.length} books, ${elapsed.toFixed(2)} minutes)`);

      this.notifier.percent = 1;
      this.notifier.text = "Done."

      this.download(this.books);

    } catch (err) {
      error("Fatal error:", err, err.name, err.message);
    }
  }
}
