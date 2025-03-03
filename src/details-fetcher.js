/**
 * details-fetcher.js
 * ************************************************************************************
 */

DetailsFetcher = class {
  #books = {}

  constructor(library=null) {
    this.library = library;
    this.#books = null;
    this.pages = [];
  }

  async populate() {
    let book, data;

    let total = this.library.length;

    dispatchEvent({book_count: total});

    let i = 0;

    for (book of this.library) {
      if (!book.url) {
        continue;
      }
      let page = await BookPage.get(book.url.replace("http", "https"));

      page.url = book.url;
      this.pages.push(page);

      i++;
      dispatchEvent({book: i});
    }
  }

  get books() {
    if (!this.#books) {
      this.#books = {};
      let data, page;

      for (page of this.pages) {
        if (!page) 
          continue

        let data = page.data();
        this.#books[data.id] = data;
      }
    }
    return this.#books;
  }

  set books(value) {
    this.#books = value
  }
}

