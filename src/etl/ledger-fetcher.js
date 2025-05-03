require("../timer.js");
require("./ledger-page.js");

LedgerFetcher = class {
  #count = 0;
  #entries = null;

  constructor() {
    this.#count = 0;
    this.#entries = null;
    this.pages = [];
  }

  /**
   * Fetch the first purchase history page to get the list of years in purchase
   * history, then fetch the first page of each year to determine how many
   * pages in each year.
   *
   * @fires update-ae-notifier
   */
  async init(limit) {
    // request to get the years in purchase history
    let running_count = 0;
    let page = new LedgerPage("last_90_days", 1, 20);
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
        let page = new LedgerPage(tryInt(year), page_num);

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

  /**
   * Fetch all of the pages, up to limit.
   *
   * @param {integer} limit   Number of pages to stop at.
   *
   * @fires update-ae-notifier
   */
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

  /**
   * Return the total number entries in all ledger pages.
   *
   * @return {number}
   */
  get count() {
    if (!this.#count) {
      this.#count = this.pages.reduce((sum, p) => sum + p.entries.length, 0);
    }
    return this.#count;
  }

  /**
   * Entries from all pages keyed by ASIN.
   *
   * @return {object}
   */
  get entries() {
    if (!this.#entries) {
      let entries = {};

      for (let page of this.pages) {
        for (let item of page.entries) {
          entries[item.asin] = item;
        }
      }

      this.#entries = entries;
    }
    return this.#entries;
  }

  /**
   * Set entries.
   *
   * @param {object}
   */
  set entries(value) {
    this.#entries = value;
  }
};
