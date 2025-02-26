Orders = class {
  #items = [];

  async init() {
    let page = new OrderPage("last_90_days", 1, 20);
    await page.get();
    this.years = page.years.map((year) => ({year: tryInt(year), page_count: null, pages: []}));
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

  get items() {
    if (isEmpty(this.#items)) {
      let items = [];
      this.#items = this.years.reduce((arr, year) => {
        items = year.pages.reduce((subarr, page) => {
          return subarr.concat(page.items);
        }, []);
        return arr.concat(items);
      }, []);
    }
    return this.#items;
  }
}
