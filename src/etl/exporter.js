/**
 * Module that handles extracting and organizing the data.
 */

require("../util.js");
require("../timer.js");

require("./library-fetcher.js");
require("./details-fetcher.js");
require("./ledger-fetcher.js");
require("./result.js");

/**
 * Exporter class.
 */
Exporter = class {
  constructor(limit = null) {
    this.limit = limit;
    this.timer = new Timer();

    this.ledger = new LedgerFetcher();
    this.library = new LibraryFetcher();
    this.details = new DetailsFetcher();
    this.results = [];
  }

  async getPurchaseHistory() {
    await this.ledger.init(this.limit);
  }

  async getLedger() {
    await this.ledger.populate(this.limit);
  }

  async getLibrary() {
    await this.library.populate(this.limit);
  }

  async getBookDetails() {
    this.details.library = this.library.books;
    await this.details.populate();
  }

  getResults() {
    let library_info, order_info, book_info, info;
    let results = [];

    for (library_info of this.library.books) {
      book_info = this.details.books[library_info.asin];
      order_info = this.ledger.entries[library_info.asin];
      let result = new Result(library_info, book_info, order_info);
      results.push(result.data());
    }

    this.results = results;
    return results;
  }
};
