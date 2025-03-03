/**
 * orders-fetcher.js
 * ************************************************************************************
 */

OrdersFetcher = class {
  #count = 0;
  #items = null;

  constructor() {
    this.#count = 0;
    this.#items = null;
  }

  async init() {
    let page = new OrderPage("last_90_days", 1, 20);
    await page.get();
    this.years = page.years;
  }

  async populate(limit=null) {
    if (limit) {
      this.years.splice(limit, this.years.length);
      dispatchEvent({years: this.years});
    }
    let year_count = this.years.length;
    let i = 0;

    for (let year of this.years)  {
      dispatchEvent({year: year, page: null, page_count: null});
      let fetcher = new YearFetcher(year);
      await fetcher.populate();
      this.years[i] = fetcher;
      i++;
    }
    dispatchEvent({percent: 1});
  }

  get count() {
    if(!this.#count) {
      this.#count = this.years.reduce(
        (sum, y) => sum + y.pages.reduce( (count, p) => count + p.items.length, 0),
        0
      )
    }
    return this.#count;
  }

  get items() {
    if (!this.#items) {
      let items = {};
      for (let year of this.years) {
        for (let page of year.pages) {
          for (let item of page.items) {
            items[item.id] = item;
          }
        }
      }
      this.#items = items;
    }
    return this.#items;
  }

  set items(value) {
    this.#items = value;
  }
}
