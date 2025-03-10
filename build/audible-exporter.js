/**
 * util.js
 * ************************************************************************************
 */

var CONSOLE_OUTPUT = false;
const LOG_PREFIX = "[audible-exporter]";

info = function (...msg) {
  if (!CONSOLE_OUTPUT) {
    return;
  }
  console.log(LOG_PREFIX, ...msg);
};

error = function (...msg) {
  console.error(LOG_PREFIX, ...msg);
};

log_table = function (label, data) {
  if (!CONSOLE_OUTPUT) {
    return;
  }
  let name = `${LOG_PREFIX} ${label}`;
  console.groupCollapsed(name);
  console.table(data);
  console.groupEnd(name);
};

titleCase = function (text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

first = function (arr) {
  let v;
  for (v of arr) {
    if (v) return v;
  }
};

const EMPTIES = { Object: "{}", Array: "[]" };
isEmpty = function (o) {
  if (!o) {
    return true;
  }

  let type = o.constructor.name;

  if (type == "List") {
    return o.length == 0;
  }

  if (!(type in EMPTIES)) {
    throw new Error(`isEmpty() does not support type: ${type} (value: ${o}).`);
  }

  return JSON.stringify(o) == EMPTIES[type];
};

tryFloat = function (o) {
  try {
    f = parseFloat(o);
    return isNaN(f) ? o : f;
  } catch (err) {
    return o;
  }
};

tryInt = function (f) {
  try {
    let i = parseInt(f);
    return i == f ? i : f;
  } catch (err) {
    return f;
  }
};

entityDecode = function (text) {
  return text.replace("&amp;", "&");
};

dateString = function (date) {
  if (!date) return "";
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (date.constructor.name != "Date") {
    date = new Date(date);
  }
  return `${date.getFullYear()} ${months[date.getMonth()]} ${date.getDate()}`;
};

cleanObject = function (ob) {
  return Object.entries(ob).reduce((r, [k, v]) => {
    if (
      v != null &&
      v != undefined &&
      v !== "" &&
      (typeof v == "boolean" ||
        typeof v == "string" ||
        typeof v == "symbol" ||
        typeof v == "number" ||
        typeof v == "function" ||
        (typeof v == "object" &&
          ((Array.isArray(v) && v.length) || Array.isArray(v) != true)))
    ) {
      r[k] = v;
      return r;
    } else {
      return r;
    }
  }, {});
};

fireEvent = function (obj) {
  document.dispatchEvent(
    new CustomEvent("update-ae-notifier", { detail: obj }),
  );
};

stripHTML = function (html) {
  let doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

rando = (n) => Math.round(Math.random() * n);

reg = (o, n) => (o ? o[n] : "");

cleanObject = function (ob) {
  return Object.entries(ob).reduce((r, [k, v]) => {
    if (
      v != null &&
      v != undefined &&
      v !== "" &&
      (typeof v == "boolean" ||
        typeof v == "string" ||
        typeof v == "symbol" ||
        typeof v == "number" ||
        typeof v == "function" ||
        (typeof v == "object" &&
          ((Array.isArray(v) && v.length) || Array.isArray(v) != true)))
    ) {
      r[k] = v;
      return r;
    } else {
      return r;
    }
  }, {});
};

delay = (ms) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

/**
 * doc.js
 * ************************************************************************************
 */

Doc = class {
  constructor(elm = null) {
    this.element = elm;

    if (!elm) return;

    for (let k in elm.__proto__) {
      // eslint-disable-next-line no-prototype-builtins
      if (Object.hasOwnProperty(k)) continue;

      Object.defineProperty(this, k, {
        get: () => this.element[k],
        set: (v) => {
          this.element[k] = v;
        },
      });
    }
  }

  static from_html(text) {
    let html = document.createElement("html");
    html.innerHTML = text;

    let elm = new Doc(html);
    return elm;
  }

  /**
   * Create HTMLElement.
   *
   * @param {str}    html     Tag name or HTML string.
   * @param {object} [attrs]  Attributes to set on element.
   *
   * @return {Doc}
   *
   * @example
   * let elm = Doc.create("div", {id: "container"});
   * let elm = Doc.create("<p>hello</p>");
   */
  static create(html, attrs = {}) {
    let dom;
    if (html.includes("<")) {
      let doc = document.createElement("body");
      doc.innerHTML = html;
      dom = doc.lastChild;
    } else if (html) {
      dom = document.createElement(html);
    }

    if (attrs.style && typeof attrs.style == "object") {
      for (let [k, v] of Object.entries(attrs.style)) {
        dom.style[k] = v;
      }
      delete attrs.style;
    }

    let element = new Doc(dom);
    element.set(attrs);
    return element;
  }

  static gc(name) {
    return new List(document.getElementsByClassName(name));
  }

  static gi(name) {
    let node = document.getElementById(name);
    return new Doc(node);
  }

  static gt(name) {
    return new List(document.getElementsByTagName(name));
  }

  static qs(query) {
    let res = document.querySelector(query);
    return new Doc(res);
  }

  static qsa(query) {
    let res = document.querySelectorAll(query);
    return new List(res);
  }

  gc(name) {
    if (!this.element) return [];

    let res = this.element.getElementsByClassName(name);
    return new List(res);
  }

  gi(name) {
    return Doc.gi(name);
  }

  gt(name) {
    if (!this.element) return [];

    let res = this.element.getElementsByTagName(name);
    return new List(res);
  }

  gcf = (name) => this.gc(name)[0];
  gtf = (name) => this.gt(name)[0];

  qs(query) {
    let res = this.element.querySelectorAll(query);
    return new List(res);
  }

  qsf(query) {
    let res = this.element.querySelector(query);
    return new Doc(res);
  }

  set(attrs, value = null) {
    if (typeof attrs == "string") {
      let key = attrs;
      attrs = {};
      attrs[key] = value;
    }

    for (let [k, v] of Object.entries(attrs)) {
      this.element.setAttribute(k, v);
    }
  }
};

/**
 * list.js
 * ************************************************************************************
 */

List = class extends Array {
  constructor(items) {
    items = Array.from(items);
    let elements = items.map((item) => new Doc(item));
    super(...elements);
  }

  get first() {
    return this[0];
  }

  get last() {
    return this.slice(-1)[0];
  }
};

/**
 * parser.js
 * ************************************************************************************
 */

Parser = class {
  #doc = null;
  _fields = [];
  _identifiers = [];

  get doc() {
    return this.#doc;
  }

  set doc(value) {
    if (value) {
      if (!value) return;

      if (value.constructor.name != "Doc") {
        value = new Doc(value);
      }

      this.#doc = value;
    }
  }

  data() {
    let f;
    let data = {};

    for (let i in this._fields) {
      try {
        f = this._fields[i];
        data[f] = this[f];
      } catch (err) {
        let identifiers = this._identifers
          .map((i) => `${i}: ${this[i]}`)
          .join(", ");
        error(`${this.constructor.name}.${f} (${identifiers}):\n`, err);
      }
    }
    return cleanObject(data);
  }
};

/**
 * page.js
 * ************************************************************************************
 */

Page = class extends Parser {
  async fetchDoc(url) {
    let res;
    try {
      res = await fetch(url);

      if (!res.ok) {
        error(`Page.fetchDoc("${url.trim()}"): Response status: ${res.status}`);
      }

      let text = await res.text();
      return new DOMParser().parseFromString(text, "text/html");
    } catch (err) {
      error(`Page.fetchDoc("${url.trim()}"):\n`, err);
    }
  }
};

/**
 * timer.js
 * ************************************************************************************
 */

/**
 * Measure how long a block of code takes to execute.
 *
 * @example
 *   
      let sleep = (ms) => new Promise(res => {
        setTimeout(res, ms);
      });

      let timer = new Timer();
      timer.start();

      await sleep(500);

      timer.stop();
      console.log(`That took: ${timer.seconds} seconds.`);
 *
 */
Timer = class {
  constructor(beginning = null, end = null, task = null) {
    this.beginning = beginning;
    this.end = end;
    this.task = task;
  }

  start() {
    this.beginning = this.ts();
    return this.beginning;
  }

  stop() {
    this.end = this.ts();
    return this.end;
  }

  get elapsed() {
    return this.end - this.beginning;
  }

  get seconds() {
    return this.elapsed / 1000;
  }

  get minutes() {
    return (this.seconds / 60).toFixed(2);
  }

  ts() {
    return new Date().getTime();
  }

  async time(callback) {
    this.start();
    let result = await callback();
    this.stop();
    return result;
  }
};

/**
 * purchase.js
 * ************************************************************************************
 */

Purchase = class extends Parser {
  _fields = {
    id: "data-order-item-asin",
    order_id: "data-order-id",
    title: "data-order-item-name",
    author: "data-order-item-author",
    amount: "data-order-item-cost",
    credits: "data-order-item-credit-cost",
  };

  constructor(doc = null) {
    super();
    this.doc = doc;
  }

  data() {
    return Object.fromEntries(
      Object.entries(this._fields).map(([key, attr]) => [
        key,
        this.doc.attributes[attr].value,
      ]),
    );
  }
};

/**
 * order-row.js
 * ************************************************************************************
 */

OrderRow = class extends Parser {
  _fields = ["id", "date", "total"];

  _identifers = [];

  constructor(doc = null) {
    super();
    this.doc = doc;
  }

  get url() {
    return this.doc.qsf("a[href^='/account/order-details']").href;
  }

  get id() {
    return this.url.match(/orderId=([^&]+)&/)[1];
  }

  get date() {
    return this.doc
      .qsf(".ui-it-purchasehistory-item-purchasedate")
      .innerHTML?.trim();
  }

  get total() {
    return this.doc.qsf(".ui-it-purchasehistory-item-total div").innerHTML;
  }
};

/**
 * order-page.js
 * ************************************************************************************
 */

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
  #valid_date_ranges = ["last_90_days", "last_180_days", "last_365_days"];

  #orders = {};
  #purchases = {};
  #items = [];
  #page_num = null;
  #year = null;

  require(...attrs) {
    let success = true;
    for (let a in attrs) {
      if (!this[attrs[a]]) {
        let source = new Error().stack
          .split("\n")[2]
          .match(/at (.*)\.require \[as (.*)] \(.*[/](.*)\)/);
        let prefix = source ? `<${source[3]} ${source[1]}.${source[2]}> ` : "";
        error(`${prefix}Missing required attribute: ${attrs[a]}.`);
        success = false;
      }
    }
    return success;
  }

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
    this.#items = null;
  }

  async get() {
    let url = `${this.base_url}&df=${this.year}&pn=${this.page_num}&ps=${this.per_page}`;
    this.doc = await this.fetchDoc(url);
    return this.doc;
  }

  get year() {
    if (!this.#year && this.doc) {
      this.#year = this.doc.qsf(
        "#ui-it-purchase-history-date-filter option:checked",
      )?.value;
    }
    return tryInt(this.#year);
  }

  set year(value) {
    this.#year = value;
  }

  get page_num() {
    if (!this.#page_num && this.doc) {
      this.#page_num =
        this.doc
          .qsf("span.purchase-history-pagination-button")
          ?.innerHTML?.trim() || 1;
    }
    return tryInt(this.#page_num);
  }

  set page_num(value) {
    this.#page_num = value;
  }

  get page_count() {
    if (!this.require("doc")) return null;
    let link = this.doc.qs("a.purchase-history-pagination-button").last;
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

      let orders = rows.map((tr) => {
        let row = new OrderRow(tr);
        return [row.id, row.data()];
      });

      this.#orders = Object.fromEntries(orders);
    }
    return this.#orders;
  }

  get purchases() {
    if (this.doc && isEmpty(this.#purchases)) {
      let links = this.doc.qs("a[data-order-item-id]");
      let purchases = links.map((a) => new Purchase(a).data());
      this.#purchases = purchases;
    }

    return this.#purchases;
  }

  get items() {
    if (!this.#items) {
      try {
        let seen = {};
        this.#items = this.purchases.reduce((arr, p) => {
          if (p.title && p.author && !seen[p.id]) {
            seen[p.id] = true;
            arr.push({
              id: p.id,
              url: `http://www.audible.com/pd/${p.id}`,
              title: p.title,
              author: p.author,
              purchase_date: this.orders[p.order_id].date,
            });
          }
          return arr;
        }, []);
      } catch (err) {
        error(err);
      }
    }
    return this.#items;
  }
};

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

/**
 * library-book-row.js
 * ************************************************************************************
 */

LibraryBookRow = class extends Parser {
  _fields = ["id", "url", "title", "author", "narrator", "series"];
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

  get author() {
    return this.ul.gcf("authorLabel").gcf("bc-color-base").innerHTML.trim();
  }

  get narrator() {
    return this.ul.qsf(".narratorLabel .bc-color-base")?.innerHTML?.trim();
  }

  get series() {
    return this.ul.qsf(".seriesLabel a")?.innerHTML?.trim();
  }
};

/**
 * library-page.js
 * ************************************************************************************
 */

LibraryPage = class extends Page {
  #default_page_size = 20;
  #rows = null;
  #books = null;

  constructor(doc = null) {
    super();
    this.doc = doc;
    this.#rows = null;
    this.#books = null;
  }

  get page_size() {
    if (!this.doc) return null;
    let size =
      this.doc.qsf("select[name='pageSize'] option:checked")?.value ||
      this.#default_page_size;
    return parseInt(size);
  }

  get page_num() {
    if (!this.doc) return null;
    let num = this.doc.qsf("span.pageNumberElement")?.innerHTML || 1;
    return parseInt(num);
  }

  get page_count() {
    if (!this.doc) return null;
    let links = this.doc.qs("a.pageNumberElement");
    let count = links.last?.innerHTML || 1;
    return parseInt(count);
  }

  get rows() {
    if (!this.#rows) {
      let i = 0;
      let arr = [];
      let rows = this.doc.gc("adbl-library-content-row");
      for (let row of rows) {
        arr.push(new LibraryBookRow(row, this.page_num, i + 1));
        i++;
      }
      this.#rows = arr;
    }
    return this.#rows;
  }

  get books() {
    if (!this.#books) {
      try {
        this.#books = this.rows.reduce((arr, row) => {
          if (row.title == "Your First Listen") {
            return arr;
          }

          arr.push(row.data());
          return arr;
        }, []);
      } catch (err) {
        error(err);
      }
    }
    return this.#books;
  }
};

/**
 * library-fetcher.js
 * ************************************************************************************
 */

LibraryFetcher = class extends Page {
  page_size = 50;
  base_url = "https://www.audible.com/library/titles";

  #books = [];
  #page_count = null;

  constructor() {
    super();
    this.pages = [];
    this.#books = null;
  }

  async fetchPage(i) {
    let url = `${this.base_url}?pageSize=${this.page_size}&page=${i}`;
    let doc = await this.fetchDoc(url);
    return new LibraryPage(doc);
  }

  async populate(limit = null) {
    let i = 0;
    do {
      let timer = new Timer();
      timer.start();
      if (limit) {
        this.page_count = limit;
        fireEvent({ total: this.page_count });
        this.page_size = 20;
      }

      let page_num = i + 1;
      fireEvent({ item_no: page_num });

      let page = await this.fetchPage(page_num);
      this.pages.push(page);

      i++;

      timer.stop();

      fireEvent({
        item_no: page_num,
        total: this.page_count,
        timer: timer,
      });
    } while (i < this.page_count);

    fireEvent({ percent: 1 });

    return this.pages;
  }

  get book_count() {
    if (!this.pages) return null;
    let page = this.pages[0];
    return page.page_size * page.page_count;
  }

  get page_count() {
    if (!this.#page_count) {
      this.#page_count = Math.ceil(this.book_count / this.page_size);
    }
    return this.#page_count;
  }

  set page_count(value) {
    this.#page_count = value;
  }

  get books() {
    if (!this.#books) {
      let books = this.pages.reduce((arr, page) => {
        return arr.concat(
          // map books by URL to avoid duplicates
          page.books.map((book) => [book.url, book]),
        );
      }, []);

      this.#books = Object.values(Object.fromEntries(books));
    }
    return this.#books;
  }

  set books(value) {
    this.#books = value;
  }
};

/**
 * book-page.js
 * ************************************************************************************
 */

/**
 * Book page.
 *
 * Parse the book details from the audible book page.
 */
BookPage = class extends Page {
  #category_types = ["Fiction", "Nonfiction"];

  #category_genres = {
    "Arts & Entertainment": "nonfiction",
    "Biographies & Memoirs": "nonfiction",
    "Business & Careers": "nonfiction",
    "Children's Audiobooks": null,
    "Action & Adventure": "fiction", // children"s audiobooks
    "Activities & Hobbies": "nonfiction", // children"s audiobooks
    "Animals & Nature": "nonfiction", // children"s audiobooks
    "Fairy Tales, Folk Tales & Myths": "fiction",
    "Geography & Cultures": "nonfiction",
    "Comedy & Humor": null,
    "Performing Arts": "nonfiction", // comedy & humor
    "Computers & Technology": "nonfiction",
    "Education & Learning": "nonfiction",
    Erotica: null,
    "Sex Instruction": "nonfiction", // erotica
    "Health & Wellness": "nonfiction",
    History: "nonfiction",
    "Home & Garden": "nonfiction",
    "LGBTQ+": "null",
    "LGBTQ+ Studies": "nonfiction",
    "Parenting & Families": "nonfiction",
    "Literature & Fiction": "fiction",
    "Money & Finance": "nonfiction",
    "Mystery, Thriller & Suspense": null,
    "True Crime": "nonfiction", // mystery, thriller & suspense
    Mystery: "fiction", // mystery, thriller & suspense
    "Thriller & Suspense": "fiction", // mystery, thriller & suspense
    "Crime Fiction": "fiction", // mystery, thriller & suspense
    "Politics & Social Sciences": "nonfiction",
    "Politics, Society & Current Events": "nonfiction",
    "Relationships, Parenting & Personal Development": "nonfiction",
    "Religion & Spirituality": "nonfiction",
    Romance: "fiction",
    "Science & Engineering": "nonfiction",
    "Sports & Outdoors": "nonfiction",
    "Teen & Young Adult": null,
    "Health, Lifestyle & Relationships": "nonfiction", // teen & young adult
    "History & Culture": "nonfiction", // teen & young adult
    "Travel & Tourism": "nonfiction",
  };

  #sub_categories = [
    "Science Fiction",
    "Fantasy",
    "LitRPG",
    "True Crime",
    "Mystery",
    "Horror",
    "Epic Fantasy",
    "Satire",
    "Paranormal Romance",
    "Contemporary Romance",
    "Sex Instruction",
    "Romantic Suspense",
    "History & Criticism", // Arts & Entertainment
    "Instruction & Technique", // Arts & Entertainment
    "Historical Fiction",
    "Literary Fiction",
    "Personal Development",
    "Classics",
    "Fairy Tales",
    "Crime Fiction",
    "Fairy Tales, Folk Tales & Myths", // Children's Audiobooks
    "Education & Learning", // Children's Audiobooks
    "Essays", // biographies & Memoiirs
    "Historical", // biographies & Memoiirs
    "Young Adult",
    "Thriller & Suspense",
  ];

  _fields = [
    "id",
    "title",
    "duration_minutes",
    "language",
    "release_date",
    "release_timestamp",
    "publisher",
    "publisher_summary",
    "audible_oginal",
    "book",
    "category_type",
    "main_category",
    "sub_category",
    "categories",
    "rating",
    "num_ratings",
  ];

  _identifers = ["url"];

  #tags = [];
  #json_audiobook = null;
  #json_product = null;

  static async get(url) {
    let page = new Page();
    let doc = await page.fetchDoc(url);
    doc = new Doc(doc);

    if (doc.gt("adbl-product-details").length) {
      page = new ADBLBookPage(doc);
    } else {
      page = new NormalBookPage(doc);
    }

    page.url = url;
    return page;
  }

  constructor(doc = null) {
    super();
    this.doc = doc;
  }

  /* Convert duration string to minutes int.
   *
   * @example
   * page.toMinutes("2 hrs and 25 mins"); // 145
   */
  toMinutes(text) {
    let mins = /\d+(?=\smin)/.exec(text)?.[0] || "0";
    let hours = /\d+(?=\shrs)/.exec(text)?.[0] || "0";
    return parseInt(hours) * 60 + parseInt(mins);
  }

  get json_audiobook() {
    if (!this.#json_audiobook) {
      let scripts = this.doc.qs("script[type='application/ld+json']");
      let s;

      for (s of scripts) {
        let json = JSON.parse(s.innerHTML);
        if (json?.[0]?.["@type"] == "Audiobook") {
          this.#json_audiobook = json[0];
          break;
        }
      }
    }
    return this.#json_audiobook;
  }

  get json_product() {
    if (!this.#json_product) {
      let scripts = this.doc.qs("script[type='application/ld+json']");
      let s;

      for (s of scripts) {
        let json = JSON.parse(s.innerHTML);
        if (json?.[0]?.["@type"] == "Product") {
          this.#json_product = json[0];
          break;
        }
      }
    }
    return this.#json_product;
  }

  get rating() {
    let rating = tryFloat(this.json_audiobook.aggregateRating?.ratingValue);
    return rating ? +rating.toFixed(1) : "";
  }

  get num_ratings() {
    return tryInt(this.json_audiobook.aggregateRating?.ratingCount);
  }

  get id() {
    return this.json_product.productID;
  }

  get date() {
    let date = this.json_audiobook.datePublished;
    if (!date) return null;
    return new Date(`${date}:00:00:01`);
  }

  get release_date() {
    if (!this.date) return null;
    return dateString(this.date);
  }

  get release_timestamp() {
    return this.date.getTime();
  }

  get title() {
    let values = [
      this.json_audiobook?.name,
      this.doc.qsf("meta[property='og:title']")?.content,
    ];
    return first(values);
  }

  get publisher() {
    return this.json_audiobook.publisher;
  }

  get publisher_summary() {
    let text = this.json_audiobook.description;
    if (!text) return null;
    return stripHTML(text);
  }

  get audible_oginal() {
    if (!this.publisher) return null;
    return /^Audible Original/.test(this.publisher);
  }

  get language() {
    let lang = this.json_audiobook.inLanguage;
    return titleCase(lang);
  }

  get categories_list() {
    return [];
  }

  /**
   * The duration in minutes.
   *
   * @type      {number}
   * @abstract
   */
  get duration_minutes() {
    return null;
  }

  /**
   * The book number in a series.
   *
   * @type      {number}
   * @abstract
   */
  get book() {
    return null;
  }

  get tags_list() {
    return [];
  }

  get category_type() {
    // check if the fiction tag is listed in the tags
    for (var genre of this.#category_types) {
      let idx = this.tags_list.indexOf(genre);
      if (idx && idx >= 0) {
        return genre.toLowerCase();
      }
    }

    let all = [...this.categories_list, ...this.tags_list];

    // check if the word "fiction" or "nonfiction" is in any of the categories or tags
    for (let genre of this.#category_types) {
      if (
        all.some((c) => {
          return c.toLowerCase().includes(genre.toLowerCase());
        })
      ) {
        return genre.toLowerCase();
      }
    }

    // get the fiction/nonfiction designation from #category_genres
    for (var label of all) {
      genre = this.#category_genres[label];
      if (genre) {
        return genre.toLowerCase();
      }
    }

    return null;
  }

  get tags() {
    if (!this.#tags.length && this.tags_list) {
      let exclude = [...this.#category_types];
      if (this.main_category) {
        exclude.push(this.main_category);
      }
      this.#tags = this.tags_list.filter((t) => {
        return !exclude.includes(t);
      });
    }
    return this.#tags;
  }

  get main_category() {
    return this.categories_list[0] || null;
  }

  get sub_category() {
    // return the second category if there is one
    if (this.categories_list && this.categories_list.length == 2) {
      return this.categories_list[1];
    }

    // find the first subgenre listed in tags
    let listed_subgenres = [
      ...new Set(this.tags).intersection(new Set(this.#sub_categories)),
    ];
    if (listed_subgenres.length >= 1) {
      return listed_subgenres[0];
    }

    // return the first tag
    return this.tags[0] || null;
  }

  get categories() {
    return this.tags.filter((c) => !this.categories_list.includes(c));
  }
};

/* Book pages which use custom <adbl-*> tags.
 *
 * (Note: Not audible-original books.)
 *
 * @link https://www.audible.com/pd/Ghosts-of-Zenith-Audiobook/B0BL84CBLZ
 *
 */
ADBLBookPage = class extends BookPage {
  get adbl() {
    return this.doc.qs("adbl-product-metadata script");
  }

  get info() {
    return Object.assign(
      {},
      ...this.adbl.map((e) => {
        return JSON.parse(e.textContent);
      }),
    );
  }

  get duration_minutes() {
    return this.toMinutes(this.info.duration);
  }

  // get rating() {
  //   return tryFloat(Number(this.info.rating?.value).toFixed(1));
  // }

  // get date() {
  //   return this.info.releaseDate;
  // }

  // get num_ratings() {
  //   return this.info.rating?.count || "";
  // }

  // book number
  get book() {
    return /Book (\d+)/i.exec(this.info.series?.[0].part)?.[1] || "";
  }

  // get summary() {
  //   return this.doc.qsf("adbl-text-block[slot='summary']").textContent;
  // }

  get categories_list() {
    return this.info.categories?.map((c) => c.name) || [];
  }

  get tags_list() {
    return this.doc
      .qs("adbl-chip-group.product-topictag-impression adbl-chip")
      .map((c) => c.innerHTML);
  }
};

/* Book pages which do not use custom <adbl-*> tags.
 *
 * (Note: Possibly only Audible originals books.)
 *
 * @link https://www.audible.com/pd/Midnight-Riot-Audiobook//B009CZNUGU
 *
 */
NormalBookPage = class extends BookPage {
  // get date() {
  //   let li = this.doc.gcf("releaseDateLabel");
  //   return li?.innerHTML?.replace(/Releae date:/, "").trim();
  // }

  get duration_minutes() {
    let text = this.doc.gcf("runtimeLabel").innerHTML.replace(/length:/i, "");
    return this.toMinutes(text);
  }

  // get rating() {
  //   let elm = this.doc.qsf(".ratingsLabel .bc-pub-offscreen").innerHTML;
  //   let score = /[\d\.]+/.exec(elm)?.[0]
  //   return tryFloat(score);
  // }

  // get num_ratings() {
  //   let elm = this.doc.qsf(".ratingsLabel .bc-color-link");
  //   let text = elm.innerHTML?.trim()
  //   let num = /[\d,]+/.exec(text)[0]?.replace(/\D/, "");
  //   return tryFloat(num);
  // }

  // book number
  get book() {
    return (
      /, Book (\d+)/i.exec(this.doc.gcf("seriesLabel")?.innerHTML)?.[1] || ""
    );
  }

  // get summary() {
  //   let elm = this.doc.qs("#center-1 .bc-container")[1]?.gcf("bc-text")

  //   return (
  //     elm.innerHTML
  //       ?.replace(/([\n\r\s]+|)©.+/, "")
  //       ?.replace(/[\n\r]+(\s+|)/g, "<br>")
  //       ?.replace(/\t/g, " ")
  //       ?.replace(/"/g, "'")
  //   );
  // }

  get tags_list() {
    return this.doc.gc("bc-chip-text").map((c) => {
      return c.attributes["data-text"].value;
    });
  }

  get categories_list() {
    return (
      this.doc.qs(".categoriesLabel a")?.map((c) => {
        return entityDecode(c.innerHTML) || "";
      }) || []
    );
  }
};

/**
 * details-fetcher.js
 * ************************************************************************************
 */

DetailsFetcher = class {
  #books = {};

  constructor(library = null) {
    this.library = library;
    this.#books = null;
    this.pages = [];
  }

  async populate() {
    let book, data;

    let actual = new Timer();
    actual.start();

    let total = this.library.length;

    fireEvent({ total: total });

    let i = 0;

    for (book of this.library) {
      if (!book.url) {
        continue;
      }
      let timer = new Timer();
      timer.start();
      let page = await BookPage.get(book.url.replace("http", "https"));

      page.url = book.url;
      this.pages.push(page);
      i++;

      timer.stop();
      fireEvent({ item_no: i, timer: timer });
    }

    actual.stop();
    fireEvent({ percent: 1 });
    info(
      `DetailsFetcher.populate() took: ${actual.minutes} minutes (${actual.seconds} seconds)`,
    );
  }

  get books() {
    if (!this.#books) {
      this.#books = {};
      let data, page;

      for (page of this.pages) {
        if (!page) continue;

        let data = page.data();
        this.#books[data.id] = data;
      }
    }
    return this.#books;
  }

  set books(value) {
    this.#books = value;
  }
};

/**
 * virtual-file.js
 * ************************************************************************************
 */

VirtualFile = class {
  #contents = null;

  mimetype = null;
  extension = null;

  constructor(contents = null) {
    this.#contents = contents;
  }

  get blob() {
    return new Blob([this.contents], { type: this.mimetype });
  }

  get url() {
    return URL.createObjectURL(this.blob);
  }

  get filename() {
    let ts = new Date().getTime();
    return `audible_${ts}.${this.extension}`;
  }

  get contents() {
    return this.#contents;
  }

  set contents(value) {
    this.#contents = value;
  }
};

/**
 * tsv-file.js
 * ************************************************************************************
 */

TSVFile = class extends VirtualFile {
  #headers = null;
  #rows = null;

  mimetype = "text/tsv";
  extension = "tsv";

  constructor(records = null) {
    super();
    this.records = records;
  }

  get headers() {
    if (!this.records || isEmpty(this.records)) return null;
    if (!this.#headers) {
      this.#headers = Object.keys(this.records[0]).map((h) => this.sanitize(h));
    }
    return this.#headers;
  }

  get rows() {
    if (!this.records || isEmpty(this.records)) return null;
    if (!this.#rows) {
      this.#rows = this.records.map((row) =>
        Object.values(row).map((v) => this.sanitize(v)),
      );
    }
    return this.#rows;
  }

  get contents() {
    if (!this.records || isEmpty(this.records)) return null;

    let lines = [this.headers, ...this.rows];
    let text = lines.map((l) => l.join("\t")).join("\n") + "\n";
    return text;
  }

  sanitize(text) {
    text = text || "";
    text = String(text);

    return text
      .replace(/\t|\v|\f/g, " ")
      .replace(/\r|\n/g, " ")
      .replace(/\0/g, "")
      .replace(/\\/g, "\\\\")
      .replace(/'/g, "\\'")
      .replace(/"/g, '\\"');
  }
};

/**
 * json-file.js
 * ************************************************************************************
 */

JSONFile = class extends VirtualFile {
  #headers = null;
  #rows = null;

  mimetype = "text/json";
  extension = "json";

  constructor(records = null) {
    super();
    this.records = records;
  }

  get contents() {
    if (!this.records || isEmpty(this.records)) return null;
    return JSON.stringify(this.records);
  }
};

/**
 * result.js
 * ************************************************************************************
 */

Result = class {
  #headers = {
    id: ["order", "library", "details"],
    url: ["order", "library"],
    title: ["order", "details", "library"],
    author: ["order", "library"],
    narrator: ["library"],
    series: ["library"],
    book: ["details"],
    publisher: ["details"],
    duration_minutes: ["details"],
    release_date: ["details"],
    release_timestamp: ["details"],
    purchase_date: ["order"],
    language: ["details"],
    publisher_summary: ["details"],
    rating: ["details"],
    num_ratings: ["details"],
    audible_oginal: ["details"],
    category_type: ["details"],
    main_category: ["details"],
    sub_category: ["details"],
    categories: ["details"],
  };

  constructor(library = null, details = null, order = null) {
    this.library = library || {};
    this.details = details || {};
    this.order = order || {};
  }

  first(key) {
    // the objects to look for key in
    let sources = [...this.#headers[key]];

    return sources.reduce((fallback, source, _, arr) => {
      let value = this[source][key];

      // if the key is there, return it and break early
      if (!["null", "undefined"].includes(typeof value)) {
        arr.splice(1);
        return value;
      } else {
        // otherwise, return ""
        return fallback;
      }
    }, "");
  }

  data() {
    return Object.fromEntries(
      Object.keys(this.#headers).map((key) => {
        return [key, this.first(key)];
      }),
    );
  }
};

/**
 * dom.js
 * ************************************************************************************
 */

DOM = class {
  #style = null;
  #css = null;

  constructor() {
    this.#style = null;
    this.#css = null;
    window.ae ||= {};
  }

  get style() {
    if (!this.#style) {
      this.#style = Doc.create("style", {
        id: this.selectors.style,
        type: "text/css",
      });

      if (this.#style.element.styleSheet) {
        // Support for IE
        this.#style.element.styleSheet.cssText = this.css;
      } else {
        // Support for the rest
        let node = document.createTextNode(this.css);
        this.#style.element.appendChild(node);
      }
    }
    return this.#style;
  }

  // add the element to the DOM
  create() {
    let el = Doc.gi(this.selectors.wrapper);
    if (el) el.outerHTML = "";

    document.head.appendChild(this.style.element);
    document.body.appendChild(this.wrapper.element);
  }
};

/**
 * colors.js
 * ************************************************************************************
 */

Colors = class extends DOM {
  #style = null;
  #css = null;

  selectors = { style: "ae-colors", wrapper: "ae-colors" };

  get css() {
    if (!this.#css) {
      this.#css = `
/*
  #colors = {
    darkGray: "#232530",
    offWhite: "#abaab3",
  }
*/

:root {
  /* --ae-dark-green: #14c45a; */
  /* --ae-light-green: #18e76a; */
  /* --ae-emerald-green: #43c26d; */

  --ae-near-black: #1A191B;
  --ae-black-russian: #25242A;

  --ae-dark-green: #07ba5b;
  --ae-emerald-green: #14B762;
  --ae-light-green: #20D174;
  --ae-bright-green: #0aff99;

  --ae-carbon: #333333;
  --ae-dim-gray: #4d4d4d;
  --ae-gray: #808080;
  --ae-basalt-gray: #9a99a1;  /* very close to #999999 */
  --ae-mystic-white: #dce6ef;
  --ae-near-white: #eaeaea;

}
      `;
    }
    return this.#css;
  }

  get wrapper() {
    return this.style;
  }

  create() {
    super.create();
    window.ae.colors ||= this;
  }

  /**
   * Remove the style HTML element from the DOM and the window.ae object.
   */
  remove() {
    this.wrapper.element.remove();
  }
};

/**
 * status-notifier.js
 * ************************************************************************************
 */

StatusNotifier = class extends DOM {
  #wrapper = null;
  #bar = null;
  #status = null;
  #percentage = null;
  #messages = null;
  #context = null;
  #steps = null;
  #estimate = null;
  #style = null;
  #percent = null;

  #item_no = null;
  #total = null;

  step_no = null;
  total_steps = 4;
  estimate_padding = 1.05;
  event_name = "update-ae-notifier";

  times = [];

  selectors = {
    wrapper: "ae-notifier",
    bar: "ae-bar",
    messages: "ae-messages",
    status: "ae-status-text",
    percentage: "ae-percent-text",
    context: "ae-context",
    steps: "ae-steps-text",
    estimate: "ae-estimate-text",
  };

  /* Elements
   ***************************************************************************/

  /**
   * Construct HTML elements.
   *
   * @returns {Doc}
   */
  get wrapper() {
    if (!this.#wrapper) {
      this.#wrapper = Doc.create("div", {
        id: this.selectors.wrapper,
        style: {
          width: `${this.bar_width}px`,
          left: `${(this.body_width - this.bar_width) / 2}px`,
          "z-index": new Date().getTime(),
        },
      });

      this.wrapper.element.appendChild(this.bar.element);
      this.wrapper.element.appendChild(this.context.element);
    }
    return this.#wrapper;
  }

  /**
   * Progress bar element.
   *
   * @returns {Doc}
   */
  get bar() {
    if (!this.#bar) {
      this.#bar = Doc.create("div", { id: this.selectors.bar });
      this.#bar.element.appendChild(this.messages.element);
    }
    return this.#bar;
  }

  /**
   * Div that contains text elements.
   *
   * @returns {Doc}
   */
  get messages() {
    if (!this.#messages) {
      this.#messages = Doc.create("div", {
        id: this.selectors.messages,
        class: "ae-row",
        style: { width: `${this.bar_width}px` },
      });
      this.#messages.element.appendChild(this.status.element);
      this.#messages.element.appendChild(this.percentage.element);
    }
    return this.#messages;
  }

  /**
   * Div that contains status message.
   *
   * @returns {Doc}
   */
  get status() {
    if (!this.#status) {
      this.#status = Doc.create("div", { id: this.selectors.status });
    }
    return this.#status;
  }

  /**
   * Span element that contains percentage text.
   */
  get percentage() {
    if (!this.#percentage) {
      this.#percentage = Doc.create("span", {
        id: this.selectors.percentage,
      });
    }
    return this.#percentage;
  }

  /**
   * Div under the progress bar.
   *
   * @returns {Doc}
   */
  get context() {
    if (!this.#context) {
      this.#context = Doc.create("div", {
        id: this.selectors.context,
        class: "ae-row empty",
      });

      this.#context.element.appendChild(this.steps.element);
      this.#context.element.appendChild(this.estimate.element);
    }
    return this.#context;
  }

  /**
   * Span that contains the "Step x of y" text.
   *
   * @returns {Doc}
   */
  get steps() {
    if (!this.#steps) {
      this.#steps = Doc.create("span", { id: this.selectors.steps });
    }
    return this.#steps;
  }

  /**
   * Span that contains the estimated remaining time.
   *
   * @returns {Doc}
   */
  get estimate() {
    if (!this.#estimate) {
      this.#estimate = Doc.create("span", { id: this.selectors.estimate });
    }
    return this.#estimate;
  }

  /* Accessors
   ***************************************************************************/

  /**
   * The number of the current item being processed.
   *
   * @returns {number}
   */
  get item_no() {
    return this.#item_no;
  }

  /**
   * Set .item_no and update .text and .percent.
   *
   * @param   {number} value  The number of the current item being processed.
   *
   * @returns {number}
   */
  set item_no(value) {
    this.#item_no = value;
    this.text = this.message;
    this.percent = this.ratio;
    this.time = this.time_left;
  }

  /**
   * The total number of items to process.
   */
  get total() {
    return this.#total;
  }

  /**
   * Set .total and update text and percent.
   */
  set total(value) {
    this.#total = value;
    this.text = this.message;
    this.percent = this.ratio;
    this.time = this.time_left;
    this.step = this.step_text;
  }

  /**
   * Get the status message text.
   *
   * @returns {string}
   */
  get text() {
    return this.status.innerText;
  }

  /**
   * Set the status message text.
   *
   * @param {string} message  Message to display.
   */
  set text(message) {
    this.status.innerText = message;
  }

  /**
   * The current percent complete.
   *
   * @returns {float} A value between 0 and 1.0
   */
  get percent() {
    return this.#percent;
  }

  /**
   * Set the percent complete.
   *
   * Set the modal.percent value, the progress bar width, and the percentage
   * text.
   */
  set percent(decimal) {
    if (isNaN(decimal) || !isFinite(decimal)) {
      return;
    }
    this.#percent = decimal;
    let amount = Math.ceil(decimal * 100);
    this.percentage.innerText = `${amount}%`;

    let width = this.bar_width * decimal;
    this.bar.style.width = `${width}px`;
  }

  /**
   * Get the step message text.
   *
   * @returns {string}
   */
  get step() {
    return this.steps.innerText;
  }

  /**
   * Set the step message text.
   *
   * @param {string} message  Message to display.
   */
  set step(message) {
    this.context.classList.remove("empty");
    this.steps.innerText = message;
  }

  /**
   * Get the remaining time message text.
   *
   * @returns {string}
   */
  get time() {
    return this.estimate.innerText;
  }

  /**
   * Set the time message text.
   *
   * @param {string} message  Message to display.
   */
  set time(message) {
    this.context.classList.remove("empty");
    this.estimate.innerText = message;
  }

  /**
   * Add a Timer object to the list of times.
   *
   * @param {Timer} value
   */
  set timer(value) {
    this.times.push(value);
    this.time = this.time_left;
  }

  /* Static getters
   ***************************************************************************/

  /**
   * The message to display to the user.
   *
   * @returns {string}
   */
  get message() {
    return "Initializing...";
  }

  /**
   * The CSS required to render this element.
   *
   * On build, the CSS_MARKER line will be replaced with the contents of
   * notifier.css.
   *
   * @returns {string}
   */
  get css() {
    return `
:root {
  --ae-transparent-black: rgba(0, 0, 0, 0.05);
  --ae-blur-shadow: 0 0 8px 8px var(--ae-transparent-black);
}

#ae-notifier {
  position: fixed;
  top: 100px;
  border-radius: 0.2em;
  font-family: system-ui;
  border: 1px solid var(--ae-light-green);
  background-color: var(--ae-near-black);
}

#ae-notifier.hidden {
  display: none;
}

#ae-bar {
  width: 0;
  height: 50px;
  border-bottom-right-radius: 0.2em;
  border-top-right-radius: 0.2em;
  transition: all 1s;
  border-width: 1px;
  border-style: solid;
  background-color: var(--ae-dark-green);
  border-color: var(--ae-light-green);
  -webkit-animation: pulse 1s linear alternate;
  -webkit-animation-iteration-count: infinite; 
}

#ae-messages {
  padding: 14px;
  color: #fff;
  font-size: 1.1em;
  font-weight: 600;

}

#ae-status-text {
  text-wrap: nowrap;

  -webkit-text-stroke: 0.2px var(--ae-dim-gray);

  background-color: var(--ae-transparent-black);
  box-shadow: var(--ae-blur-shadow);
  -webkit-box-shadow: var(--ae-blur-shadow);
  -moz-box-shadow: var(--ae-blur-shadow);
}

#ae-percent-text {
  color: var(--ae-bright-green);
}

#ae-context.empty {
  height: 0px;
  padding: 0px;
  border-top: 0px;
}

#ae-context{
  font-size: .9em;
  color: #999;
  background: var(--ae-black-russian);
  border-top: 1px solid var(--ae-dim-gray);
  padding: 3px;
}

.ae-row {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

@-webkit-keyframes pulse {
  from { background-color: var(--ae-dark-green); }
  to { background-color: var(--ae-light-green); }
}
    `;
  }

  /* Calculated properties
   ***************************************************************************/

  /**
   * The body width.
   *
   * @returns {number}
   */
  get body_width() {
    return document.body.getBoundingClientRect().width;
  }

  /**
   * The overall width of the progress bar.
   *
   * @returns {number}
   */
  get bar_width() {
    return this.body_width * 0.8;
  }

  /**
   * The "Step x of y" text to display to the user.
   *
   * @returns {string}
   */
  get step_text() {
    if (!this.step_no) {
      return "";
    }

    let text = `Step ${this.step_no} of ${this.total_steps}`;

    if (this.step_desc) {
      text += `: ${this.step_desc}`;
    }

    return `[${text}]`;
  }

  /**
   * The calculated percent complete.
   */
  get ratio() {
    if (!(this.item_no && this.item_no >= 0 && this.total)) {
      return null;
    }
    return this.item_no / this.total;
  }

  /**
   * The number of items still to be processed.
   *
   * @returns {number}
   */
  get remaining() {
    return this.total - this.item_no;
  }

  /**
   * Amount of time it takes to process each item.
   *
   * Calculated as average of elapsed time in all timer objects in .times in
   * milliseconds.
   *
   * @returns {number}
   */
  get per_item() {
    let total = this.times.reduce((sum, t) => sum + t.elapsed, 0);
    return total / this.times.length;
  }

  /**
   * Estimate time left to process remaining items in milliseconds.
   *
   * @return {number}
   */
  get ms_left() {
    return this.remaining * this.per_item * this.estimate_padding;
  }

  /**
   * Estimate time left to process remaining items in minutes.
   *
   * @returns {string}
   */
  get minutes_left() {
    let minutes = (this.ms_left / 1000 / 60).toFixed(1);
    if (minutes == parseInt(minutes)) {
      minutes = parseInt(minutes).toString();
    }
    return minutes;
  }

  /**
   * Message to display to the user of the estimated time left.
   *
   * @returns {string}
   */
  get time_left() {
    if (!(this.times.length && this.item_no != null && this.total)) {
      return "";
    }

    let minutes = this.minutes_left;
    let text;
    if (minutes <= 0.5) {
      text = "less than a minute remaining";
    } else if (minutes <= 1) {
      text = "about a minute remaining";
    } else {
      text = `about ${minutes} minutes remaining`;
    }

    return `${text}`;
  }

  /* Methods
   ***************************************************************************/

  /**
   * Event listener.
   *
   * For each item in the event.detail object, set the window.ae.notifier
   * attribute named key to value.
   */
  listen(evt) {
    let notifier = window.ae.notifier;
    for (let [k, v] of Object.entries(evt.detail)) {
      notifier[k] = v;
    }
  }

  /**
   * Hide the modal element.
   */
  hide() {
    this.wrapper.classList.add("hidden");
  }

  /**
   * Show the modal element.
   */
  show() {
    this.wrapper.classList.remove("hidden");
  }

  /**
   * Add the wrapper HTML element to the DOM.
   *
   * Add the .wrapper element to the DOM, add the update-ae-notifier event
   * listener, and set the intital status text.
   */
  create() {
    let colors = window.ae.colors || new Colors();
    colors.create();
    super.create();

    document.addEventListener(this.event_name, this.listen);
    window.ae.notifier = this;
    this.text = this.message;
    this.step = this.step_text;
  }

  /**
   * Clear all user-visible values and set the percent to zero.
   */
  reset() {
    this.text = "";
    this.percent = 0;
    this.percentage.innerText = "";
    this.estimate.innerText = "";
    this.steps.innerText = "";
  }

  /**
   * Remove the wrapper HTML element from the DOM and remove the event
   * listener.
   */
  remove() {
    document.removeEventListener(this.event_name, this.listen);
    this.wrapper.element.remove();

    this.#wrapper = null;
    this.#bar = null;
    this.#status = null;
    this.#percentage = null;
  }
};

/**
 * modal.js
 * ************************************************************************************
 */

Modal = class extends DOM {
  #css = null;
  #wrapper = null;
  #close_btn = null;
  #ft_select = null;
  #dl_btn = null;
  #file = null;

  selectors = {
    style: "ae-modal-css",
    wrapper: "ae-modal",
    content: "ae-content",
    head: "ae-head",
    close_btn: "ae-close-btn",
    dl_btn: "ae-download-btn",
    ft_select: "ae-filetype",
    actions: "ae-actions",
  };

  get css() {
    if (!this.#css) {
      this.#css = `
:root {
  --ae-box-shadow: 3px 3px 10px 3px;
  --ae-box-shadow-light-bg: var(--ae-box-shadow) var(--ae-dim-gray);
  --ae-box-shadow-dark-bg: var(--ae-box-shadow) var(--ae-carbon);
}

.ae-modal {
  box-sizing: border-box;
  position: fixed;
  font-family: "Cantarell", sans-serif;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: none;
}

.ae-modal .ae-content {
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 50%;
  height: 300px;

  border-radius: 15px;
  box-shadow: 0 3px 15px -2px #222;
  padding: 20px;
  background-color: var(--ae-black-russian);
  color: var(--ae-near-white);
}

.ae-modal .ae-head {
  background-color: var(--ae-near-black);
  padding: 10px;
  border-radius: 10px 10px 0px 0px;
}

.ae-modal h1 {
  color: var(--ae-mystic-white);
  font-size: 1.1rem;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  padding-bottom: 10px;
  text-transform: uppercase;
}

.ae-modal #ae-close-btn {
  color: var(--ae-basalt-gray);
  font-size: 28px;
  font-weight: bold;
  text-decoration: none;
  margin: 0;
  margin-top: -10px;
  align-self: flex-end;
  float: right;
}

#ae-close-btn:hover,
#ae-close-btn:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

#ae-download-btn {
  position: relative;
}

.ae-actions {
  display: flex;
  gap: 10px;
}

#ae-download-btn a.disabled {
  opacity: 0.5;
  pointer-events: none;
  color: white;
}

#ae-download-btn a {
  background-color: var(--ae-emerald-green);
  color: #000;
  cursor: pointer;

  text-decoration: none;
  font-family: sans-serif;
  text-align: center;
  font-size: 0.9em;

  display: inline-block;
  padding: 10px 25px;
  text-indent: 15px;

  box-shadow: var(--ae-box-shadow-light-bg);
  -webkit-box-shadow: var(--ae-box-shadow-light-bg);
  -moz-box-shadow: var(--ae-box-shadow-light-bg);
}

#ae-download-btn a:hover {
  background-color: var(--ae-near-black);
  color: var(--ae-near-white);

  box-shadow: var(--ae-box-shadow-dark-bg);
  -webkit-box-shadow: var(--ae-box-shadow-dark-bg);
  -moz-box-shadow: var(--ae-box-shadow-dark-bg);
}

#ae-download-btn a:before, #ae-download-btn a:after {
  content: ' ';
  display: block;
  position: absolute;
  left: 14px;
  top: 52%;
}

/* Download box shape  */
#ae-download-btn a:before {
  width: 10px;
  height: 2px;
  border-style: solid;
  border-width: 0 2px 2px;
}

#ae-download-btn a:hover:before {
  border-color: var(--ae-emerald-green);
}

/* Download arrow shape */
#ae-download-btn a:after {
  width: 0;
  height: 0;
  margin-left: 1px;
  margin-top: -7px;

  border-style: solid;
  border-width: 4px 4px 0 4px;
  border-color: transparent;
  border-top-color: inherit;
}

#ae-download-btn a:hover:after {
  animation: downloadArrow 2s linear infinite;
  animation-play-state: running;
  border-top-color: var(--ae-emerald-green);
}

@keyframes downloadArrow {
  /* 0% and 0.001% keyframes used as a hackish way of having the button frozen
   * on a nice looking frame by default */

  0% {
    margin-top: -7px;
    opacity: 1;
  }

  0.001% {
    margin-top: -15px;
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    margin-top: 0;
    opacity: 0;
  }
}
      `;
    }
    return this.#css;
  }

  // Construct wrapper div, append all child elements, and return
  get wrapper() {
    if (!this.#wrapper) {
      this.#wrapper = Doc.create("div", { class: this.selectors.wrapper });
      let content = Doc.create("div", { class: this.selectors.content });
      let head = Doc.create("div", { class: this.selectors.head });
      let h1 = Doc.create("h1");
      let p = Doc.create("p");
      let dl_wrapper = Doc.create("span", { id: this.selectors.dl_btn });
      let actions = Doc.create("div", { class: this.selectors.actions });

      h1.innerHTML = "Download";
      p.innerHTML = "Your export is ready!";

      this.wrapper.element.appendChild(content.element);
      head.element.appendChild(this.close_btn.element);
      head.element.appendChild(h1.element);

      actions.element.appendChild(this.ft_select.element);
      actions.element.appendChild(dl_wrapper.element);

      dl_wrapper.element.appendChild(this.dl_btn.element);

      content.element.appendChild(head.element);
      content.element.appendChild(p.element);
      content.element.appendChild(actions.element);

      this.#wrapper.style["z-index"] = new Date().getTime();
    }
    return this.#wrapper;
  }

  get ft_select() {
    if (!this.#ft_select) {
      // create select tag
      let select = Doc.create("select", {
        id: this.selectors.select,
        name: this.selectors.select,
      });

      // add options
      let options = { "": " -- Format -- ", json: "JSON", tsv: "TSV" };
      for (let [ft, label] of Object.entries(options)) {
        let option = Doc.create("option", { value: ft });
        option.innerText = label;
        select.element.append(option.element);
      }

      // add event listener to disable/enable the button when a filetype is
      // selected
      select.element.addEventListener("change", () => {
        let btn = window.ae.modal.dl_btn;
        if (select.value) {
          btn.classList.remove("disabled");
        } else {
          btn.classList.add("disabled");
        }
      });

      this.#ft_select = select;
    }
    return this.#ft_select;
  }

  get close_btn() {
    if (!this.#close_btn) {
      this.#close_btn = Doc.create("a", { id: this.selectors.close_btn });
      this.#close_btn.innerHTML = "&times;";
      this.#close_btn.attributes.href = "#";
      this.#close_btn.element.addEventListener(
        "click",
        () => {
          this.hide();
        },
        false,
      );
    }
    return this.#close_btn;
  }

  get dl_btn() {
    if (!this.#dl_btn) {
      let btn = Doc.create("a", {
        id: this.selectors.dl_btn,
        class: "disabled",
      });
      btn.attributes.href = "#";
      btn.innerHTML = "Download";
      this.#dl_btn = btn;
    }
    return this.#dl_btn;
  }

  get filetype() {
    return this.ft_select.value;
  }

  get file() {
    return this.#file;
  }

  set file(file) {
    this.#file = file;
    this.dl_btn.element.href = file.url;
    this.dl_btn.element.download = file.filename;
    this.dl_btn.element.addEventListener("click", () => {
      setTimeout(() => {
        window.URL.revokeObjectURL(file.url);
      }, 10);
    });
  }

  show() {
    this.#wrapper.style.display = "block";
  }

  hide() {
    this.#wrapper.style.display = "none";
  }

  /**
   * Add the wrapper HTML element to the DOM.
   */
  create() {
    window.ae.modal ||= this;
    let colors = window.ae.colors || new Colors();
    colors.create();
    super.create();
  }
};

/**
 * purchase-history-notifier.js
 * ************************************************************************************
 */

PurchaseHistoryNotifier = class extends StatusNotifier {
  #year = null;
  #years = null;

  step_no = 1;

  constructor(years = null) {
    super();
    this.times = [];
    this.years = years || [];
  }

  get step_desc() {
    let message = "Purchase history";

    if (this.years.length) {
      message += ` since ${this.years.slice(-1)[0]}`;
    }

    return message;
  }

  /**
   * The current year being processed.
   *
   * @returns {string}
   */
  get year() {
    return this.#year;
  }

  /**
   * Set year and update text and percent.
   *
   * @param {string} value  The year being processed.
   */
  set year(value) {
    this.#year = value;
    this.text = this.message;
    this.percent = this.ratio;
    this.time = this.time_left;
  }

  /**
   * A list of years to process.
   *
   * @returns {string[]}
   */
  get years() {
    return this.#years;
  }

  /**
   * Set years and update percent.
   *
   * @param {string[]} value  Array of years to process.
   */
  set years(value) {
    this.#years = value;
    this.percent = this.ratio;
    this.step = this.step_text;
  }

  get item_no() {
    return this.years.indexOf(this.year);
  }

  get total() {
    return this.years.length;
  }

  /**
   * Message to display to the user.
   *
   * @returns {string}
   */
  get message() {
    if (!this.year) {
      return "Retrieving purchase history...";
    }

    return `Retrieving purchase history: ${this.year}`;
  }
};

/**
 * order-notifier.js
 * ************************************************************************************
 */

OrderNotifier = class extends StatusNotifier {
  #year = null;
  #year_page = null;
  #item_no = null;
  #page_count = null;

  step_no = 2;

  constructor(total = null, years = null) {
    super();
    this.total = total;
    this.years = years;
  }

  get step_desc() {
    let message = "Purchases";

    if (this.years && this.years.length) {
      message += ` since ${this.years.slice(-1)[0]}`;
    }

    return message;
  }

  /**
   * The year currently being processed.
   *
   * @returns {string}
   */
  get year() {
    return this.#year;
  }

  /**
   * Set the year and update text.
   *
   * @params {string} value  The year being processed.
   */
  set year(value) {
    this.#year = value;
    this.text = this.message;
  }

  /**
   * The number of the current year's pages being processed.
   *
   * @returns {number}
   */
  get year_page() {
    return this.#year_page;
  }

  /**
   * Set the page_year and update text.
   */
  set year_page(value) {
    this.#year_page = value;
    this.text = this.message;
  }

  /**
   * The number of pages to be processed for the current year.
   *
   * @returns {number}
   */
  get page_count() {
    return this.#page_count;
  }

  /**
   * Set the page_count and update text.
   */
  set page_count(value) {
    this.#page_count = value;
    this.text = this.message;
  }

  /*
   * The message to display to the user.
   *
   * @returns {string}
   */
  get message() {
    if (!this.year) {
      return "Retrieving purchases...";
    }

    let message = `Retrieving ${this.year} purchases`;
    if (this.year_page) {
      message += `: page ${this.year_page}`;
      if (this.page_count) {
        message += ` of ${this.page_count}`;
      } else {
        message += "...";
      }
    } else {
      message += "...";
    }

    return message;
  }
};

/**
 * library-notifier.js
 * ************************************************************************************
 */

LibraryNotifier = class extends StatusNotifier {
  #item_no = null;
  #total = null;

  step_no = 3;

  get step_desc() {
    let message = "Your library";

    if (this.total) {
      message += `, ${this.total} ${this.total > 1 ? "pages" : "page"}`;
    }

    return message;
  }

  /**
   * The message to display to the user.
   *
   * @returns {string}
   */
  get message() {
    if (!this.item_no) {
      return "Retrieving library...";
    }

    let message = `Retrieving library: page ${this.item_no}`;
    if (this.total) {
      message += ` of ${this.total}`;
    } else {
      message += "...";
    }

    return message;
  }
};

/**
 * details-notifier.js
 * ************************************************************************************
 */

DetailsNotifier = class extends StatusNotifier {
  #item_no = null;
  #total = null;

  step_no = 4;

  get step_desc() {
    let message = "Additional details";

    if (this.total) {
      message += `, ${this.total} books`;
    }

    return message;
  }

  /**
   * Status message to display to the user.
   *
   * Depending on status of progress bar may include:
   *
   * - Initial message.
   * - item_no of total
   * - Estimated minutes remaining
   *
   * @returns {string}
   */
  get message() {
    if (!this.item_no) {
      return "Retrieving additional information on titles...";
    }

    return `Retrieving book ${this.item_no} of ${this.total}`;
  }
};

/**
 * exporter.js
 * ************************************************************************************
 */

/**
 * Event listener to create the export file and start the download.
 */
download = () => {
  let exporter = window.ae;
  let modal = exporter.modal;
  if (!modal.filetype) return;
  let klass = exporter.formats[modal.filetype];
  let file = new klass(exporter.results);
  modal.file = file;
  modal.hide();
};

/**
 * Exporter class.
 */
Exporter = class {
  formats = { json: JSONFile, tsv: TSVFile };

  constructor(limit = null) {
    this.limit = limit;
    this.timer = new Timer();
    this.notifier = new StatusNotifier();
    this.colors = new Colors();
    this.modal = new Modal();
    this.orders = new OrdersFetcher();
    this.library = new LibraryFetcher();
    this.details = new DetailsFetcher();
    this.results = [];

    window.ae = this;
  }

  async getPurchaseHistory() {
    let timer = new Timer(null, null, "getPurchaseHistory");
    timer.start();

    this.notifier.remove();
    this.notifier = new PurchaseHistoryNotifier();
    this.notifier.create();

    await this.orders.init(this.limit);

    await delay(1000);
    timer.stop();

    info(
      `getPurchaseHistory() took ${timer.minutes} minutes (${timer.seconds} seconds).`,
    );
  }

  async getOrders() {
    let timer = new Timer();
    timer.start();

    this.notifier.remove();
    this.notifier = new OrderNotifier(
      this.orders.pages.length,
      this.orders.years,
    );
    this.notifier.create();

    await this.orders.populate(this.limit);

    log_table("purchases", this.orders.items);

    await delay(1000);

    timer.stop();
    info(
      `getOrders() took ${timer.minutes} minutes (${timer.seconds} seconds).`,
    );
    return this.orders.items;
  }

  async getLibrary() {
    let timer = new Timer();
    timer.start();

    this.notifier.remove();
    this.notifier = new LibraryNotifier();
    this.notifier.create();
    await this.library.populate(this.limit);

    log_table("library", this.library.books);

    await delay(1000);
    timer.stop();
    info(
      `getLibrary() took ${timer.minutes} minutes (${timer.seconds} seconds).`,
    );
  }

  async getBookDetails() {
    let timer = new Timer();
    timer.start();

    this.notifier.remove();
    this.notifier = new DetailsNotifier();
    this.notifier.create();

    this.details.library = this.library.books;
    await this.details.populate();

    log_table("details", this.details.books);
    await delay(1500);
    timer.stop();
    info(
      `getBookDetails() took ${timer.minutes} minutes (${timer.seconds} seconds).`,
    );
  }

  getResults() {
    let library_info, order_info, book_info, info;
    let results = [];

    for (library_info of this.library.books) {
      book_info = this.details.books[library_info.id];
      order_info = this.orders.items[library_info.id];
      let result = new Result(library_info, book_info, order_info);
      results.push(result.data());
    }

    log_table("Your audible data", results);

    this.results = results;
    return results;
  }

  /**
   * Display the download modal.
   */
  downloadReady() {
    this.notifier.remove();
    this.modal.dl_btn.element.addEventListener("click", download);
    this.modal.show();
  }

  async run(limit = null) {
    try {
      this.timer.start();
      this.limit = limit;

      this.colors.create();
      this.notifier.create();
      this.modal.create();

      await this.getPurchaseHistory();
      await this.getOrders();
      await this.getLibrary();
      await this.getBookDetails();
      this.getResults();

      if (!this.results || this.results.length == 0) {
        error("Failed to download books.");
        return;
      }

      this.timer.stop();

      info(
        `Done. (${this.results.length} results, ${this.timer.minutes} minutes)`,
      );

      this.downloadReady();
    } catch (err) {
      error("Fatal error:", err, err.name, err.message);
    }
  }
};

/**
 * runner.js
 * ************************************************************************************
 */

CONSOLE_OUTPUT = true;

void (async function main() {
  exporter = new Exporter();
  await exporter.run();
})();
