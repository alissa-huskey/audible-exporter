require("./util.js");
require("./parser.js");

LibraryBookRow = class extends Parser {
  _fields = ["id", "url", "title", "authors", "narrator", "series"];
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

  get authors() {
    let links = this.ul.qs(".authorLabel a.bc-color-base");
    return links.map((a) => a.innerHTML.trim());
  }

  get narrator() {
    return this.ul.qsf(".narratorLabel .bc-color-base")?.innerHTML?.trim();
  }

  get series() {
    let i = 1;
    let series = [];
    let links = this.ul.qs(".seriesLabel a");
    for (let link of links) {
      let [_, url, id] = /(\/series\/.*\/(.*))\?/.exec(link.href) || [
        null,
        "",
        "",
      ];

      let span = this.ul.qsf(`.seriesLabel a:nth-child(${i}) + span`);
      let number = span?.innerHTML?.trim().replace("Book ", "") || "";

      series.push({
        id: id,
        url: url,
        name: link.innerHTML.trim(),
        number: number,
      });
      i++;
    }
    return series;
  }
};
