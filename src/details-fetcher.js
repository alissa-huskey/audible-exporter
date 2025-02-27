DetailsFetcher = class {
  constructor(library=null) {
    this.library = library;
    this.books = {};
  }

  async populate(progress_callback=null) {
    let book, remaining
    let i = 0
    let total = this.library.length;

    for (book of this.library) {
      let page = await BookPage.get(book.url.replace("http", "https"));
      page.url = book.url;
      try {
        let data = page.data();
        if (!data) 
          continue

        this.books[data.id] = data;
        if (progress_callback) {
          progress_callback(i, total, data);
        }
      } catch {

      }

      i++;
    }
  }
}

