/**
 * library-fetcher.js
 * ************************************************************************************
 */

LibraryFetcher = class extends Page {
  page_size = 50;
  base_url = "https://www.audible.com/library/titles";

  #books = [];
  #page_count = null;

  constructor() {
    super();
    this.pages = [];
    this.#books = null;
  }

  async fetchPage(i) {
    let url = `${this.base_url}?pageSize=${this.page_size}&page=${i}`;
    let doc = await this.fetchDoc(url);
    return new LibraryPage(doc);
  }

  async populate(limit=null) {
    let i = 0;
    do {
      if (limit) {
        this.page_count = limit;
        this.page_size = 20;
      }

      let page_num = i + 1
      dispatchEvent({page: page_num});

      let page = await this.fetchPage(page_num);
      this.pages.push(page);

      dispatchEvent({page: page_num, page_count: this.page_count});

      i++;
    } while (i < this.page_count);

    delay(1000);

    return this.pages;
  }

  get book_count() {
    if (!this.pages) {
      return;
    }
    let page = this.pages[0];
    return page.page_size * page.page_count;
  }

  get page_count() {
    if (!this.#page_count) {
      this.#page_count = Math.ceil(this.book_count / this.page_size);
    }
    return this.#page_count;
  }

  set page_count(value) {
    this.#page_count = value;
  }

  get books() {
    if (!this.#books) {
      let books = this.pages.reduce((arr, page) => {
          return arr.concat(
            // map books by URL to avoid duplicates
            page.books.map((book) => [book.url, book])
          );
        },
        [],
      );

      this.#books = Object.values(Object.fromEntries(books));
    }
    return this.#books;
  }

  set books(value) {
    this.#books = value;
  }
}

