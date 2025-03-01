OrdersFetcher = class {
  #count = 0;
  #items = null;

  async init() {
    let page = new OrderPage("last_90_days", 1, 20);
    await page.get();
    this.years = page.years.map((year) => ({year: tryInt(year), page_count: null, pages: []}));

    this.#count = 0;
    this.#items = null;
  }

  async populate(progress_callback=null) {
    let i, page, page_num, percent;
    let y = 0;
    let year_count = this.years.length;

    for (var data of this.years)  {
      y++;
      i = 0;
      do {
        page_num = i + 1;
        page = new OrderPage(data.year, page_num);
        await page.get();
        if (!data.page_count) {
          data.page_count = page.page_count;
        }
        data.pages.push(page);

        if (progress_callback) {
          percent = y / year_count;
          progress_callback(data.year, page_num, data.page_count, percent);
        }

        i++;
      } while (i < data.page_count);
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
