/**
 * library-book-row.js
 * ************************************************************************************
 */

LibraryBookRow = class extends Parser {
  _fields = ["id", "url", "title", "author", "narrator", "series"];
  _identifers = ["page_num", "row_num"];

  constructor(doc = null, page_num = null, row_num = null) {
    super();
    this.doc = doc;
    this.page_num = page_num;
    this.row_num = row_num;
  }

  get id() {
    return this.doc.id.replace("adbl-library-content-row-", "");
  }

  get ul() {
    return this.doc.qsf(".bc-list.bc-list-nostyle");
  }

  get url() {
    return this.ul
      .gcf("bc-size-headline3")
      .parentElement.attributes["href"]?.value.replace(/\?.+/, "");
  }

  get title() {
    let title = this.ul.gcf("bc-size-headline3")?.innerHTML.trim();
    return entityDecode(title);
  }

  get author() {
    return this.ul.gcf("authorLabel").gcf("bc-color-base").innerHTML.trim();
  }

  get narrator() {
    return this.ul.qsf(".narratorLabel .bc-color-base")?.innerHTML?.trim();
  }

  get series() {
    return this.ul.qsf(".seriesLabel a")?.innerHTML?.trim();
  }
};
