/**
 * Fetch all book details.
 *
 * Fetch book pages to gather additional details for all objects in the library
 * array.
 */

require("./util.js");
require("./timer.js");
require("./book-page.js");

DetailsFetcher = class {
  #books = {};

  /**
   * Constructor.
   *
   * @params {object[]} [library]  List of objects that contain a url key.
   */
  constructor(library = null) {
    this.library = library;
    this.#books = null;
    this.pages = [];
  }

  /**
   * Fetch the book pages and fire events to update the DetailsNotifier.
   *
   * @fires update-ae-notifier
   */
  async populate() {
    let book, data;

    let actual = new Timer();
    actual.start();

    let total = this.library.length;

    fireEvent({ total: total });

    let i = 0;

    for (book of this.library) {
      if (!book.url) {
        continue;
      }
      let timer = new Timer();
      timer.start();
      let page = await BookPage.get(book.url.replace("http", "https"));

      page.url = book.url;
      this.pages.push(page);
      i++;

      timer.stop();
      fireEvent({ item_no: i, timer: timer });
    }

    actual.stop();
    fireEvent({ percent: 1 });
    info(
      `DetailsFetcher.populate() took: ${actual.minutes} minutes (${actual.seconds} seconds)`,
    );
  }

  /**
   * Getter for the list of book data.
   *
   * @returns {object}  Book data keyed by ASIN.
   */
  get books() {
    if (!this.#books) {
      this.#books = {};
      let data, page;

      for (page of this.pages) {
        if (!page) continue;

        let data = page.data();
        this.#books[data.asin] = data;
      }
    }
    return this.#books;
  }

  /**
   * Setter for the list of book data.
   *
   * @param {object}  Book data keyed by ASIN.
   */
  set books(value) {
    this.#books = value;
  }
};
