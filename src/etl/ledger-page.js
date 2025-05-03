require("./page.js");
require("./order-row.js");
require("./purchase-row.js");

/**
 * A single purchase history page, usually a year and page
 * (ie 2024, page 2 of 3).
 *
 * Each order page has both a list of orders (OrderRow), and a list of
 * purchases (PurchaseRow).
 *
 * Example:
 * https://www.audible.com/account/purchase-history?ref=&tf=orders&df=2024&ps=20
 */
LedgerPage = class extends Page {
  base_url = "https://www.audible.com/account/purchase-history?tf=orders";

  #default_per_page = 40;

  #valid_date_ranges = ["last_90_days", "last_180_days", "last_365_days"];

  #orders = {};
  #purchases = {};
  #entries = [];
  #page_num = null;
  #year = null;
  #years = null;
  #page_count = null;

  constructor(year_or_doc = null, page_num = null, per_page = null) {
    super();
    this.doc = null;
    if (
      (typeof year_or_doc == "number" ||
        this.#valid_date_ranges.includes(year_or_doc)) &&
      typeof page_num == "number"
    ) {
      this.year = year_or_doc;
      this.page_num = page_num;
    } else if (year_or_doc) {
      this.doc = year_or_doc;
    }

    this.per_page = per_page || this.#default_per_page;
    this.#entries = null;
  }

  /**
   * Fetch the document for the given year, page number, and per_page.
   *
   * @return {Doc}
   */
  async get() {
    let url = `${this.base_url}&df=${this.year}&pn=${this.page_num}&ps=${this.per_page}`;
    this.doc = await this.fetchDoc(url);
    return this.doc;
  }

  /**
   * The year for this page.
   *
   * @return {number}
   */
  get year() {
    if (!this.#year && this.doc) {
      this.#year = this.doc.qsf(
        "#ui-it-purchase-history-date-filter option:checked",
      )?.value;
    }
    return tryInt(this.#year);
  }

  /**
   * Set the year for this page.
   *
   * @param {number} value  The year.
   */
  set year(value) {
    this.#year = value;
  }

  /**
   * The page number of this page.
   *
   * @return {number}
   */
  get page_num() {
    if (!this.#page_num && this.doc) {
      this.#page_num =
        this.doc
          .qsf("span.purchase-history-pagination-button")
          ?.innerHTML?.trim() || 1;
    }
    return tryInt(this.#page_num);
  }

  /**
   * Set the page number of this page.
   *
   * @param {number} value   The page number.
   */
  set page_num(value) {
    this.#page_num = value;
  }

  /**
   * Number of pages for this year (or date range).
   *
   * @return {number}
   */
  get page_count() {
    if (!this.#page_count && this.doc) {
      let link = this.doc.qs("a.purchase-history-pagination-button").last;
      let count = link?.innerHTML.trim() || 1;
      this.#page_count = parseInt(count);
    }
    return this.#page_count;
  }

  /**
   * An array of years available in the year drop-down.
   *
   * @return {array}
   */
  get years() {
    if (!this.#years && this.doc) {
      let options = this.doc.qs("#ui-it-purchase-history-date-filter option");
      this.#years = options.map((o) => o.value).filter((y) => /^\d+$/.test(y));
    }
    return this.#years;
  }

  /**
   * Data from OrderRow objects on this page, keyed by order id.
   *
   * @return {object}
   */
  get orders() {
    if (this.doc && isEmpty(this.#orders)) {
      let rows = this.doc.qs("tr:has(a[href^='/account/order-details'])");

      let orders = rows.map((tr) => {
        let row = new OrderRow(tr);
        return [row.id, row.data()];
      });

      this.#orders = Object.fromEntries(orders);
    }
    return this.#orders;
  }

  /**
   * Data from PurchaseRow objects on this page.
   *
   * @returns {Array}
   */
  get purchases() {
    if (this.doc && isEmpty(this.#purchases)) {
      let links = this.doc.qs("a[data-order-item-id]");
      let purchases = links.map((a) => new PurchaseRow(a).data());
      this.#purchases = purchases;
    }

    return this.#purchases;
  }

  /**
   * Merge selected order data and purchase data.
   *
   * @return {Array}
   */
  get entries() {
    if (!this.#entries) {
      try {
        let seen = {};
        this.#entries = this.purchases.reduce((arr, p) => {
          if (seen[p.asin]) {
            error(`Duplicate item: /pd/${asin}`, seen[p.asin], p);
          } else if (p.title && p.author) {
            // ^ missing title and author mean credit purchases
            seen[p.asin] = p;
            arr.push({
              asin: p.asin,
              url: `http://www.audible.com/pd/${p.asin}`,
              title: p.title,
              author: p.author,
              purchased: dateString(this.orders[p.order_id].date),
            });
          }
          return arr;
        }, []);
      } catch (err) {
        error(err);
      }
    }
    return this.#entries;
  }
};
