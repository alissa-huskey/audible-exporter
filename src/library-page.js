LibraryPage = class extends Page {
  #default_page_size = 20;
  #rows = null;
  #books = null;

  constructor(doc=null) {
    super();
    this.doc = doc;
    this.#rows = null;
    this.#books = null;
  }

  get page_size() {
    if (!this.doc)
      return
    let size = this.doc.qsf("select[name='pageSize'] option:checked")?.value || this.#default_page_size;
    return parseInt(size);
  }

  get page_num() {
    if (!this.doc)
      return
    let num = this.doc.qsf("span.pageNumberElement")?.innerHTML || 1;
    return parseInt(num);
  }

  get page_count() {
    if (!this.doc)
      return
    let links = this.doc.qs("a.pageNumberElement");
    let count = links.last?.innerHTML || 1;
    return parseInt(count);
  }

  get rows() {
    if (!this.doc)
      return
    if (!this.#rows) {
      let rows = this.doc.gc("adbl-library-content-row");
      this.#rows = rows.length ? rows : [];
    }
    return this.#rows;
  }

  get books() {
    if (!this.#books) {
      try {
        this.#books = this.rows.reduce((arr, row) => {
          let ul = row.gcf("bc-list bc-list-nostyle");
          let title = ul.gcf("bc-size-headline3")?.innerHTML?.trim() || "";

          if (title == "Your First Listen") {
            return arr;
          }

          arr.push({
            id: row.id?.replace("adbl-library-content-row-", ""),
            url: (
              ul.gcf("bc-size-headline3")?.parentElement
              ?.attributes["href"]?.value
              ?.replace(/\?.+/, "")
            ) || "",
            title: entityDecode(title),
            author: ul.gcf("authorLabel")?.gcf("bc-color-base")?.innerHTML?.trim() || "",
            narrator: ul.gcf("narratorLabel")?.gcf("bc-color-base")?.innerHTML?.trim() || "",
            series: ul.gcf("seriesLabel")?.gtf("a")?.innerHTML?.trim() || "",
          });

          return arr;
        }, []);
      } catch (err) {
        error(err);
      }
    }
    return this.#books;
  }
}

