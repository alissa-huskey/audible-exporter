OrderPage = class extends Page {
  base_url = "https://www.audible.com/account/purchase-history?tf=orders";

  #default_per_page = 40;
  #purchases_attrs = {
    id: "data-order-item-asin",
    order_id: "data-order-id",
    amount: "data-order-item-cost",
    credits: "data-order-item-credit-cost",
    title: "data-order-item-name",
    author: "data-order-item-author",
  };
  #valid_date_ranges = ["last_90_days", "last_180_days", "last_365_days"]

  #orders = {};
  #purchases = {};
  #items = [];
  #page_num = null;
  #year = null;

  constructor(year_or_doc=null, page_num=null, per_page=null) {
    super();
    this.doc = null;
    if ((typeof year_or_doc == "number" || this.#valid_date_ranges.includes(year_or_doc)) && typeof page_num == "number") {
      this.year = year_or_doc;
      this.page_num = page_num;
    } else if (year_or_doc) {
      this.doc = year_or_doc;
    }

    this.per_page = per_page || this.#default_per_page;
  }

  async get() {
    let url = `${this.base_url}&df=${this.year}&pn=${this.page_num}&ps=${this.per_page}`;
    this.doc = await this.fetchDoc(url);
    return this.doc;
  }

  get year() {
    if (!this.#year && this.doc) {
      this.#year = this.doc.qsf("#ui-it-purchase-history-date-filter option:checked")?.value;
    }
    return tryInt(this.#year);
  }

  set year(value) {
    this.#year = value;
  }

  get page_num() {
    if (!this.#page_num && this.doc) {
      this.#page_num = this.doc.qsf("span.purchase-history-pagination-button")?.innerHTML?.trim();
    }
    return tryInt(this.#page_num);
  }

  set page_num(value) {
    this.#page_num = value;
  }

  get page_count() {
    let link = this.doc.qs("a.purchase-history-pagination-button").last
    let count = link?.innerHTML.trim() || 1;
    return parseInt(count);
  }

  get years() {
    let options = this.doc.qs("#ui-it-purchase-history-date-filter option");
    let years = options.reduce((arr, option) => {
      let year = option.value;
      if (/^\d+$/.test(year)) {
        arr.push(year);
      }
      return arr;
    }, []);
    return years;
  }

  get orders() {
    if (this.doc && isEmpty(this.#orders)) {
      let rows = this.doc.qs("tr:has(a[href^='/account/order-details'])");

      let orders = rows.map((row) => {
        let url = row.qsf("a[href^='/account/order-details']").href;
        let id = url.match(/orderId=([^&]+)&/)[1];
        let date = row.qsf(".ui-it-purchasehistory-item-purchasedate").innerHTML?.trim();
        let total = row.qsf(".ui-it-purchasehistory-item-total div").innerHTML;

        return [id, { id: id, date: date, total: total }];
      });

      this.#orders = Object.fromEntries(orders);
    }
    return this.#orders;
  }

  get purchases() {
    if (this.doc && isEmpty(this.#purchases)) {
      let links = (this.doc.qs("a[data-order-item-id]"));
      let purchases = links.map((a) => 
        Object.fromEntries(
          Object.entries(this.#purchases_attrs).map(([key, attr]) => [key, a.attributes[attr].value])
        ),
      );

      this.#purchases = purchases;
    }

    return this.#purchases;
  }

  get items() {
    if (this.doc && isEmpty(this.#items)) {
      let seen = {};
      this.#items = this.purchases.reduce((arr, p) => {
        if (p.title && p.author && !seen[p.id]) {
          seen[p.id] = true;
          arr.push({
            url: `http://www.audible.com/pd/${p.id}`,
            title: p.title,
            author: p.author,
            purchase_date: this.orders[p.order_id].date,
          });
        }
        return arr;
      }, []);
    }
    return this.#items;
  }
}
