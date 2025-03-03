/**
 * year-fetcher.js
 * ************************************************************************************
 */

YearFetcher = class {

  #items = [];

 constructor(year=null) {
    this.year = tryInt(year);
    this.page_count = null;
    this.#items = null;
    this.pages = null;
  }

  async populate() {
    this.pages = [];
    let i = 0;
    do {
      let page_num = i + 1;
      let page = new OrderPage(this.year, page_num);

      dispatchEvent({page: page_num});

      try {
        await page.get();
        if (!this.page_count) {
          this.page_count = page.page_count;

          dispatchEvent({page_count: this.page_count});
          await delay(1000);
        }
        this.pages.push(page);
    } catch (err) {
      error(err);
    }

      i++;
    } while (i < this.page_count);
  }

  get items() {
    if (!this.#items && this.pages) {
      let items = [];
      for (let page of this.pages) {
        for (let item of page.items) {
          items.push(item);
        }
      }
      this.#items = items;
    }
    return this.#items;
  }
}
