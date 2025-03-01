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

  async populate(progress_callback=null) {
    let year_count = this.years.length;
    let i = 0;

    for (let year of this.years)  {
      let fetcher = new YearFetcher(year);
      let percent = i / year_count;
      await fetcher.populate(progress_callback, percent);
      this.years[i] = fetcher;
      i++;
    }
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
