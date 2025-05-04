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

  /**
   * For TSV files, flatten results to a single string per field.
   */
  flatten() {
    for (let [i, record] of Object.entries(this.results)) {
      if (record.series) {
        record.series = record.series
          .map((series) => {
            return series.name + (series.number ? ` #${series.number}` : "");
          })
          .join(", ");
      }

      if (record.authors) {
        record.authors = record.authors.map((a) => a.name).join(", ");
      }
    }
  }

  /**
   * For JSON files, add metadata.
   */
  prepend_metadata(timer) {
    let time = new Date();
    let data = {};

    data.book_count = this.results.length;
    data.downloaded_at = time.toLocaleString();
    data.timestamp = time.getTime();
    data.processing_time = timer.seconds;
    data.books = this.results;

    this.results = data;
  }
};
