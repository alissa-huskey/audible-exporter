hr = function(...msg) {
  console.log("****************************************", ...msg)
}

log = function(...msg) {
  console.log("--->", ...msg);
}
titleCase = function(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

str = function(o) {
  return typeof o == "object"
    ? this.tsvReady(JSON.stringify(o))
    : o
}

tryFloat = function(d) {
  try {
    return parseFloat(d);
  } catch (err) {
    return d;
  }
}

entityDecode = function(text) {
  return text.replace("&amp;", "&");
}

dateString = function(d) {
  if (!d) {
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
  var date = new Date(d);
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
    async fetchDoc(url) {
      let res = await fetch(url);

      if (!res.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      let text = await res.text();
      return new DOMParser().parseFromString(text, "text/html");
    }
}
BookPage = class {

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

  constructor(doc=null, digitalData={}) {
    this.doc = new Element(doc);
    this.digitalData = digitalData;
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
    let data = Object.fromEntries(this.#fields.map((f) => {
      return [f, this[f]]
    }));

    return cleanObject(data)
  }

  get details() {
    return this.digitalData?.product?.[0]?.productInfo || {};
  }

  get release_date() {
    if (!this.date) {
      return;
    }
    return dateString(this.date);
  }

  get release_timestamp() {
    if (!this.date) {
      return;
    }
    return new Date(this.date).getTime();
  }

  get title() {
    return this.details.productName;
  }

  get publisher() {
    return this.details.publisherName;
  }

  get publisher_summary() {
    if (!this.summary) {
      return;
    }
    return (
      this.summary
        ?.trim()
        ?.replace(/([\n\r\s]+|)©.+/, "")
        ?.replace(/\t/g, " ")
    );
  }

  get audible_oginal () {
    if (!this.publisher) {
      return;
    }
    return /^Audible Original/.test(this.publisher);
  }

  get language() {
    let lang = this.details.language;
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

  get rating() {
    return tryFloat(Number(this.info.rating.value).toFixed(1));
  }

  get date() {
    return this.info.releaseDate;
  }

  get num_ratings() {
    return this.info.rating.count;
  }

  get book() {
    return /Book (\d+)/i.exec(this.info.series?.[0].part)?.[1];
  }

  get summary() {
    return this.doc.qsf("adbl-text-block[slot='summary']").textContent;
  }

  get categories_list() {
    return this.info.categories.map((c) => c.name);
  }

  get tags_list() {
    return this.doc.qs("adbl-chip-group.product-topictag-impression adbl-chip").map((c) => c.innerHTML)
  }
}

NormalBookPage = class extends BookPage {
  get date() {
    let li = this.doc.gcf("releaseDateLabel");
    return li?.innerHTML?.replace(/Releae date:/, "").trim();
  }

  get duration_minutes() {
    let text = this.doc.gcf("runtimeLabel").innerHTML?.replace(/length:/i, "");
    return this.toMinutes(text);
  }

  get rating() {
    let elm = this.doc.qsf(".ratingsLabel .bc-pub-offscreen").innerHTML;
    let score = /[\d\.]+/.exec(elm)?.[0]
    return tryFloat(score);
  }

  get num_ratings() {
    let elm = this.doc.qsf(".ratingsLabel .bc-color-link");
    let text = elm.innerHTML?.trim()
    let num = /[\d,]+/.exec(text)[0]?.replace(/\D/, "");
    return tryFloat(num);
  }

  get book() {
    return /, Book (\d+)/i.exec(this.doc.gcf("seriesLabel").innerHTML)?.[1];
  }

  get summary() {
    let elm = this.doc.qs("#center-1 .bc-container")[1]?.gcf("bc-text")

    return (
      elm.innerHTML
        ?.replace(/([\n\r\s]+|)©.+/, "")
        ?.replace(/[\n\r]+(\s+|)/g, "<br>")
        ?.replace(/\t/g, " ")
        ?.replace(/"/g, "'")
    );
  }

  get tags_list() {
    return this.doc.gc("bc-chip-text").map((c) => { return c.attributes["data-text"]?.value });
  }

  get categories_list() {
    return this.doc.qs(".categoriesLabel a").map((c) => { return entityDecode(c.innerHTML) || "" }) || [];
  }
}
LibraryPage = class {
  #default_page_size = 20;

  constructor(doc=null) {
    this.doc = new Element(doc);
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

Library = class extends Page {
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
        progress_callback(i, i/this.page_count);
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

Exporter = function() {

  var classes = {
    notifier: "downloading_notifier",
    bar: "downloading_percentage_bar",
    status_text: "downloading_percentage_txt",
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
    download_bar_width: document.body.getBoundingClientRect().width * 0.8,

    /* misc functions
     * --------------------------------------------------------------------------------
     */

    unq: (arr) => arr.filter((e, p, a) => a.indexOf(e) == p),
    unqHsh: (a, o) => (a.filter(i => o.hasOwnProperty(i) ? false : (o[i] = true))),

    unqKey: function(array, key) {
      var q = [];
      var map = new Map();
      for (const item of array) {
        if (!map.has(item[key])) {
          map.set(item[key], true);
          q.push(item);
        }
      }
      return q;
    },

    filterByInnerHTML: function(collection, pattern) {
      results = Array.from(collection).filter((i) => pattern.test(i.innerHTML));
      return results;
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

    cn: (o, s) => (o ? o.getElementsByClassName(s) : ""),
    tn: (o, s) => (o ? o.getElementsByTagName(s) : ""),
    gi: (o, s) => document.getElementById(s),

    ele: (t) => document.createElement(t),
    attr: (o, k, v) => o.setAttribute(k, v),
    a: function(o, attrs) { attrs.forEach(attr => this.attr(o, attr[0], attr[1])) },

    createDownloadHTML: function() {
      if (this.gi(document, classes.notifier))
        this.gi(document, classes.notifier).outerHTML = "";

      const body_width = document.body.getBoundingClientRect().width;

      let div = Element.create("div", {id: classes.notifier, style: {
        width: `${this.download_bar_width}px`,
        position: "fixed",
        top: "100px",
        left: `${(body_width - this.download_bar_width) / 2}px`,
        background: "#121212",
        border: "1px solid #3de367",
        'border-radius': "0.2em",
        'z-index': new Date().getTime(),
      }})

      let bar = Element.create("div", {id: classes.bar, style: {
        width: "0px",
        height: "50px",
        background: "#3de367",
        border: "1px solid #3de367",
        'border-bottom-right-radius': "0.2em",
        'border-top-right-radius': "0.2em",
        transition: "all 1s",
      }});

      let text = Element.create("div", {id: classes.status_text, style: {
        float: "left",
        padding: "14px",
        color: "#fff",
        width: `${this.download_bar_width - 50}px`,
      }});

      bar.element.appendChild(text.element);
      div.element.appendChild(bar.element);
      document.body.appendChild(div.element);

      this.setStatus("initiating download...");

      return div.element;
    },

    setStatus: function(text) {
      this.gi(document, classes.status_text).innerText = text;
    },

    updateProgress: function(percent, i=null) {
      let bar = this.gi(document, "downloading_percentage_bar");
      let width = this.download_bar_width * percent;
      bar.style.width = `${width}px`;

      if (i != null) {
        let color = i % 2 == 0 ? "#07ba5b" : "#3de367";
        bar.style.background = color;
      }
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
        parser = new ADBLBookPage(doc, digitalData);
      } else {
        parser = new NormalBookPage(doc, digitalData);
      }

      return parser.data()
    },

    parseURIasJSON: function(url, obj) {
      if (url.match(/(?<=\?|\&)\S+?(?=\&|$)/g))
        url
          .match(/(?<=\?|\&)\S+?(?=\&|$)/g)
          .map((r) => (r ? r.split(/\=/) : [[]]))
          .forEach((r) => (obj[r[0]] = r[1]));
      return obj;
    },

    lengthOfBookInMinutes: function(s) {
      var mins = reg(/\d+(?=\smin)/.exec(s), 0)
        ? parseInt(reg(/\d+(?=\smin)/.exec(s), 0))
        : 0;
      var hours = reg(/\d+(?=\shrs)/.exec(s), 0)
        ? parseInt(reg(/\d+(?=\shrs)/.exec(s), 0)) * 60
        : 0;
      return hours + mins;
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
      this.setStatus("Retrieving titles...");
      let library = new Library();
      await library.populate((i, percent) => {
        this.updateProgress(percent, i);
        this.setStatus(`Retrieving titles... ${Math.ceil(percent * 100)}% complete`);
      });
      return library.books;
    },

    enrichLibraryInformation: async function(order_information) {
      var library = await this.loopThroughtAudibleLibrary();
      var contain_arr = [];

      this.setStatus("Retrieving addtional information on titles...");
      const total_results = library.length;
      for (let i = 0; i < total_results; i++) {
        let details = await this.getBookDetails(library[i].url);
        let merge = cleanObject({ ...library[i], ...details });
        contain_arr.push(merge);
        if (i == 2) console.log(contain_arr);
        await this.delay(rando(1111) + 1111);
        this.gi(document, "downloading_percentage_bar").style.width = `${
          this.download_bar_width * (i / total_results)
        }px`;
        this.gi(document, "downloading_percentage_bar").style.background =
          i % 2 == 0 ? "#07ba5b" : "#3de367";
        this.setStatus(
          `${
            merge.author
          } - ${Math.ceil(
            (i / total_results) * 100
          )}% complete -- approx ${Math.round(
            ((((total_results - i) / 100) * 1.9) / 60) * 100
          )} minutes remaining`
        );
      }
      this.gi(
        document,
        "downloading_percentage_bar"
      ).style.width = `${this.download_bar_width}px`;
      this.setStatus("100% complete");
      console.log(contain_arr);
      let merged_with_orders = contain_arr.map((r) => {
        let order = order_information.filter((i) => i.url == r.url);
        return {
          ...r,
          ...(order?.[0] ? order?.[0] : {}),
        };
      });

      this.convert2TsvAndDownload(
        merged_with_orders,
        "audible_export_" + new Date().getTime() + ".tsv"
      );
      if (this.gi(document, "downloading_notifier"))
        this.gi(document, "downloading_notifier").outerHTML = "";
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
          console.log("failed");
          console.log(err);
          return {};
        }
      } else {
        return {};
      }
    },

    getAllOrders: async function() {
      this.setStatus("Retrieving this year's purchases...");

      var first_page = await this.getOrderPageByDate("last_365_days", 1);
      var titles = first_page.titles;

      for (let i = 0; i < first_page.pages.length; i++) {
        let next_page = await this.getOrderPageByDate(
          "last_365_days",
          first_page.pages[i]
        );
        next_page?.titles?.forEach((title) => titles.push(title));
      }
      let last_year = Math.min(
        ...titles
          .map((t) => /^\d{4}/.exec(t.purchase_date)?.[0])
          .filter((t) => t)
          .map((t) => parseInt(t))
      );

      let years_loop = first_page.order_date_sel.slice(
        first_page.order_date_sel.indexOf(last_year.toString()),
        20
      );
      await this.delay(rando(333) + 666);

      for (let y = 0; y < years_loop.length; y++) {
        let page = await this.getOrderPageByDate(years_loop[y], 1);
        page?.titles?.forEach((title) => titles.push(title));
        this.gi(document, "downloading_percentage_bar").style.width = `${
          this.download_bar_width * (y / years_loop.length)
        }px`;
        this.gi(document, "downloading_percentage_bar").style.background =
          y % 2 == 0 ? "#07ba5b" : "#3de367";
        this.setStatus(`Retrieving ${years_loop[y]} purchases...`);
        for (let i = 0; i < page.pages.length; i++) {
          let next_page = await this.getOrderPageByDate(years_loop[y], page.pages[i]);
          next_page?.titles?.forEach((title) => titles.push(title));
          this.setStatus(`Retrieving ${years_loop[i]} purchases... page: ${page.pages[i]}`);
        }
        await this.delay(rando(333) + 666);
      }
      return this.unqKey(titles, "url");
    },

    getOrderPageByDate: async function (df, p) {
      console.log("getOrderPageByDate()", df, p);
      var doc = await this.fetchDoc(
        `https://www.audible.com/account/purchase-history?ref=&tf=orders&df=${df}&ps=40&pn=${p}`
      );

      var order_date_sel = Array.from(
        this.tn(this.gi(doc, "ui-it-purchase-history-date-filter"), "option")
      ).map((t) => t.value);

      var wrapper = this.cn(doc, "purchase-history-pagination-wrapper");
      var links = this.tn(wrapper?.[0], "a");
      var pages = Array.from(links)?.map((r) => /&pn=(\d+)/.exec(r.href)?.[1]);

      var titles = Array.from(this.tn(this.tn(doc, "tbody")?.[0], "tr"))
        .map((tr) => {
          let purchase_date = this.cn(
            tr,
            "ui-it-purchasehistory-item-purchasedate"
          )?.[0]?.innerText?.trim();
          return {
            url: /.+?(?=\?)/.exec(this.tn(tr, "a")?.[0]?.href)?.[0],
            title: /.+(?=[\s\n]+By:)/.exec(
              this.cn(tr, "ui-it-purchasehistory-item-title")?.[0]?.innerText
            )?.[0],
            author: /(?<=[\s\n]+By: ).+/.exec(
              this.cn(tr, "ui-it-purchasehistory-item-title")?.[0]?.innerText
            )?.[0],
            purchase_date: purchase_date
              ? dateString(purchase_date)
              : purchase_date,
          };
        })
        .filter((r) => r.title && r.author);

      page = {
        titles: titles,
        order_date_sel: order_date_sel,
        pages: pages?.length ? this.unqHsh(pages, {}) : [],
      };

      return page;
    },

    run: async function() {
      try {
        this.createDownloadHTML();
        var order_information = await this.getAllOrders();
        this.enrichLibraryInformation(order_information);
      } catch (err) {
        console.log("Fatal error:", err, err.name, err.message);
      }
    }
  };
}
if (typeof process === "undefined" || process.env.JEST_WORKER_ID === undefined) {
  Exporter().run();
}
