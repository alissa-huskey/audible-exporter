require("./util.js");
require("./timer.js");
require("./order-page.js");

OrdersFetcher = class {
  #count = 0;
  #items = null;

  constructor() {
    this.#count = 0;
    this.#items = null;
    this.pages = [];
  }

  async init(limit) {
    // request to get the years in order history
    let running_count = 0;
    let page = new OrderPage("last_90_days", 1, 20);
    await page.get();
    this.years = page.years;

    if (limit && this.years.length > limit) {
      this.years.splice(limit);
    }

    fireEvent({ years: this.years });

    for (let year of this.years) {
      let timer = new Timer();
      timer.start();

      fireEvent({ year: year });

      let page_num = 1;
      let page_count;

      do {
        let page = new OrderPage(tryInt(year), page_num);

        if (page_num == 1) {
          await page.get();
          page_count = page.page_count;
        }

        this.pages.push(page);
        running_count++;
        page_num++;

        if (limit && running_count >= limit) {
          this.years.splice(this.years.indexOf(year));
          fireEvent({ years: this.years });
          break;
        }
      } while (page_num <= page_count);
      timer.stop();
      fireEvent({ timer: timer });
    }

    fireEvent({ percent: 1 });
  }

  async populate(limit = null) {
    if (limit) {
      this.pages.splice(limit, this.pages.length);
    }

    fireEvent({ total: this.pages.length });
    let i = 0;

    for (let page of this.pages) {
      let timer = new Timer();
      timer.start();

      fireEvent({
        year: page.year,
        year_page: page.page_num,
        item_no: i,
      });

      if (!page.doc) {
        await page.get();
        fireEvent({ page_count: page.page_count });
      } else {
        fireEvent({ page_count: page.page_count });
        await delay(500);
      }

      i++;
      timer.stop();
      fireEvent({ timer: timer });
    }
    fireEvent({ percent: 1 });
  }

  get count() {
    if (!this.#count) {
      this.#count = this.pages.reduce((sum, p) => sum + p.items.length, 0);
    }
    return this.#count;
  }

  get items() {
    if (!this.#items) {
      let items = {};

      for (let page of this.pages) {
        for (let item of page.items) {
          items[item.id] = item;
        }
      }

      this.#items = items;
    }
    return this.#items;
  }

  set items(value) {
    this.#items = value;
  }
};
