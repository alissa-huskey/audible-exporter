Exporter = class {

  notifier = new StatusNotifier();
  modal = new Modal();
  library = new LibraryFetcher();
  orders = new OrdersFetcher();

  timeLeft(remaining) {
    let per_book = 1.9;

    return Math.round((remaining * per_book) / 60);
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

  async getBookDetails(orders, library) {
    let library_info, order_info, book_info, info;
    let results = [];

    let total_results = library.length;

    this.notifier.reset();
    this.notifier.text = "Retrieving additional information on titles...";

    let fetcher = new DetailsFetcher(library);
    await fetcher.populate((i, total, data) => {
      let percent = i/total;
      let remaining = total - i;

      this.notifier.updateProgress(percent, i);
      this.notifier.text = `
        Retrieving book ${(i+1).toLocaleString()} of ${total.toLocaleString()} (approx ${this.timeLeft(remaining)} minutes remaining)
      `.trim();
    });

    log_table("details", fetcher.books);

    for (library_info of library) {
      book_info = fetcher.books[library_info.id],
      order_info = orders.filter((i) => i.url == r.url) || {};
      info = cleanObject({...library_info, ...book_info, order_info});
      results.push(info);
    }
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

      let orders = await this.getOrders();
      let library = await this.getLibrary();
      let books = await this.getBookDetails(orders, library);

      if (!books) {
        error("Failed to download books.")
        this.notifier.reset();
        this.notifier.text = "Failed."
        return;
      }

      let after = new Date().getTime();
      let elapsed = (after - before) / 1000 / 60;

      info(`Done. (${books.length} books, ${elapsed.toFixed(2)} minutes)`);
      log_table("Your audible data", books);

      this.notifier.percent = 1;
      this.notifier.text = "Done."

      this.download(books);

    } catch (err) {
      error("Fatal error:", err, err.name, err.message);
    }
  }
}
