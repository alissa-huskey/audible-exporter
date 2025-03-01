LibraryFetcher = class extends Page {
  page_size = 50;
  base_url = "https://www.audible.com/library/titles";

  #books = [];

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

  async populate(progress_callback=null) {
    let i = 0;
    do {
      let page = await this.fetchPage(i + 1);
      this.pages.push(page);

      if (progress_callback) {
        progress_callback(i, this.page_count);
      }

      i++;
    } while (i < this.page_count);

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
    return Math.ceil(this.book_count / this.page_size);
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

