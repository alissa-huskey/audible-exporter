var CONSOLE_OUTPUT = false;
const LOG_PREFIX = "[audible-exporter]";

info = function(...msg) {
  if (!CONSOLE_OUTPUT) {
    return;
  }
  console.log(LOG_PREFIX, ...msg);
}

error = function(...msg) {
  console.error(LOG_PREFIX, ...msg);
}

log_table = function(label, data) {
  if (!CONSOLE_OUTPUT) {
    return;
  }
  let name = `${LOG_PREFIX} ${label}`;
  console.groupCollapsed(name);
  console.table(data);
  console.groupEnd(name);
}

titleCase = function(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

first = function(arr) {
  let v;
  for (v of arr) {
    if (v) return v
  }
}

const EMPTIES = {"Object": "{}", "Array": "[]"};
isEmpty = function(o) {
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
}

tryFloat = function(o) {
  try {
    f = parseFloat(o);
    return isNaN(f) ? o : f;

  } catch (err) {
    return o;
  }
}

tryInt = function(f) {
  try {
    let i = parseInt(f);
    return i == f ? i : f
  } catch (err) {
    return f;
  }
}

entityDecode = function(text) {
  return text.replace("&amp;", "&");
}

dateString = function(date) {
  if (!date) {
    return ""
  }
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
}

cleanObject = function(ob) {
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
}

stripHTML = function(html) {
   let doc = new DOMParser().parseFromString(html, 'text/html');
   return doc.body.textContent || "";
}

rando = (n) => Math.round(Math.random() * n)

reg = (o, n) => (o ? o[n] : "")

cleanObject = function(ob) {
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
}
Element = class {
  constructor(elm=null) {
    this.element = elm;

    if (!elm) {
      return
    }

    for (let k in elm.__proto__) {
      if (Object.hasOwnProperty(k)) { continue }

      Object.defineProperty(this, k, {
        get: function() { return this.element[k]; },
        set: function(v) { this.element[k] = v },
      });
    }
  }

  static from_html(text) {
    let html = document.createElement("html");
    html.innerHTML = text;

    let elm = new Element(html);
    return elm;
  }

  /**
   * Create HTML Element.
   *
   * @param {str}    html     Tag name or HTML string.
   * @param {object} [attrs]  Attributes to set on element.
   *
   * @return {Element}
   *
   * @example
   * let elm = Element.create("div", {id: "container"});
   * let elm = Element.create("<p>hello</p>");
   */
  static create(html, attrs={}) {
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

    let element = new Element(dom);
    element.set(attrs)
    return element;
  }

  static gc (name) {
    return new List(document.getElementsByClassName(name));
  }

  static gi (name) {
    let node = document.getElementById(name)
    return new Element(node);
  }

  static gt (name) {
    return new List(document.getElementsByTagName(name));
  }

  static qs(query) {
    let res = document.querySelector(query);
    return new Element(res);
  }

  static qsa(query) {
    let res = document.querySelectorAll(query);
    return new List(res);
  }

  gc(name) {
    if (!this.element) {
      return []
    }

    let res = this.element.getElementsByClassName(name);
    return new List(res);
  }

  gi(name) {
    return Element.gi(name);
  }

  gt(name) {
    if (!this.element) {
      return []
    }

    let res = this.element.getElementsByTagName(name);
    return new List(res);
  }

  gcf(name) { return this.gc(name)[0] }
  gtf(name) { return this.gt(name)[0] }

  qs(query) {
    let res = this.element.querySelectorAll(query);
    return new List(res);
  }

  qsf(query) {
    let res = this.element.querySelector(query);
    return new Element(res);
  }

  set(attrs, value=null) {
    if (typeof attrs == "string") {
      let key = attrs;
      attrs = {};
      attrs[key] = value;
    }

    for (let [k, v] of Object.entries(attrs)) {
      this.element.setAttribute(k, v);
    }
  }
}
List = class extends Array {
  constructor(items) {
    items = Array.from(items);
    let elements = items.map((item) => new Element(item));
    super(...elements);
  }

  get first() {
    return this[0];
  }

  get last() {
    return this.slice(-1)[0];
  }
}
Page = class {
  #doc = null;

  async fetchDoc(url) {
    let res;
    try {
      res = await fetch(url);
    } catch {
      throw new Error(`Failed to fetch URL: ${url}.`);
    }

    if (!res.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    let text = await res.text();
    return new DOMParser().parseFromString(text, "text/html");
  }

  get doc() {
    return this.#doc;
  }

  set doc(value) {
    if (value) {
      if (!value)
        return;

      if (value.constructor.name != "Element") {
        value = new Element(value);
      }

      this.#doc = value;
    }
  }
}
/**
 * Book page.
 *
 * Parse the book details from the audible book page.
 */
BookPage = class extends Page {

  #category_types = ["Fiction", "Nonfiction"];

  #category_genres = {
    'Arts & Entertainment': "nonfiction",
    'Biographies & Memoirs': "nonfiction",
    'Business & Careers': "nonfiction",
    'Children\'s Audiobooks': null,
    'Action & Adventure': "fiction", // children's audiobooks
    'Activities & Hobbies': "nonfiction", // children's audiobooks
    'Animals & Nature': "nonfiction", // children's audiobooks
    'Education & Learning': "nonfiction",
    'Fairy Tales, Folk Tales & Myths': "fiction",
    'Geography & Cultures': "nonfiction",
    'Comedy & Humor': null,
    'Performing Arts': "nonfiction", // comedy & humor
    'Computers & Technology': "nonfiction",
    'Education & Learning': "nonfiction",
    'Erotica': null,
    'Sex Instruction': "nonfiction", // erotica
    'Health & Wellness': "nonfiction",
    'History': "nonfiction",
    'Home & Garden': "nonfiction",
    'LGBTQ+': "null",
    'LGBTQ+ Studies': "nonfiction",
    'Parenting & Families': "nonfiction",
    'Literature & Fiction': "fiction",
    'Money & Finance': "nonfiction",
    'Mystery, Thriller & Suspense': null,
    'True Crime': "nonfiction", // mystery, thriller & suspense
    'Mystery': "fiction", // mystery, thriller & suspense
    'Thriller & Suspense': "fiction", // mystery, thriller & suspense
    'Crime Fiction': "fiction", // mystery, thriller & suspense
    'Politics & Social Sciences': "nonfiction",
    'Politics, Society & Current Events': "nonfiction",
    'Relationships, Parenting & Personal Development': "nonfiction",
    'Religion & Spirituality': "nonfiction",
    'Romance': "fiction",
    'Science & Engineering': "nonfiction",
    'Sports & Outdoors': "nonfiction",
    'Teen & Young Adult': null,
    'Health, Lifestyle & Relationships': "nonfiction", // teen & young adult
    'History & Culture': "nonfiction", // teen & young adult
    'Travel & Tourism': "nonfiction",
  }

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
  ]

  #fields = [
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
  ]

  #tags = []
  #json_audiobook = null;
  #json_product = null;

  static async get(url) {
    let page = new Page()
    let doc = await page.fetchDoc(url);
    doc = new Element(doc);

    if (doc.gt("adbl-product-details").length) {
      page = new ADBLBookPage(doc);
    } else {
      page = new NormalBookPage(doc);
    }

    page.url = url;
    return page;
  }

  constructor(doc=null) {
    super();
    this.doc = doc;
  }

  getSubgenre(categories, tags) {
    // return the second category if there is one
    if (categories.length == 2) {
      return categories[1];
    }

    // find the first subgenre listed in tags
    let listed_subgenres = [...(new Set(tags)).intersection(new Set(subgenres))];
    if (listed_subgenres.length >= 1) {
      return listed_subgenres[0];
    }

    // return the first tag
    return tags[0]
  }

  /* Convert duration string to minutes int.
   *
   * @example
   * page.toMinutes("2 hrs and 25 mins"); // 145
   */
  toMinutes(text) {
    let mins = /\d+(?=\smin)/.exec(text)?.[0] || "0";
    let hours = /\d+(?=\shrs)/.exec(text)?.[0] || "0"
    return (parseInt(hours) * 60) + parseInt(mins);
  }

  data() {
    let data;

    try {
      data = Object.fromEntries(this.#fields.map((f) => {
        return [f, this[f]]
      }));
      return cleanObject(data)
    } catch (err) {
      error(`Parse failure, url: "${this.url}".`, err);
    }
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
    let rating = tryFloat(this.json_audiobook?.aggregateRating?.ratingValue);
    return rating ? +rating.toFixed(1) : ""
  }

  get num_ratings() {
    return tryInt(this.json_audiobook?.aggregateRating?.ratingCount);
  }

  get id() {
    return this.json_product?.productID;
  }

  get date() {
    let date = this.json_audiobook?.datePublished;
    if (!date)
      return
    return new Date(`${date}:00:00:01`)
  }

  get release_date() {
    if (!this.date) {
      return;
    }
    return dateString(this.date);
  }

  get release_timestamp() {
    return this.date?.getTime();
  }

  get title() {
    let values = [
      this.json_audiobook?.name,
      this.doc.qsf("meta[property='og:title']")?.content,
    ];
    return first(values);
  }

  get publisher() {
    return this.json_audiobook?.publisher;
  }

  get publisher_summary() {
    let text = this.json_audiobook?.description;
    if (!text)
      return
    return stripHTML(text)
  }

  get audible_oginal () {
    if (!this.publisher) {
      return;
    }
    return /^Audible Original/.test(this.publisher);
  }

  get language() {
    let lang = this.json_audiobook?.inLanguage;
    if (!lang) {
      return;
    }
    return titleCase(lang);
  }

  get categories_list() {
    return [];
  }

  get tags_list() {
    return [];
  }

  get category_type() {
    // check if the fiction tag is listed in the tags
    for (var genre of this.#category_types) {
      let idx = this.tags_list?.indexOf(genre);
      if (idx && idx >= 0) {
        return genre.toLowerCase();
      }
    }

    let all = [...this.categories_list, ...this.tags_list];
    for (var genre of this.#category_types) {
      if (all.some( (c) => { return c.toLowerCase().includes(genre.toLowerCase()) } )) {
        return genre.toLowerCase();
      }
    }

    for (var label of all) {
      genre = this.#category_genres[label];
      if (genre) {
        return genre.toLowerCase();
      }
    }
  }

  get tags() {
    if (!this.#tags.length && this.tags_list) {
      let exclude = [...this.#category_types];
      if (this.main_category) {
        exclude.push(this.main_category);
      }
      this.#tags = this.tags_list?.filter((t) => {return !exclude.includes(t)});
    }
    return this.#tags;
  }

  get main_category() {
    return this.categories_list?.[0];
  }

  get sub_category() {
      // return the second category if there is one
      if (this.categories_list && this.categories_list.length == 2) {
        return this.categories_list[1];
      }

      // find the first subgenre listed in tags
      let listed_subgenres = [...(new Set(this.tags)).intersection(new Set(this.#sub_categories))];
      if (listed_subgenres.length >= 1) {
        return listed_subgenres[0];
      }

      // return the first tag
      return this.tags[0]
  }

  get categories() {
    return this.tags.filter((c) => !this.categories_list.includes(c));
  }
}

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
    return Object.assign({}, ...this.adbl.map((e) => {return JSON.parse(e.textContent)}));
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
    return this.doc.qs("adbl-chip-group.product-topictag-impression adbl-chip").map((c) => c.innerHTML)
  }
}

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
    let text = this.doc.gcf("runtimeLabel")?.innerHTML?.replace(/length:/i, "");
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
    return /, Book (\d+)/i.exec(this.doc.gcf("seriesLabel")?.innerHTML)?.[1] || "";
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
    return this.doc.gc("bc-chip-text").map((c) => { return c.attributes["data-text"]?.value });
  }

  get categories_list() {
    return this.doc.qs(".categoriesLabel a").map((c) => { return entityDecode(c.innerHTML) || "" }) || [];
  }
}
LibraryPage = class extends Page {
  #default_page_size = 20;
  #rows = null;
  #books = null;

  constructor(doc=null) {
    super();
    this.doc = doc;
    this.#rows = null;
    this.#books = null;
  }

  get page_size() {
    if (!this.doc)
      return
    let size = this.doc.qsf("select[name='pageSize'] option:checked")?.value || this.#default_page_size;
    return parseInt(size);
  }

  get page_num() {
    if (!this.doc)
      return
    let num = this.doc.qsf("span.pageNumberElement")?.innerHTML || 1;
    return parseInt(num);
  }

  get page_count() {
    if (!this.doc)
      return
    let links = this.doc.qs("a.pageNumberElement");
    let count = links.last?.innerHTML || 1;
    return parseInt(count);
  }

  get rows() {
    if (!this.doc)
      return
    if (!this.#rows) {
      let rows = this.doc.gc("adbl-library-content-row");
      this.#rows = rows.length ? rows : [];
    }
    return this.#rows;
  }

  get books() {
    if (!this.#books) {
      this.#books = this.rows.reduce((arr, row) => {
        let ul = row.gcf("bc-list bc-list-nostyle");
        let title = ul.gcf("bc-size-headline3")?.innerHTML?.trim() || "";

        if (title == "Your First Listen") {
          return arr;
        }

        arr.push({
          id: row.id?.replace("adbl-library-content-row-", ""),
          url: (
            ul.gcf("bc-size-headline3")?.parentElement
            ?.attributes["href"]?.value
            ?.replace(/\?.+/, "")
          ) || "",
          title: entityDecode(title),
          author: ul.gcf("authorLabel")?.gcf("bc-color-base")?.innerHTML?.trim() || "",
          narrator: ul.gcf("narratorLabel")?.gcf("bc-color-base")?.innerHTML?.trim() || "",
          series: ul.gcf("seriesLabel")?.gtf("a")?.innerHTML?.trim() || "",
        });

        return arr;
      }, []);
    }
    return this.#books;
  }
}

LibraryFetcher = class extends Page {
  page_size = 50;
  base_url = "https://www.audible.com/library/titles";

  #books = [];

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

  async populate(progress_callback=null) {
    let i = 0;
    do {
      let page = await this.fetchPage(i + 1);
      this.pages.push(page);

      if (progress_callback) {
        progress_callback(i, this.page_count);
      }

      i++;
    } while (i < this.page_count);

    return this.pages;
  }

  get book_count() {
    if (!this.pages) {
      return;
    }
    let page = this.pages[0];
    return page.page_size * page.page_count;
  }

  get page_count() {
    return Math.ceil(this.book_count / this.page_size);
  }

  get books() {
    if (!this.#books) {
      let books = this.pages.reduce((arr, page) => {
          return arr.concat(
            // map books by URL to avoid duplicates
            page.books.map((book) => [book.url, book])
          );
        },
        [],
      );

      this.#books = Object.values(Object.fromEntries(books));
    }
    return this.#books;
  }

  set books(value) {
    this.#books = value;
  }
}

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
            id: p.id,
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
DetailsFetcher = class {
  #books = {}

  constructor(library=null) {
    this.library = library;
    this.#books = null;
    this.pages = [];
  }

  async populate(progress_callback=null) {
    let book, data;

    let total = this.library.length;
    let i = 0;

    for (book of this.library) {
      let page = await BookPage.get(book.url.replace("http", "https"));

      page.url = book.url;
      this.pages.push(page);

      if (progress_callback) {
        progress_callback(i, total, data);
      }
      i++;
    }
  }

  get books() {
    if (!this.#books) {
      this.#books = {};
      let data, page;

      for (page of this.pages) {
        if (!page) 
          continue

        let data = page.data();
        this.#books[data.id] = data;
      }
    }
    return this.#books;
  }

  set books(value) {
    this.#books = value
  }
}

DOM = class {
  #style = null;
  #css = null;

  get style() {
    if (!this.#style) {
      this.#style = Element.create("style", {id: this.selectors.style, type: "text/css"});

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
    let el = Element.gi(this.selectors.wrapper);
    if (el)
      el.outerHTML = "";

    document.head.appendChild(this.style.element);
    document.body.appendChild(this.wrapper.element);
  }
}
File = class {
  mimetype = null;

  constructor(records=null) {
    this.records = records;
  }

  get blob() {
    return new Blob([this.contents], {type: this.mimetype});
  }

  get url() {
    return URL.createObjectURL(this.blob);
  }

  get filename() {
    let ts = new Date().getTime();
    return `audible_${ts}.${this.extension}`;
  }
}
TSVFile = class extends File {
  #headers = null;
  #rows = null;

  mimetype = "text/tsv";
  extension = "tsv";

  get headers() {
    if (!this.records || isEmpty(this.records))
      return;
    if (!this.#headers) {
      this.#headers = Object.keys(this.records[0]).map((h) => this.sanitize(h));
    }
    return this.#headers;
  }

  get rows() {
    if (!this.records || isEmpty(this.records))
      return;
    if (!this.#rows) {
      this.#rows = this.records.map((row) => Object.values(row).map((v) => this.sanitize(v)));
    }
    return this.#rows;
  }

  get contents() {
    if (!this.records || isEmpty(this.records))
      return;

    let lines = [this.headers, ...this.rows];
    let text = lines.map((l) => l.join("\t")).join("\n") + "\n";
    return text;
  }

  sanitize(text) {
    text = text || "";
    text = String(text);

    return text
        .replace(/\t|\v|\f|\u0009/g, " ")
        .replace(/\r|\n/g, " ")
        .replace(/\0/g, "")
        .replace(/\\/g, "\\\\")
        .replace(/\'/g, "\\'")
        .replace(/\"/g, '\\"')
  }


}

Modal = class extends DOM {
  #css = null;
  #wrapper = null;
  #close_btn = null
  #dl_btn = null;

  selectors = {
    style: "ae-modal-css",
    wrapper: "ae-modal",
    content: "ae-content",
    head: "ae-head",
    close_btn: "ae-close-btn",
    dl_btn: "ae-download-btn",
  };

  get css() {
    if (!this.#css) {
      this.#css = `
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
  background: color(srgb 0.14549 0.140392 0.163529);
  color: white;
  /* color: #6b7280; */
}

.ae-modal .ae-head {
  background-color: color(srgb 0.100549 0.0985098 0.107765);
  padding: 10px;
  /* top-left  top-right bottom-right bottom-left */
  border-radius: 10px 10px 0px 0px;
  /* border-bottom: 1px solid #ddd; */
}

.ae-modal h1 {
  color: #dce6ef;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  padding-bottom: 10px;
  text-transform: uppercase;
}

.ae-modal #ae-close-btn {
  color: #999;
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

a#ae-download-btn {
  /* background-color: #4CC713; */
  background-color: #43c26d;
  color: #000;
  cursor: pointer;

  text-decoration: none;
  font-family: sans-serif;
  text-align: center;
  font-size: 0.9em;

  display: inline-block;
  padding: 10px 25px;
  text-indent: 15px;
}

a#ae-download-btn:hover {
  background-color: #333;
  color: white;
}

a#ae-download-btn:before, a#ae-download-btn:after {
  content: ' ';
  display: block;
  position: absolute;
  left: 33px;
  top: 45%;
}

/* Download box shape  */
a#ae-download-btn:before {
  width: 10px;
  height: 2px;
  border-style: solid;
  border-width: 0 2px 2px;
}

/* Download arrow shape */
a#ae-download-btn:after {
  width: 0;
  height: 0;
  margin-left: 1px;
  margin-top: -7px;

  border-style: solid;
  border-width: 4px 4px 0 4px;
  border-color: transparent;
  border-top-color: inherit;

  animation: downloadArrow 2s linear infinite;
  animation-play-state: paused;
}

a#ae-download-btn:hover:before {
  border-color: #43c26d;
}

a#ae-download-btn:hover:after {
  border-top-color: #43c26d;
  animation-play-state: running;
}

/* keyframes for the download icon anim */
@keyframes downloadArrow {
  /* 0% and 0.001% keyframes used as a hackish way of having the button frozen on a nice looking frame by default */
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
      this.#wrapper = Element.create("div", {class: this.selectors.wrapper });
      let content = Element.create("div", {class: this.selectors.content});
      let head = Element.create("div", {class: this.selectors.head});
      let h1 = Element.create("h1");
      let p = Element.create("p");

      h1.innerHTML = "Download";
      p.innerHTML = "Your export is ready!";

      this.wrapper.element.appendChild(content.element);
      content.element.appendChild(head.element);
      content.element.appendChild(p.element);
      content.element.appendChild(this.dl_btn.element)
      head.element.appendChild(this.close_btn.element)
      head.element.appendChild(h1.element)

      this.#wrapper.style["z-index"] = new Date().getTime();
    }
    return this.#wrapper;
  }

  get close_btn() {
    if (!this.#close_btn) {
        this.#close_btn = Element.create("a", {id: this.selectors.close_btn});
        this.#close_btn.innerHTML = "&times;";
        this.#close_btn.attributes.href = "#";
        this.#close_btn.element.addEventListener("click", () => {
          this.hide();
        }, false);
    }
    return this.#close_btn;
  }

  get dl_btn() {
    if (!this.#dl_btn) {
      this.#dl_btn = Element.create("a", {id: this.selectors.dl_btn});
        this.#dl_btn.attributes.href = "#";
      this.#dl_btn.innerHTML = "Download";;
    }
    return this.#dl_btn;
  }

  set file(args) {
    let [url, filename] = args;
    this.dl_btn.element.href = url;
    this.dl_btn.element.download = filename;
    this.dl_btn.element.addEventListener("click", () => {
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
        }, 10);
    });

  }

  show() {
    this.#wrapper.style.display = "block";
  }

  hide() {
    this.#wrapper.style.display = "none";
  }
}

const css = `
#ae-notifier {
  position: fixed;
  top: 100px;
  border-radius: 0.2em;
  border-width: 1px;
  border-style: solid;
  font-family: system-ui;
}

#ae-bar {
  width: 0;
  height: 50px;
  border-bottom-right-radius: 0.2em;
  border-top-right-radius: 0.2em;
  transition: all 1s;
  border-width: 1px;
  border-style: solid;
}

#ae-messages {
  padding: 14px;
  color: #fff;
}

#ae-status-text {
  text-wrap: nowrap;
}

#ae-percent-text {
}

.row {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
`;

StatusNotifier = class {
  #wrapper = null;
  #bar = null;
  #status = null;
  #percentage = null;
  #messages = null;
  #css = null

  #colors = {
    darkGreen: "#07ba5b",
    lightGreen: "#3de367",
    nearBlack: "#121212",
    white: "#fff",
    rasin: "#19191F",
    darkGray: "#232530",
    offWhite: "#abaab3",
    lightGray: "#9a99a1",
  }
  #pulse_colors = {true: "#07ba5b", false: "#3de367"}

  selectors = {
    notifier: "ae-notifier",
    bar: "ae-bar",
    messages: "ae-messages",
    status: "ae-status-text",
    percentage: "ae-percent-text",
  };

  get body_width() {
    return document.body.getBoundingClientRect().width;
  }

  get bar_width() {
    return this.body_width * 0.8;
  }

  get css() {
    if (!this.#css) {
      this.#css = Element.create("style", {id: "ae-css", type: "text/css"});

      if (this.#css.element.styleSheet) {
        // Support for IE
        this.#css.element.styleSheet.cssText = css;
      } else {
        // Support for the rest
        let node = document.createTextNode(css);
        this.#css.element.appendChild(node);
      }
    }
    return this.#css;
  }

  // Construct notifier wrapper div, append all child elements, and return
  get wrapper() {
    if (!this.#wrapper) {
      this.#wrapper = Element.create("div", {id: this.selectors.notifier, style: {
        width: `${this.bar_width}px`,
        left: `${(this.body_width - this.bar_width) / 2}px`,
        background: this.#colors.nearBlack,
        'border-color': this.#colors.lightGreen,
        'z-index': new Date().getTime(),
      }})

      this.wrapper.element.appendChild(this.bar.element);
      this.bar.element.appendChild(this.messages.element);
      this.messages.element.appendChild(this.status.element);
      this.messages.element.appendChild(this.percentage.element);
    }
    return this.#wrapper;
  }

  // progress bar element
  get bar() {
    if (!this.#bar) {
      this.#bar = Element.create("div", {id: this.selectors.bar, style: {
        background: this.#colors.darkGreen,
        'border-color': this.#colors.lightGreen,
      }});
    }
    return this.#bar;
  }

  get messages() {
    if (!this.#messages) {
      this.#messages = Element.create("div", {id: this.selectors.messages, class: "row", style: {
        width: `${this.bar_width}px`,
        // color: "#112A46",
        // color: "#0c1b1d",
        // color: "#283747",
      }});
    }
    return this.#messages;
  }

  // status text element
  get status() {
    if (!this.#status) {
      this.#status = Element.create("div", {id: this.selectors.status, style: {
        // color: "#112A46",
        // color: "#0c1b1d",
        // color: "#283747",
      }});
    }
    return this.#status;
  }

  // percent text element
  get percentage() {
    if (!this.#percentage) {
      this.#percentage = Element.create("span", {id: this.selectors.percentage, style: {
        color: "#87ff65", // bright green
        color: "#0aff99", // bright green
        // color: "#00ff80", // bright green
        // color: "#00ff9f", // bright green
        // color: "#0dffae", // bright green
      }});
    }
    return this.#percentage;
  }

  // set the status text
  set text(message) {
    this.status.innerText = message;
  }

  // set the percentage text and progress bar width
  set percent(decimal) {
    let amount = Math.ceil(decimal * 100);
    this.percentage.innerText = `${amount}%`;

    let width = this.bar_width * decimal;
    this.bar.style.width = `${width}px`;
  }

  // set the percent text, progress bar width, and pulse the background color
  // on alternating odd/even increments
  updateProgress(percent, i=null) {
    this.percent = percent;
    if (i != null) {
      let color = this.#pulse_colors[i % 2 == 0]
      this.bar.background = color;
    }
  }

  timeLeft(remaining) {
    let per_book = 1.9;

    return Math.round((remaining * per_book) / 60);
  }


  // add the status notifier to the DOM
  create() {
    let notifier = Element.gi(this.selectors.notifier);
    if (notifier)
      notifier.outerHTML = "";

    document.head.appendChild(this.css.element);
    document.body.appendChild(this.wrapper.element);
  }

  reset() {
    this.text = "";
    this.percent = 0;
    this.bar.style.background = this.#colors.darkGreen;
    this.percentage.innerText = "";
  }

  // remove the elements from the DOM
  delete() {
    this.wrapper.element.remove();

    this.#wrapper = null;
    this.#bar = null;
    this.#status = null;
    this.#percentage = null;
  }
}
Exporter = class {

  constructor() {
    this.notifier = new StatusNotifier();
    this.modal = new Modal();
    this.orders = new OrdersFetcher();
    this.library = new LibraryFetcher();
    this.details = new DetailsFetcher();
    this.results = [];
  }
  async getOrders() {
    this.notifier.reset();
    this.notifier.text = "Retrieving purchases...";

    await this.orders.init()
    await this.orders.populate((year, page, page_count, percent) => {
      this.notifier.updateProgress(percent, page);
      this.notifier.text = `Retrieving ${year} purchases: page ${page} of ${page_count}`;
    });
    log_table("purchases", this.orders.items);
    return this.orders.items;
  }

  async getLibrary() {
    this.notifier.reset();
    this.notifier.text = "Retrieving library...";
    await this.library.populate((i, page_count) => {
      let page = i + 1;
      let percent = page/page_count;
      this.notifier.updateProgress(percent, i);
      this.notifier.text = `Retrieving library: page ${page} of ${page_count}`;
    });
    log_table("library", this.library.books);
    return this.library.books;
  }

  async getBookDetails() {
    let library_info, order_info, book_info, info;

    this.notifier.reset();
    this.notifier.text = "Retrieving additional information on titles...";

    this.details.library = this.library.books;
    await this.details.populate((i, total, data) => {
      let percent = i/total;
      let remaining = total - i;

      this.notifier.updateProgress(percent, i);
      this.notifier.text = `
        Retrieving book ${(i+1).toLocaleString()} of ${total.toLocaleString()} (approx ${this.notifier.timeLeft(remaining)} minutes remaining)
      `.trim();
    });

    log_table("details", this.details.books);
  }

  getResults() {
    let library_info, order_info, book_info, info;
    let results = [];

    for (library_info of this.library.books) {
      book_info = this.details.books[library_info.id];
      order_info = this.orders.items[library_info.id];
      info = cleanObject({...library_info, ...book_info, ...order_info});
      results.push(info);
    }

    log_table("Your audible data", results);

    this.results = results;
    return results;
  }

  download(books) {
    let file = new TSVFile(books);
    this.modal.file = [file.url, file.filename];
    this.notifier.delete();
    this.modal.show()
  }

  async run() {
    try {
      let before = new Date().getTime();

      this.modal.create();
      this.notifier.create();
      this.notifier.text = "Initiating download...";

      await this.getOrders();
      await this.getLibrary();
      await this.getBookDetails();
      this.getResults();

      if (!books) {
        error("Failed to download books.")
        this.notifier.reset();
        this.notifier.text = "Failed."
        return;
      }

      let after = new Date().getTime();
      let elapsed = (after - before) / 1000 / 60;

      info(`Done. (${books.length} books, ${elapsed.toFixed(2)} minutes)`);

      this.notifier.percent = 1;
      this.notifier.text = "Done."

      this.download(this.books);

    } catch (err) {
      error("Fatal error:", err, err.name, err.message);
    }
  }
}
CONSOLE_OUTPUT = true;
e = new Exporter();
await e.run();
