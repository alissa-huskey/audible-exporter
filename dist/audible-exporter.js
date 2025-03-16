var CONSOLE_OUTPUT = true;
var LOG_PREFIX = "[audible-exporter]";

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

  if (!(type in EMPTIES)) {
    throw new Error(`isEmpty() does not support type: ${type} (value: ${o}).`);
  }

  return JSON.stringify(o) == EMPTIES[type];
};

tryFloat = function (o) {
  try {
    let f = parseFloat(o);
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

if (!("first" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "first", {
    get: function () {
      return this[0];
    },
  });
}

if (!("last" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "last", {
    get: function () {
      return this.slice(-1)[0];
    },
  });
}
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
    this.started_at = new Date();
    this.beginning = this.started_at.getTime();
    return this.beginning;
  }

  stop() {
    this.stopped_at = new Date();
    this.end = this.stopped_at.getTime();
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

  get start_time() {
    return this.started_at?.toLocaleTimeString();
  }

  get stop_time() {
    return this.stopped_at?.toLocaleTimeString();
  }

  async time(callback) {
    this.start();
    let result = await callback();
    this.stop();
    return result;
  }
};
/**
 * Domain class.
 *
 * Parses the subdomain, name, second level domain, and top level domain from a
 * host.
 */
Domain = class {
  /**
   * Create a Domain object.
   *
   * @param {string} host  The host portion of the URL.
   *
   * @example
   *
   * new Domain("example.co.uk");
   */
  constructor(host = null) {
    this.host = host;
  }

  /**
   * Create a domain object from a URL.
   *
   * @param {string} address  URL
   * @example
   *
   * Domain.fromURL("http://www.google.com/")
   */
  static fromURL(address) {
    let url = new URL(address);
    let domain = new Domain(url.host);
    domain.url = url;
    return domain;
  }

  /**
   * Array of dot seperated labels that make up the domain name.
   *
   * @example
   * new Domain("example.com").labels == ["example", "com"];
   */
  get labels() {
    return this.host.split(".");
  }

  /**
   * Array of second level domains available for this top level domain.
   */
  get ok_slds() {
    return this.SLDS[this.tld] || [];
  }

  /**
   * Top level domain.
   *
   * @example
   * new Domain("example.com").tld == "com";
   */
  get tld() {
    return this.labels.slice(-1)[0];
  }

  /**
   * Second level domain(s).
   *
   * @example
   * new Domain("example.co.uk").sld == "co";
   */
  get sld() {
    if (!this.ok_slds.length) return "";

    let labels = this.labels.slice(0, -1);
    let i = labels.length - 1;
    let sld;

    do {
      let attempt = labels.slice(i).join(".");

      if (!this.ok_slds.includes(attempt)) {
        break;
      }

      sld = attempt;
      i--;
    } while (i > 0);

    return sld || "";
  }

  /**
   * Domain name.
   *
   * @example
   * new Domain("example.com").name == "example";
   */
  get name() {
    // count of slds + 1 (tld)
    let suffixes = (this.sld ? this.sld.split(".").length : 0) + 1;
    // name is one backwards from there
    let idx = this.labels.length - suffixes - 1;
    return this.labels[idx];
  }

  /**
   * Subdomain(s).
   *
   * @example
   * new Domain("help.example.com").labels == "help";
   */
  get subdomain() {
    let labels = this.labels.slice();
    // number of slds + 1 (tld) + 1 (name)
    let suffixes = (this.sld ? this.sld.split(".").length : 0) + 2;

    // chop off everything starting at the name
    labels.splice(-suffixes);

    // whatever is left is the subdomain
    let subdomain = labels.join(".");
    return subdomain;
  }
};

Domain.prototype.TLDS = [
  "asia",
  "blue",
  "ca",
  "ceo",
  "ch",
  "club",
  "cm",
  "co",
  "com",
  "de",
  "es",
  "fr",
  "in",
  "international",
  "it",
  "jp",
  "lu",
  "mobi",
  "mp",
  "name",
  "net",
  "nyc",
  "org",
  "pink",
  "pk",
  "red",
  "se",
  "si",
  "ws",
];

Domain.prototype.SLDS = {
  es: ["com", "edu", "gob", "nom", "org"],
  fr: [
    "aeroport",
    "avoues",
    "cci",
    "chambagri",
    "chirurgiens-dentistes",
    "experts-comptables",
    "geometre-expert",
    "greta",
    "huissier-justice",
    "medecin",
    "notaires",
    "pharmacien",
    "port",
    "prd",
    "veterinaire",
  ],
  in: [
    "5g",
    "6g",
    "ac",
    "ai",
    "am",
    "bihar",
    "biz",
    "business",
    "ca",
    "cn",
    "co",
    "com",
    "com",
    "coop",
    "cs",
    "delhi",
    "dr",
    "edu",
    "er",
    "ernet",
    "firm",
    "gen",
    "gov",
    "gujarat",
    "ind",
    "info",
    "int",
    "internet",
    "io",
    "me",
    "mil",
    "net",
    "org",
    "pg",
    "post",
    "pro",
    "res",
    "travel",
    "tv",
    "uk",
    "up",
    "us",
  ],
  jp: ["ac", "ad", "co", "ed", "go", "gr", "lg", "ne", "or"],
  pk: [
    "biz",
    "com",
    "edu",
    "fam",
    "gkp",
    "gob",
    "gog",
    "gok",
    "gop",
    "gos",
    "gov",
    "ltd",
    "mil",
    "net",
    "org",
    "res",
    "web",
  ],
  uk: [
    "ac",
    "bl",
    "co",
    "gov",
    "judiciary",
    "ltd",
    "me",
    "mod",
    "net",
    "nhs",
    "nic",
    "org",
    "parliament",
    "plc",
    "police",
    "rct",
    "royal",
    "sch",
    "ukaea",
  ],
  us: ["dni", "fed", "isa", "nsn"],
};
/**
 * Wraper for HTMLElements.
 */

Doc = class {
  /**
   * Constructor.
   *
   * @params {HTMLElement} [elm]
   */
  constructor(elm = null) {
    this.element = elm;

    if (!elm) return;

    for (let k in elm.__proto__) {
      // eslint-disable-next-line no-prototype-builtins
      if (Object.hasOwnProperty(k)) continue;

      if (k in this) continue;

      Object.defineProperty(this, k, {
        get: () => this.element[k],
        set: (v) => {
          this.element[k] = v;
        },
      });
    }
  }

  /**
   * Convert a HTMLCollection of HTMLElements to an Array of Docs.
   *
   * @param {HTMLCollection} collection
   *
   * @returns {Doc[]}
   */
  static toArray(collection) {
    let elements = Array.from(collection);
    return elements.map((item) => new Doc(item));
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

  /**
   * Shorthand for document.getElementsByClassName.
   *
   * @returns {Array}
   */
  static gc(name) {
    return Doc.toArray(document.getElementsByClassName(name));
  }

  /**
   * Shorthand for document.getElementById.
   *
   * @returns {Doc}
   */
  static gi(name) {
    let node = document.getElementById(name);
    return new Doc(node);
  }

  /**
   * Shorthand for document.getElementsByTagName.
   *
   * @returns {Array}
   */
  static gt(name) {
    return Doc.toArray(document.getElementsByTagName(name));
  }

  /**
   * Shorthand for document.querySelector.
   *
   * @returns {Doc}
   */
  static qs(query) {
    let res = document.querySelector(query);
    return new Doc(res);
  }

  /**
   * Shorthand for document.querySelectorAll.
   *
   * @returns {Array}
   */
  static qsa(query) {
    let res = document.querySelectorAll(query);
    return Doc.toArray(res);
  }

  /**
   * Shorthand for element.getElementsByClassName.
   *
   * @returns {Array}
   */
  gc(name) {
    if (!this.element) return [];

    let res = this.element.getElementsByClassName(name);
    return Doc.toArray(res);
  }

  /**
   * Shorthand for element.getElementById.
   *
   * @returns {Doc}
   */
  gi(name) {
    return Doc.gi(name);
  }

  /**
   * Shorthand for element.getElementsByTagName.
   *
   * @returns {Array}
   */
  gt(name) {
    if (!this.element) return [];

    let res = this.element.getElementsByTagName(name);
    return Doc.toArray(res);
  }

  /**
   * Shorthand for element.querySelectorAll.
   *
   * @returns {Array}
   */
  qs(query) {
    let res = this.element.querySelectorAll(query);
    return Doc.toArray(res);
  }

  /**
   * First result of element.getElementsByClassName.
   *
   * @returns {Doc}
   */
  gcf(name) {
    return this.gc(name)[0];
  }

  /**
   * First result of element.getElementsByTagName.
   *
   * @returns {Doc}
   */
  gtf(name) {
    return this.gt(name)[0];
  }

  /**
   * Shorthand for element.querySelector.
   *
   * @returns {Doc}
   */
  qsf(query) {
    let res = this.element.querySelector(query);
    return new Doc(res);
  }

  /**
   * Shortcut for this.element.append().
   *
   * @params {...Doc,HTMLElement,string}  Child or children to append.
   */
  append(...children) {
    children.forEach((child) => {
      if (child instanceof Doc) {
        child = child.element;
      }
      this.element.append(child);
    });
  }

  /**
   * Shortcut for this.element.addEventListener().
   *
   * @params {...args}  args to pass along
   */
  listen(...args) {
    this.element.addEventListener(...args);
  }

  /**
   * Set attributes.
   *
   * @param {string, object} attrs  An object of attr names and values, or a
   *                                   single attribute name.
   * @param {string}         value  The value to set, when attrs is a string.
   *
   * @example
   *
   * doc.set("id", "thing-1");
   * doc.set({id: "thing-2", "class": "small"});
   */
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

      if (!(value instanceof Doc)) {
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
 * Book page.
 *
 * Parse the book details from an audible book page.
 *
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

  /**
   * Fetch the book page and return the BookPage object.
   *
   * @param {string} url
   *
   * @returns {BookPage}
   */
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
 * Fetch all book details.
 *
 * Fetch book pages to gather additional details for all objects in the library
 * array.
 */

DetailsFetcher = class {
  #books = {};

  /**
   * Constructor.
   *
   * @params {object[]} [library]  List of objects that contain a url key.
   */
  constructor(library = null) {
    this.library = library;
    this.#books = null;
    this.pages = [];
  }

  /**
   * Fetch the book pages and fire events to update the DetailsNotifier.
   *
   * @fires update-ae-notifier
   */
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

  /**
   * Getter for the list of book data.
   *
   * @returns {object}  Book data keyed by audible book ID.
   */
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

  /**
   * Setter for the list of book data.
   *
   * @param {object}  Book data keyed by audible book ID.
   */
  set books(value) {
    this.#books = value;
  }
};
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
        this.doc.attributes?.[attr]?.value,
      ]),
    );
  }
};
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
 * Manage elements in the DOM.
 */

DOM = class {
  constructor() {
    window.ae ||= {};

    ["id", "class", "classList"].forEach((k) => {
      Object.defineProperty(this, k, {
        get: () => this.wrapper[k],
        set: (v) => {
          this.wrapper[k] = v;
        },
      });
    });
  }

  /**
   * Add the element to the DOM.
   */
  create() {
    let el = Doc.gi(this.selectors.wrapper);
    if (el) el.outerHTML = "";

    document.body.appendChild(this.wrapper.element);
  }

  /**
   * Remove the wrapper HTML element from the DOM.
   */
  remove() {
    this.wrapper.element.remove();
  }

  /**
   * Create an element with innerHTML.
   *
   * @params   {string}  tag     tag name
   * @params   {string}  html    inner HTML
   * @params   {attrs}   object  element attributes
   *
   * @returns  {Doc}
   */
  elmWithInner(tag, html, attrs = {}) {
    let elm = Doc.create(tag, attrs);
    elm.innerHTML = html;
    return elm;
  }

  /**
   * Create a paragraph element.
   *
   * @params   {string}  html    inner HTML
   * @params   {attrs}   object  element attributes
   *
   * returns {Doc}
   */
  p(html, attrs = {}) {
    return this.elmWithInner("p", html, attrs);
  }

  /**
   * Create a list element.
   *
   * @params   {string}  html    inner HTML
   * @params   {attrs}   object  element attributes
   *
   * returns {Doc}
   */
  li(html, attrs = {}) {
    return this.elmWithInner("li", html, attrs);
  }

  /**
   * Create a list element.
   *
   * @params   {string}  html    inner HTML
   * @params   {attrs}   object  element attributes
   *
   * returns {Doc}
   */
  h1(html, attrs = {}) {
    return this.elmWithInner("h1", html, attrs);
  }

  /**
   * Create a button element.
   *
   * @params   {string}     text    inner text
   * @params   {attrs}      object  element attributes
   *
   * returns {Doc}
   */
  button(text, attrs = {}) {
    attrs.class = attrs.class ? `ae-btn ${attrs.class}` : "ae-btn";

    let btn = Doc.create("button", attrs);
    btn.innerText = text;
    return btn;
  }
};
/**
 * Create a <style> tag for CSS.
 */

Style = class extends DOM {
  #wrapper = null;
  #css = null;

  selectors = { wrapper: "ae-style" };

  /**
   * The CSS.
   *
   * On build, the CSS_MARKER line will be replaced with the contents of
   * notifier.css.
   *
   * @returns {string}
   */
  get css() {
    if (!this.#css) {
      this.#css = `
/* Colors
 *******************************************************************************/

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

  --ae-red: #bf1d25;
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

.ae-wrapper {

  font-size: 14px;

  *,:after,:before {
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  &.hidden, .hidden {
    display: none;
  }

  .ae-row {
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-between;
  }
}

/* Modals
 *******************************************************************************/

:root {
  --ae-box-shadow: 3px 3px 10px 3px;
  --ae-box-shadow-light-bg: var(--ae-box-shadow) var(--ae-dim-gray);
  --ae-box-shadow-dark-bg: var(--ae-box-shadow) var(--ae-carbon);
}

.ae-wrapper {
  background-color: transparent;
  margin: 0;
  padding: 0;
  border: 0;

  &.ae-modal {

    /* Shared
     ------------------------------------------------------------------------------*/

    box-sizing: border-box;
    position: fixed;
    font-family: "Cantarell", sans-serif;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;

    h1 {
      color: var(--ae-mystic-white);
      font-size: 1.2rem;
      font-weight: 600;
      line-height: normal;
      margin: 0;
      padding-bottom: 10px;
      text-transform: uppercase;
    }

    .ae-btn a, .ae-btn button, button.ae-btn {
      background-color: var(--ae-emerald-green);
      color: #000;
      cursor: pointer;

      font-size: 1em;
      font-family: system-ui;
      font-weight: 600;
      text-transform: uppercase;

      text-decoration: none;
      text-align: center;
      padding: 10px 25px;

      display: inline-block;

      border-width: 0;
      border-radius: 4px;
      box-shadow: var(--ae-box-shadow-light-bg);
      -webkit-box-shadow: var(--ae-box-shadow-light-bg);
      -moz-box-shadow: var(--ae-box-shadow-light-bg);

      &:focus-visible {
        outline-width: 0;
      }

      &:hover {
        background-color: var(--ae-near-black);
        color: var(--ae-near-white);
        text-decoration: none;

        box-shadow: var(--ae-box-shadow-dark-bg);
        -webkit-box-shadow: var(--ae-box-shadow-dark-bg);
        -moz-box-shadow: var(--ae-box-shadow-dark-bg);
      }

      &.disabled, &:disabled {
        opacity: 0.5;
        pointer-events: none;
        color: white;
      }
    }

    .ae-close-btn {
      color: var(--ae-basalt-gray);
      border-width: 0;
      font-size: 28px;
      font-weight: bold;
      text-decoration: none;
      margin: 0;
      margin-top: -10px;
      align-self: flex-end;
      float: right;

      /* for buttons */
      background-color: transparent;
      padding-inline: 0;
      padding-block: 0;

      &:focus-visible {
        outline-width: 0;
      }

      &:hover, &:active {
        color: #000;
        text-decoration: none;
        cursor: pointer;
      }
    }

    .ae-content {
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);

      width: 500px;
      max-width: 90%;

      border-radius: 15px;
      box-shadow: 0 3px 15px -2px #222;
      padding: 20px;

      background-color: var(--ae-black-russian);
      color: var(--ae-near-white);
      font-size: 1.1em;

      /* form element */
      block-size: auto;
    }

    .ae-copy {
      background-color: var(--ae-near-black);
      padding: 25px;
      margin: 20px;
      border-radius: 15px;
    }

    .ae-actions {
      display: flex;
      gap: 15px;
      margin: 30px 20px;
    }

    /* Error Modal
     ------------------------------------------------------------------------------*/

    &.ae-error {
      &.ae-content {
        width: unset;
      }

      .ae-content {
        border: 1px solid var(--ae-red);
      }

      .ae-actions {
        justify-content: center;

        a, button {
          background-color: var(--ae-basalt-gray);

          &:hover {
            background-color: var(--ae-near-black);
          }
        }
      }

      h1 {
        color: var(--ae-red);
        text-transform: none;
        font-weight: normal;
      }

    }

    /* Start Modal
     ------------------------------------------------------------------------------*/

    &#ae-start-modal {

      .ae-head {
        background-color: unset;
      }

      .ae-content {
        height: unset;

        .ae-actions {
          justify-content: center;
        }
      }

      ul {
        padding-left: 40px;
        margin: 30px 0;

        ::marker {
          font-size: 1.3em;
          color: var(--ae-light-green);

          /* NOTE: Double-escaped here because this will be embedded in JS. */
          content: "\\027B2   ";  /* ➲ */
        }
      }

      li {
        line-height: 1.7em;
      }

      span#ae-start-btn {
        width: 100%;
        display: flex;
        justify-content: center;
      }
    }

    /* Download Modal
     ------------------------------------------------------------------------------*/

    &#ae-download-modal {
      .ae-head {
        background-color: var(--ae-near-black);
        padding: 10px;
        border-radius: 10px 10px 0px 0px;
      }

      .ae-copy {
        background-color: transparent;
        padding: 0;
      }

      .ae-actions {
        flex-wrap: wrap;

        select {
          padding: 8px;
        }
      }

      .ae-download-btn a,
      .ae-download-btn button:enabled {
        position: relative;
        padding: 10px 25px;
        text-indent: 15px;

        &:before,
        &:after {
          content: " ";
          display: block;
          position: absolute;
          left: 14px;
          top: 52%;
        }

        /* Download box shape  */
        &:before {
          width: 10px;
          height: 2px;
          border-style: solid;
          border-width: 0 2px 2px;
        }

        /* Download arrow shape */
        &:after {
          width: 0;
          height: 0;
          margin-left: 1px;
          margin-top: -7px;

          border-style: solid;
          border-width: 4px 4px 0 4px;
          border-color: transparent;
          border-top-color: inherit;
        }

        &:hover:before {
          border-color: var(--ae-emerald-green);
        }

        &:hover:after {
          animation: downloadArrow 2s linear infinite;
          animation-play-state: running;
          border-top-color: var(--ae-emerald-green);
        }
      }
    }
  }
}

/* Keyframes
 ------------------------------------------------------------------------------*/

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

/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */

.ae-wrapper {

  /* Sections
     ========================================================================== */

  /**
   * Correct the font size and margin on 'h1' elements within 'section' and
   * 'article' contexts in Chrome, Firefox, and Safari.
   */

  h1 {
    font-size: 2em;
    margin: 0.67em 0;
  }

  /* Grouping content
     ========================================================================== */

  /**
   * 1. Add the correct box sizing in Firefox.
   * 2. Show the overflow in Edge and IE.
   */

  hr {
    box-sizing: content-box; /* 1 */
    height: 0; /* 1 */
    overflow: visible; /* 2 */
  }

  /**
   * 1. Correct the inheritance and scaling of font size in all browsers.
   * 2. Correct the odd 'em' font sizing in all browsers.
   */

  pre {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  /* Text-level semantics
     ========================================================================== */

  /**
   * Remove the gray background on active links in IE 10.
   */

  a {
    background-color: transparent;
  }

  /**
   * 1. Remove the bottom border in Chrome 57-
   * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.
   */

  abbr[title] {
    border-bottom: none; /* 1 */
    text-decoration: underline; /* 2 */
    text-decoration: underline dotted; /* 2 */
  }

  /**
   * Add the correct font weight in Chrome, Edge, and Safari.
   */

  b,
  strong {
    font-weight: bolder;
  }

  /**
   * 1. Correct the inheritance and scaling of font size in all browsers.
   * 2. Correct the odd 'em' font sizing in all browsers.
   */

  code,
  kbd,
  samp {
    font-family: monospace, monospace; /* 1 */
    font-size: 1em; /* 2 */
  }

  /**
   * Add the correct font size in all browsers.
   */

  small {
    font-size: 80%;
  }

  /**
   * Prevent 'sub' and 'sup' elements from affecting the line height in
   * all browsers.
   */

  sub,
  sup {
    font-size: 75%;
    line-height: 0;
    position: relative;
    vertical-align: baseline;
  }

  sub {
    bottom: -0.25em;
  }

  sup {
    top: -0.5em;
  }

  /* Embedded content
     ========================================================================== */

  /**
   * Remove the border on images inside links in IE 10.
   */

  img {
    border-style: none;
  }

  /* Forms
     ========================================================================== */

  /**
   * 1. Change the font styles in all browsers.
   * 2. Remove the margin in Firefox and Safari.
   */

  button,
  input,
  optgroup,
  select,
  textarea {
    font-family: inherit; /* 1 */
    font-size: 100%; /* 1 */
    line-height: 1.15; /* 1 */
    margin: 0; /* 2 */
  }

  /**
   * Show the overflow in IE.
   * 1. Show the overflow in Edge.
   */

  button,
  input { /* 1 */
    overflow: visible;
  }

  /**
   * Remove the inheritance of text transform in Edge, Firefox, and IE.
   * 1. Remove the inheritance of text transform in Firefox.
   */

  button,
  select { /* 1 */
    text-transform: none;
  }

  /**
   * Correct the inability to style clickable types in iOS and Safari.
   */

  button,
  [type="button"],
  [type="reset"],
  [type="submit"] {
    -webkit-appearance: button;
  }

  /**
   * Remove the inner border and padding in Firefox.
   */

  button::-moz-focus-inner,
  [type="button"]::-moz-focus-inner,
  [type="reset"]::-moz-focus-inner,
  [type="submit"]::-moz-focus-inner {
    border-style: none;
    padding: 0;
  }

  /**
   * Restore the focus styles unset by the previous rule.
   */

  button:-moz-focusring,
  [type="button"]:-moz-focusring,
  [type="reset"]:-moz-focusring,
  [type="submit"]:-moz-focusring {
    outline: 1px dotted ButtonText;
  }

  /**
   * Correct the padding in Firefox.
   */

  fieldset {
    padding: 0.35em 0.75em 0.625em;
  }

  /**
   * 1. Correct the text wrapping in Edge and IE.
   * 2. Correct the color inheritance from 'fieldset' elements in IE.
   * 3. Remove the padding so developers are not caught out when they zero out
   *    'fieldset' elements in all browsers.
   */

  legend {
    box-sizing: border-box; /* 1 */
    color: inherit; /* 2 */
    display: table; /* 1 */
    max-width: 100%; /* 1 */
    padding: 0; /* 3 */
    white-space: normal; /* 1 */
  }

  /**
   * Add the correct vertical alignment in Chrome, Firefox, and Opera.
   */

  progress {
    vertical-align: baseline;
  }

  /**
   * Remove the default vertical scrollbar in IE 10+.
   */

  textarea {
    overflow: auto;
  }

  /**
   * 1. Add the correct box sizing in IE 10.
   * 2. Remove the padding in IE 10.
   */

  [type="checkbox"],
  [type="radio"] {
    box-sizing: border-box; /* 1 */
    padding: 0; /* 2 */
  }

  /**
   * Correct the cursor style of increment and decrement buttons in Chrome.
   */

  [type="number"]::-webkit-inner-spin-button,
  [type="number"]::-webkit-outer-spin-button {
    height: auto;
  }

  /**
   * 1. Correct the odd appearance in Chrome and Safari.
   * 2. Correct the outline style in Safari.
   */

  [type="search"] {
    -webkit-appearance: textfield; /* 1 */
    outline-offset: -2px; /* 2 */
  }

  /**
   * Remove the inner padding in Chrome and Safari on macOS.
   */

  [type="search"]::-webkit-search-decoration {
    -webkit-appearance: none;
  }

  /**
   * 1. Correct the inability to style clickable types in iOS and Safari.
   * 2. Change font properties to 'inherit' in Safari.
   */

  ::-webkit-file-upload-button {
    -webkit-appearance: button; /* 1 */
    font: inherit; /* 2 */
  }

  /* Interactive
     ========================================================================== */

  /*
   * Add the correct display in Edge, IE 10+, and Firefox.
   */

  details {
    display: block;
  }

  /*
   * Add the correct display in all browsers.
   */

  summary {
    display: list-item;
  }

  /* Misc
     ========================================================================== */

  /**
   * Add the correct display in IE 10+.
   */

  template {
    display: none;
  }

  /**
   * Add the correct display in IE 10.
   */

  [hidden] {
    display: none;
  }
}

/* Notifiers
 *******************************************************************************/

:root {
  --ae-transparent-black: rgba(0, 0, 0, 0.05);
  --ae-blur-shadow: 0 0 8px 8px var(--ae-transparent-black);
}

.ae-notifier {
  position: fixed;
  top: 100px;
  border-radius: 0.2em;
  font-family: system-ui;
  border: 1px solid var(--ae-light-green);
  background-color: var(--ae-near-black);

  .ae-bar {
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

  .ae-messages {
    padding: 14px;
    color: #fff;
    font-size: 1.1em;
    font-weight: 600;
  }

  .ae-status-text {
    text-wrap: nowrap;

    -webkit-text-stroke: 0.2px var(--ae-dim-gray);

    background-color: var(--ae-transparent-black);
    box-shadow: var(--ae-blur-shadow);
    -webkit-box-shadow: var(--ae-blur-shadow);
    -moz-box-shadow: var(--ae-blur-shadow);
  }

  .ae-percent-text {
    color: var(--ae-bright-green);
  }

  .ae-context {
    font-size: .9em;
    color: #999;
    background: var(--ae-black-russian);
    border-top: 1px solid var(--ae-dim-gray);
    padding: 3px;

    &.empty {
      height: 0px;
      padding: 0px;
      border-top: 0px;
    }
  }
}

@-webkit-keyframes pulse {
  from { background-color: var(--ae-dark-green); }
  to { background-color: var(--ae-light-green); }
}
      `;
    }
    return this.#css;
  }

  /**
   * Construct the style element.
   *
   * The contents come from the css getter defined on subclasses.
   *
   * @returns {Doc}
   */
  get wrapper() {
    if (!this.#wrapper) {
      this.#wrapper = Doc.create("style", {
        id: this.selectors.wrapper,
        type: "text/css",
      });

      if (this.#wrapper.element.styleSheet) {
        // Support for IE
        this.#wrapper.element.styleSheet.cssText = this.css;
      } else {
        // Support for the rest
        let node = document.createTextNode(this.css);
        this.#wrapper.append(node);
      }
    }
    return this.#wrapper;
  }

  /**
   * Add the style HTML element to the DOM.
   *
   * Special case because this is added to the head, not the body.
   */
  create() {
    document.head.appendChild(this.wrapper.element);
    window.ae.style ||= this;
  }
};
Styled = class extends DOM {
  create() {
    super.create();
    if (!window.ae.style) {
      let style = new Style();
      style.create();
      window.ae.style = style;
    }
  }
};
/**
 * Modal dialog box.
 */

Dialog = class extends Styled {
  #wrapper = null;
  #head = null;
  #content = null;
  #copy = null;
  #actions = null;
  #close_btn = null;

  title = "";

  #selectors = {
    wrapper: "ae-modal",
    content: "ae-content",
    head: "ae-head",
    copy: "ae-copy",
    actions: "ae-actions",
    close_btn: "ae-close-btn",
  };

  get selectors() {
    return this.#selectors;
  }

  /* Elements
   ***************************************************************************/

  /**
   * Construct wrapper div, append all child elements.
   *
   * @returns {Doc}
   */
  createWrapper(id) {
    let wrapper = Doc.create("dialog", {
      class: "ae-wrapper ae-modal",
    });
    if (id) wrapper.id = id;

    wrapper.append(this.content);

    return wrapper;
  }

  get wrapper() {
    if (!this.#wrapper) {
      this.#wrapper = this.createWrapper();
    }
    return this.#wrapper;
  }

  /**
   * div element for the main content.
   */
  get content() {
    if (!this.#content) {
      let content = Doc.create("form", {
        class: this.selectors.content,
        method: "dialog",
      });

      content.append(this.head);
      content.append(this.copy);

      this.#content = content;
    }
    return this.#content;
  }

  /**
   * div element for the head section.
   */
  get head() {
    if (!this.#head) {
      let head = Doc.create("div", { class: this.selectors.head });

      head.append(this.close_btn);

      this.#head = head;
    }
    return this.#head;
  }

  /**
   * div element for the copy section.
   *
   * @returns {Doc}
   */
  get copy() {
    if (!this.#copy) {
      this.#copy = Doc.create("div", { class: this.selectors.copy });
    }
    return this.#copy;
  }

  /**
   * div element for the interactive elements.
   *
   * @returns {Doc}
   */
  get actions() {
    if (!this.#actions) {
      let actions = Doc.create("div", { class: this.selectors.actions });

      this.#actions = actions;
    }
    return this.#actions;
  }

  /**
   * Close button element.
   *
   * @listens click
   *
   * @returns {Doc}
   */
  get close_btn() {
    if (!this.#close_btn) {
      let btn = Doc.create("button", {
        class: this.selectors.close_btn,
        formmethod: "dialog",
      });
      btn.innerHTML = "&times;";
      this.#close_btn = btn;
    }
    return this.#close_btn;
  }

  /* Methods
   ***************************************************************************/

  /**
   * Show the dialog.
   */
  show() {
    this.wrapper.element.showModal();
  }

  /**
   * Hide the dialog.
   */
  hide() {
    this.wrapper.element.close();
  }

  /**
   * Add the wrapper HTML element to the DOM and display.
   */
  create() {
    super.create();
    window.ae.modal = this;
    this.show();
  }
};
/**
 * Modal dialog box.
 */

ErrorDialog = class extends Dialog {
  #wrapper = null;
  #head = null;
  #content = null;
  #close_btn = null;
  #copy = null;

  constructor(paragraphs = []) {
    super();
    this.paragraphs = paragraphs;
  }

  /* Elements
   ***************************************************************************/

  /**
   * Construct wrapper dialog element and append all its child elements.
   *
   * @returns {Doc}
   */
  get wrapper() {
    if (!this.#wrapper) {
      let wrapper = super.wrapper;
      wrapper.classList.add("ae-error");
      this.#wrapper = wrapper;
    }
    return this.#wrapper;
  }

  /**
   * div element for the head section.
   */
  get head() {
    if (!this.#head) {
      let head = super.head;

      head.append(this.h1("Oh no!"));

      this.#head = head;
    }
    return this.#head;
  }

  /**
   * div element for the copy section.
   *
   * @returns {Doc}
   */
  get copy() {
    if (!this.#copy) {
      this.#copy = super.copy;

      this.paragraphs.forEach((text) => {
        this.#copy.append(this.p(text));
      });
    }
    return this.#copy;
  }
};
/**
 * Modal pop-up window for starting the exporter.
 */

StartDialog = class extends Dialog {
  #wrapper = null;
  #content = null;
  #actions = null;
  #close_btn = null;
  #ft_select = null;
  #start_btn = null;
  #file = null;

  #selectors = {
    start_btn: "ae-start-btn",
  };

  get selectors() {
    return Object.assign({}, super.selectors, this.#selectors);
  }

  /* Elements
   ***************************************************************************/

  /**
   * Construct wrapper div, append all child elements.
   *
   * @returns {Doc}
   */
  get wrapper() {
    if (!this.#wrapper) {
      this.#wrapper = this.createWrapper("ae-start-modal");
    }
    return this.#wrapper;
  }

  /**
   * The div element for the main content of the modal.
   *
   * @returns {Doc}
   */
  get content() {
    if (!this.#content) {
      let content = super.content;

      let ul = Doc.create("ul");

      content.append(this.copy);

      let need = [
        "be on audible.com and logged in.",
        "not close this browser window.",
        "not navigate away from this page.",
        "stay online (avoid sleep mode).",
      ];

      ul.append(...need.map((text) => this.li(text)));

      this.copy.append(
        this.p("This will export your audible library. It might take awhile."),
        this.p("Until it's done, you must:"),
        ul,
        this.p("Click the button to get started!"),
        this.actions,
      );

      this.#content = content;
    }
    return this.#content;
  }

  get actions() {
    if (!this.#actions) {
      this.#actions = super.actions;
      this.#actions.append(this.start_btn);
    }
    return this.#actions;
  }

  get start_btn() {
    if (!this.#start_btn) {
      let btn = this.button("Start", { id: this.selectors.start_btn });

      btn.listen("click", this.start, false);

      this.#start_btn = btn;
    }
    return this.#start_btn;
  }

  /**
   * Event listner to start the exporter.
   */
  async start(evt) {
    window.ae?.modal?.hide();

    if (window.ae?.run) {
      await window.ae.run();
    }
  }
};
/**
 * Modal pop-up window for downloading the export.
 */

DownloadDialog = class extends Dialog {
  #wrapper = null;
  #head = null;
  #content = null;
  #copy = null;
  #actions = null;
  #ft_select = null;
  #dl_btn = null;
  #file = null;

  #selectors = {
    ft_select: "ae-filetype",
    dl_btn: "ae-download-btn",
  };

  get selectors() {
    return Object.assign({}, super.selectors, this.#selectors);
  }

  /* Elements
   ***************************************************************************/

  /**
   * div element for the head section.
   */
  get head() {
    if (!this.#head) {
      let head = super.head;

      head.append(this.h1("Download"));

      this.#head = head;
    }
    return this.#head;
  }

  get wrapper() {
    if (!this.#wrapper) {
      this.#wrapper = this.createWrapper("ae-download-modal");
    }

    return this.#wrapper;
  }

  /**
   * The div element for the main content of the modal.
   *
   * @returns {Doc}
   */
  get content() {
    if (!this.#content) {
      let content = super.content;

      content.append(this.copy);

      this.#content = content;
    }
    return this.#content;
  }

  /**
   * Div that contains text content and actions.
   *
   * @returns {Doc}
   */
  get copy() {
    if (!this.#copy) {
      this.#copy = super.copy;
      this.copy.append(this.p("Your export is ready!"), this.actions);
    }
    return this.#copy;
  }

  /**
   * Div that contains the dropdown and download button.
   *
   * @returns {Doc}
   */
  get actions() {
    if (!this.#actions) {
      this.#actions = super.actions;

      let span = Doc.create("span", {
        class: `${this.selectors.dl_btn} ae-btn`,
      });
      span.append(this.dl_btn);

      this.actions.append(this.ft_select, span);
    }
    return this.#actions;
  }

  get ft_select() {
    if (!this.#ft_select) {
      // create select tag
      let select = Doc.create("select", {
        id: this.selectors.ft_select,
        name: this.selectors.ft_select,
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
      select.listen("change", () => {
        let btn = window.ae.modal.dl_btn;
        if (select.value) {
          btn.classList.remove("disabled");
          btn.disabled = false;
        } else {
          btn.classList.add("disabled");
          btn.disabled = true;
        }
      });

      this.#ft_select = select;
    }
    return this.#ft_select;
  }

  /**
   * Download button element.
   *
   * Note: This has to be an <a> instead of a <button> in order to accomidate
   *       file downloading.
   *
   * @returns {Doc}
   */
  get dl_btn() {
    if (!this.#dl_btn) {
      let btn = Doc.create("a", {
        id: this.selectors.dl_btn,
        class: "ae-btn disabled",
      });

      btn.href = "#";
      btn.innerText = "Download";
      this.#dl_btn = btn;
    }
    return this.#dl_btn;
  }

  get filetype() {
    return this.ft_select.value;
  }

  /**
   * Getter for the file that will be downloaded.
   *
   * @returns {VirtualFile}
   */
  get file() {
    return this.#file;
  }

  /**
   * Setter for the file that will be downloaded.
   *
   * Set the file, set the attributes on the download button to make it work,
   * and add the event listener to get rid of the generated URL once it has
   * been used.
   *
   * @param {VirtualFile} file
   */
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
};
Notifier = class extends Styled {
  #wrapper = null;
  #bar = null;
  #status = null;
  #percentage = null;
  #messages = null;
  #context = null;
  #steps = null;
  #estimate = null;
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
        class: "ae-wrapper ae-notifier",
        style: {
          width: `${this.bar_width}px`,
          left: `${(this.body_width - this.bar_width) / 2}px`,
          "z-index": new Date().getTime(),
        },
      });

      this.wrapper.append(this.bar, this.context);
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
      this.#bar = Doc.create("div", { class: this.selectors.bar });
      this.#bar.append(this.messages);
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
        class: `${this.selectors.messages} ae-row`,
        style: { width: `${this.bar_width}px` },
      });
      this.#messages.append(this.status, this.percentage);
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
      this.#status = Doc.create("div", { class: this.selectors.status });
    }
    return this.#status;
  }

  /**
   * Span element that contains percentage text.
   */
  get percentage() {
    if (!this.#percentage) {
      this.#percentage = Doc.create("span", {
        class: this.selectors.percentage,
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
        class: `${this.selectors.context} ae-row empty`,
      });

      this.#context.append(this.steps, this.estimate);
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
    super.remove();

    this.#wrapper = null;
    this.#bar = null;
    this.#status = null;
    this.#percentage = null;
  }
};
PurchaseHistoryNotifier = class extends Notifier {
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
OrderNotifier = class extends Notifier {
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
LibraryNotifier = class extends Notifier {
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
 * Notifier displayed to the user during the "Additional details"
 * step.
 */

DetailsNotifier = class extends Notifier {
  #item_no = null;
  #total = null;

  step_no = 4;

  /**
   * Description of this step.
   *
   * @returns {string}
   */
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
    this.notifier = new Notifier();
    this.orders = new OrdersFetcher();
    this.library = new LibraryFetcher();
    this.details = new DetailsFetcher();
    this.results = [];

    window.ae = this;

    this.style = new Style();
    this.style.create();
  }

  start() {
    this.modal = new StartDialog();
    this.modal.create();
    return this.modal;
  }

  isAudible() {
    let domain = Domain.fromURL(window.location.href);
    return domain.name == "audible";
  }

  showError(...sentences) {
    let modal = new ErrorDialog([
      "Sorry, you must be on the audible website to continue.",
      "Go there and try again.",
    ]);

    modal.content.method = "get";
    modal.content.action = "//audible.com";
    modal.copy.append(modal.actions);
    modal.actions.append(modal.button("Go", {}, { autofocus: true }));
    modal.create();
    return modal;
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
    this.modal = new DownloadDialog();
    this.modal.create();
    this.modal.dl_btn.element.addEventListener("click", download);
    this.modal.show();
    return this.modal;
  }

  async run() {
    if (!this.isAudible()) {
      this.showError(
        "Sorry, you must be on the audible website to continue.",
        "Go there and try again.",
      );
      return;
    }

    try {
      this.timer.start();
      info(`Started at ${this.timer.started_at.toLocaleTimeString()}`);

      this.notifier.create();

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
        `Finished at ${this.timer.stopped_at.toLocaleTimeString()} (${this.results.length} results, ${this.timer.minutes} minutes)`,
      );

      this.downloadReady();
    } catch (err) {
      error("Fatal error:", err, err.name, err.message);
    }
  }
};

exporter = new Exporter();
exporter.start();
