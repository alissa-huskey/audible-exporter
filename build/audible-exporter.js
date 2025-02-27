
log = function(...msg) {
  console.log("--->", ...msg);
}

hr = function(...msg) {
  console.log("****************************************", ...msg)
}
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
  let name = `${LOG_PREFIX} ${label}`;
  console.groupCollapsed(name);
  console.table(data);
  console.groupEnd(name);
}

titleCase = function(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

str = function(o) {
  return typeof o == "object"
    ? this.tsvReady(JSON.stringify(o))
    : o
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

tsvReady = (s) => (
  s
    ? s
        .replace(/\t|\v|\f|\u0009/g, " ")
        .replace(/\r|\n/g, "↵")
        .replace(/\0/g, "")
        .replace(/\\/g, "\\\\")
        .replace(/\'/g, "\\'")
        .replace(/\"/g, '\\"')
    : s
)

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

  constructor(doc=null) {
    super();
    this.doc = doc;
  }

  get page_size() {
    let size = this.doc.qsf("select[name='pageSize'] option:checked")?.value || this.#default_page_size;
    return parseInt(size);
  }

  get page_num() {
    let num = this.doc.qsf("span.pageNumberElement")?.innerHTML || 1;
    return parseInt(num);
  }

  get page_count() {
    let links = this.doc.qs("a.pageNumberElement");
    let count = links.last?.innerHTML || 1;
    return parseInt(count);
  }

  get rows() {
    let rows = this.doc.gc("adbl-library-content-row");
    if (!rows.length) {
      return [];
    }
    return rows;
  }

  get books() {
    let books = this.rows.reduce((arr, row) => {
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
    return books;
  }
}

LibraryFetcher = class extends Page {
  page_size = 50;
  base_url = "https://www.audible.com/library/titles";

  constructor() {
    super();
    this.pages = [];
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
    } while (i <= this.page_count);

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
    if (!this.pages) {
      return [];
    }

    let books = this.pages.reduce((arr, page) => {
        return arr.concat(
          // map books by URL to avoid duplicates
          page.books.map((book) => [book.url, book])
        );
      },
      [],
    );

    return Object.values(Object.fromEntries(books));
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
DetailsFetcher = class {
  constructor(library=null) {
    this.library = library;
    this.books = {};
  }

  async populate(progress_callback=null) {
    let book, remaining
    let i = 0
    let total = this.library.length;

    for (book of this.library) {
      let page = await BookPage.get(book.url.replace("http", "https"));
      page.url = book.url;
      try {
        let data = page.data();
        if (!data) 
          continue

        this.books[data.id] = data;
        if (progress_callback) {
          progress_callback(i, total, data);
        }
      } catch {

      }

      i++;
    }
  }
}

Exporter = function() {

  var classes = {
    ul_card: "bc-list bc-list-nostyle",
    title: "bc-size-headline3",
    narrator: "narratorLabel",
    author: "authorLabel",
    series: "seriesLabel",
    categories: "bc-breadcrumb",
    runtime: "runtimeLabel",
    release_date: "releaseDateLabel",
    publisher: "publisherLabel",
    summary: "productPublisherSummary",
    language: "languageLabel",
  };

  return {
    notifier: new StatusNotifier(),

    /* misc functions
     * --------------------------------------------------------------------------------
     */

    unqHsh: (a, o) => (a.filter(i => o.hasOwnProperty(i) ? false : (o[i] = true))),

    timeLeft: function(remaining) {
      let per_book = 1.9;

      return Math.round((remaining * per_book) / 60);
    },

    /* formatting functions
     * --------------------------------------------------------------------------------
     */

    convert2TsvAndDownload: function(records, named_file) {
      const fileArray = records;
      var firstLevel = fileArray.map((el) => Object.entries(el));
      var header = this.unqHsh(
        firstLevel.map((el) => el.map((itm) => itm[0])).flat(),
        {}
      );
      var table = [header];
      for (var i = 0; i < firstLevel.length; i++) {
        var arr = [];
        var row = [];
        var record = firstLevel[i];
        for (var s = 0; s < record.length; s++) {
          var record_kv = record[s];
          var col_key = record_kv[0];
          var place = header.indexOf(col_key);
          arr[place] = record_kv[1];
        }
        for (var a = 0; a < arr.length; a++) {
          if (arr[a]) {
            row.push(arr[a]);
          } else {
            row.push("");
          }
        }
        table.push(row);
      }
      var output_ = table.map((el) => el.map((itm) => str(itm)));
      this.downloadr(output_, named_file);
    },

    /* DOM functions
     * --------------------------------------------------------------------------------
     */

    createDownloadHTML: function() {
      this.notifier.create();
      this.notifier.text = "Initiating download...";
    },

    /* parsing functions
     * --------------------------------------------------------------------------------
     */

    parseLibraryPage: function(doc) {
      let page = new LibraryPage(doc);
      return page.books;
    },

    parseBookDetails: function(doc) {
      page = new Element(doc);
      
      if (page.gt("adbl-product-metadata").length > 0) {
        parser = new ADBLBookPage(doc);
      } else {
        parser = new NormalBookPage(doc);
      }

      return parser.data()
    },

    /* interaction functions
     * --------------------------------------------------------------------------------
     */

    delay: (ms) => new Promise((res) => setTimeout(res, ms)),

    downloadr: function(arr2D, filename) {
      var data = /\.json$|.js$/.test(filename)
        ? JSON.stringify(arr2D)
        : arr2D
            .map((el) => el.reduce((a, b) => a + "\t" + b))
            .reduce((a, b) => a + "\r" + b);
      var type = /\.json$|.js$/.test(filename)
        ? "data:application/json;charset=utf-8,"
        : "data:text/plain;charset=utf-8,";
      var file = new Blob([data], {
        type: type,
      });
      if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveOrOpenBlob(file, filename);
      } else {
        var a = document.createElement("a"),
          url = URL.createObjectURL(file);
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
        }, 10);
      }
    },

    /* request functions
     * --------------------------------------------------------------------------------
     */

    fetchDoc: async function (url) {
      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const text = await res.text();
      return new DOMParser().parseFromString(text, "text/html");
    },

    loopThroughtAudibleLibrary: async function() {
      this.notifier.reset();
      this.notifier.text = "Retrieving library...";
      let library = new LibraryFetcher();
      await library.populate((i, page_count) => {
        let page = i + 1;
        let percent = page/page_count;
        this.notifier.updateProgress(percent, i);
        this.notifier.text = `Retrieving library: page ${page} of ${page_count}`;
      });
      log_table("library", library.books);
      return library.books;
    },

    enrichLibraryInformation: async function(orders, library) {
      let library_info, order_info, book_info, info;
      let results = [];

      let total_results = library.length;

      this.notifier.reset();
      this.notifier.text = "Retrieving additional information on titles...";

      let fetcher = new DetailsFetcher(library);
      await fetcher.populate((i, total, data) => {
        let percent = i/total;
        let remaining = total - i;

        this.notifier.updateProgress(percent, i);
        this.notifier.text = `
          Retrieving book ${(i+1).toLocaleString()} of ${total.toLocaleString()} (approx ${this.timeLeft(remaining)} minutes remaining)
        `.trim();
      });

      log_table("details", fetcher.books);

      for (library_info of library) {
        book_info = fetcher.books[library_info.id],
        order_info = orders.filter((i) => i.url == r.url) || {};
        info = cleanObject({...library_info, ...book_info, order_info});
        results.push(info);
      }
      return results;
    },

    downloadTSV: function(books) {
      this.convert2TsvAndDownload(
        books,
        "audible_export_" + new Date().getTime() + ".tsv"
      );
    },

    getAudibleLibraryPage: async function(page) {
      const doc = await this.fetchDoc(
        `https://www.audible.com/library/titles?ref=a_library_t_c6_pageNum_${page}&pageSize=50&page=${
          page + 1
        }`
      );
      return this.parseLibraryPage(doc);
    },

    getBookDetails: async function(url) {
      if (url) {
        try {
          const doc = await this.fetchDoc(url);
          return this.parseBookDetails(doc);
        } catch (err) {
          console.error("failed", err);
          return {};
        }
      } else {
        return {};
      }
    },

    getAllOrders: async function() {
      this.notifier.reset();
      this.notifier.text = "Retrieving purchases...";

      orders = new OrdersFetcher();
      await orders.init()
      await orders.populate((year, page, page_count, percent) => {
        this.notifier.updateProgress(percent, page);
        this.notifier.text = `Retrieving ${year} purchases: page ${page} of ${page_count}`;
      });
      log_table("purchases", orders.items);
      return orders.items;
    },

    getOrderPageByDate: async function (year, num) {
      info("getOrderPageByDate()", year, num);
      page = new OrderPage(year, num);
      await page.get();
      return page;
    },

    run: async function() {
      try {
        let before = new Date().getTime();

        this.createDownloadHTML();

        let orders = await this.getAllOrders();
        let library = await this.loopThroughtAudibleLibrary();
        let books = await this.enrichLibraryInformation(orders, library);

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

        log_table("Your audible data", books);
        this.downloadTSV(books);

      } catch (err) {
        error("Fatal error:", err, err.name, err.message);
      }
    }
  };
}
CONSOLE_OUTPUT = true;
exporter = Exporter();
await exporter.run();
