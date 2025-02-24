LibraryPageParser = class {
  #default_page_size = 20;

  constructor(doc=null) {
    this.doc = new Element(doc);
  }

  get page_size() {
    let size = this.doc.qsf("select[name='pageSize'] option:checked")?.value || this.#default_page_size;
    return parseInt(size);
  }

  get page_num() {
    let num = this.doc.qsf("span.pageNumberElement")?.innerHTML || 1;
    return parseInt(num);
  }

  get page_count() {
    let links = this.doc.qs("a.pageNumberElement");
    let count = links.last?.innerHTML || 1;
    return parseInt(count);
  }

  get rows() {
    let rows = this.doc.gc("adbl-library-content-row");
    if (!rows.length) {
      return [];
    }
    return rows;
  }

  get books() {
    let books = this.rows.reduce((arr, row) => {
      let ul = row.gcf("bc-list bc-list-nostyle");
      let title = ul.gcf("bc-size-headline3")?.innerHTML?.trim() || "";

      if (title == "Your First Listen") {
        return arr;
      }

      arr.push({
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
    return books;
  }
}

