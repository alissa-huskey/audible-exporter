DetailsFetcher = class {
  #books = {}

  constructor(library=null) {
    this.library = library;
    this.#books = null;
    this.pages = [];
  }

  async populate(progress_callback=null) {
    let book, data;

    let total = this.library.length;
    let i = 0;

    for (book of this.library) {
      let page = await BookPage.get(book.url.replace("http", "https"));

      page.url = book.url;
      this.pages.push(page);

      if (progress_callback) {
        progress_callback(i, total, data);
      }
      i++;
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

