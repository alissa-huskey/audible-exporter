/**
 * details-fetcher.js
 * ************************************************************************************
 */

DetailsFetcher = class {
  #books = {};

  constructor(library = null) {
    this.library = library;
    this.#books = null;
    this.pages = [];
  }

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

  get books() {
    if (!this.#books) {
      this.#books = {};
      let data, page;

      for (page of this.pages) {
        if (!page) continue;

        let data = page.data();
        this.#books[data.id] = data;
      }
    }
    return this.#books;
  }

  set books(value) {
    this.#books = value;
  }
};
