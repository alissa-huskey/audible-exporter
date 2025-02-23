LibraryPageParser = class {
  constructor(doc=null) {
    this.doc = new Element(doc);
  }

  get rows() {
    let rows = this.doc.gc("adbl-library-content-row");
    if (!rows.length) {
      return [];
    }
    return rows;
  }

  get books() {
    return this.rows.map((row) => {
        let ul = row.gcf("bc-list bc-list-nostyle");

      return {
        url: (
          ul.gcf("bc-size-headline3")?.parentElement
          ?.attributes["href"]?.value
          ?.replace(/\?.+/, "")
        ) || "",
        title: ul.gcf("bc-size-headline3")?.innerHTML?.trim() || "",
        author: ul.gcf("authorLabel")?.gcf("bc-color-base")?.innerHTML?.trim() || "",
        narrator: ul.gcf("narratorLabel")?.gcf("bc-color-base")?.innerHTML?.trim() || "",
        series: ul.gcf("seriesLabel")?.gtf("a")?.innerHTML?.trim() || "",
      }
    });
  }
}

