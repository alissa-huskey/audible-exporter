/**
 * Book page.
 *
 * Parse the book details from an audible book page.
 *
 */

require("./util.js");
require("./page.js");

BookPage = class extends Page {
  #types = ["Fiction", "Nonfiction"];

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
    "LGBTQ+": null,
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

  _fields = [
    "asin",
    "title",
    "authors",
    "narrators",
    "duration",
    "language",
    "released",
    "released_ts",
    "publisher",
    "summary",
    "audible_original",
    "series",
    "type",
    "genre",
    "subgenre",
    "tags",
    "rating",
    "num_ratings",
    "is_adult",
  ];

  _identifers = ["url"];

  #tags = [];
  #json = null;
  #audiobook_data = null;
  #product_data = null;
  #product_info = null;
  #digital_data = null;

  /**
   * Return a BookPage instance of the correct subclass (ADBLBookPage or
   * NormalBookPage).
   *
   * @param {HTMLDocument} html  Document parsed from page contents.
   *
   * @returns {BookPage}
   */
  static new(html) {
    let doc = new Doc(html);
    let page;

    if (doc.gt("adbl-product-details").length) {
      page = new ADBLBookPage(doc);
    } else {
      page = new NormalBookPage(doc);
    }

    return page;
  }

  /**
   * Fetch the book page and return the BookPage object.
   *
   * Return either an ADBLBookPage or NormalBookPage.
   *
   * @param {string} url
   *
   * @returns {BookPage}
   */
  static async get(url) {
    let doc = await new Page().fetchDoc(url);

    let page = BookPage.new(doc);
    page.url = url;

    return page;
  }

  constructor(doc = null) {
    super();
    this.doc = doc;
  }

  /**
   * Get parsed JSON from script tags.
   *
   * Parse the JSON from script tags and return an object mapping each objects
   * "@type" key to the object.
   *
   * @return {Object} Object of parsed JSON mapping @type -> object.
   */
  get json() {
    if (!this.#json && this.doc) {
      let scripts = this.doc.qs("script[type='application/ld+json']");
      this.#json = scripts.reduce((obj, doc) => {
        let json = JSON.parse(doc.innerHTML);
        if (!(json instanceof Array)) {
          json = [json];
        }
        json.forEach((child) => {
          obj[child["@type"]] = child;
        });
        return obj;
      }, {});
    }

    return this.#json;
  }

  get audiobook_data() {
    if (!this.#audiobook_data && this.doc) {
      this.#audiobook_data = this.json["Audiobook"] || {};
    }
    return this.#audiobook_data;
  }

  get product_data() {
    if (!this.#product_data && this.doc) {
      this.#product_data = this.json["Product"] || {};
    }
    return this.#product_data;
  }

  /**
   * Return digitalData value;
   *
   * @return {object}
   */
  get digital_data() {
    if (!this.#digital_data && this.doc) {
      let digitalData;

      let tags = this.doc.qs("script[type='text/javascript']");
      let script = tags.filter((t) => t.innerHTML.match(/digitalData/));
      let js = script[0].innerHTML;
      js = js.replace("var digitalData = ", "digitalData =");
      eval(js);
      this.#digital_data = digitalData;
    }
    return this.#digital_data;
  }

  /**
   * Return the relevant data from the digitalData variable.
   *
   * Same as:
   *   digitalData.product[0].productInfo;
   *
   * @return {object}
   */
  get product_info() {
    if (!this.#product_info && this.doc) {
      this.#product_info = this.digital_data.product[0].productInfo;
    }
    return this.#product_info;
  }

  /**
   * Return an array of author objects.
   *
   * Each object includes a name and may include id and url.
   *
   * @return {Array}
   */
  get authors() {
    let authors = this.product_info.authors.map((a) => {
      let author = { name: a.fullName };
      if (a.id) {
        author.id = a.id;
        author.url = `/author/${a.id}`;
      }
      return author;
    });

    return authors || [];
  }

  get narrators() {
    return this.product_info.narrators;
  }

  get rating() {
    let rating = tryFloat(this.audiobook_data.aggregateRating?.ratingValue);
    return rating ? +rating.toFixed(1) : "";
  }

  get num_ratings() {
    return tryInt(this.audiobook_data.aggregateRating?.ratingCount);
  }

  get asin() {
    return this.product_data.productID;
  }

  get date() {
    let date = this.audiobook_data.datePublished;
    if (!date) return null;
    return new Date(`${date}:00:00:01`);
  }

  get released() {
    if (!this.date) return null;
    return dateString(this.date);
  }

  get released_ts() {
    return this.date.getTime();
  }

  get title() {
    return this.audiobook_data?.name;
  }

  get publisher() {
    return this.audiobook_data.publisher;
  }

  get summary() {
    let text = this.audiobook_data.description;
    if (!text) return null;
    return stripHTML(text);
  }

  get audible_original() {
    if (!this.publisher) return null;
    return /^Audible Original/.test(this.publisher);
  }

  get language() {
    let lang = this.audiobook_data.inLanguage;
    return titleCase(lang);
  }

  get is_adult() {
    return this.product_info.isAdultProduct;
  }

  /**
   * The duration in minutes.
   *
   * Parsed from a string like: "PT2H25M" or "PT15M".
   *
   * @type      {number}
   */
  get duration() {
    let re = /PT((?<hours>\d+)H)?((?<minutes>\d+)M)?/;
    let time = this.audiobook_data.duration.match(re);
    return toMinutes(time.groups.hours, time.groups.minutes);
  }

  get tags_list() {
    return [];
  }

  /**
   * Determine fiction or nonfiction.
   *
   * @return {string}
   */
  get type() {
    let labels = [this.genre, this.subgenre, ...this.tags_list];

    // check if the "Fiction" or "Nonfiction" is in any of the tags
    let found = this.#types.filter((t) =>
      labels.some((l) => new RegExp(`\\b${t}\\b`, "i").test(l)),
    );
    if (found.length) {
      return found.first;
    }

    // get the fiction/nonfiction designation from #category_genres
    let types = [
      ...new Set(labels.map((l) => this.#category_genres[l]).filter((t) => t)),
    ];

    switch (types.length) {
      case 0:
        return null;
      case 1:
        return titleCase(types.first);
      default:
        return "Fiction";
    }
  }

  get genre() {
    return this.digital_data.page.category.primaryCategory;
  }

  get subgenre() {
    return this.digital_data.page.category.subCategory1;
  }

  /**
   * Get tags.
   *
   * Filter tags_list to exclude generes and types.
   *
   * @returns {Array}
   */
  get tags() {
    if (!this.#tags.length && this.tags_list) {
      let exclude = [...this.#types, this.genre, this.subgenre];
      this.#tags = this.tags_list.filter((t) => !exclude.includes(t));
    }
    return this.#tags;
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
  /**
   * Return data parsed from JSON script inside of <adbl-product-metadata> tags.
   *
   * @return {object}
   */
  get adbl_data() {
    let scripts = this.doc.qs("adbl-product-metadata script");
    return Object.assign({}, ...scripts.map((s) => JSON.parse(s.textContent)));
  }

  /**
   * Parse list of tags.
   *
   * @return {Array}
   */
  get tags_list() {
    return this.doc
      .qs("adbl-chip-group.product-topictag-impression adbl-chip")
      .map((c) => entityDecode(c.innerHTML));
  }

  get series() {
    let series = [];
    for (let s of this.adbl_data?.series || []) {
      series.push({
        id: s.url?.match(/series\/.*\/(.*)\?/)?.[1] || "",
        url: s.url?.replace(/\?.*$/, "") || "",
        name: s.name,
        number: s.part?.replace("Book ", "") || "",
      });
    }
    return series;
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
  get tags_list() {
    return this.doc.gc("bc-chip-text").map((c) => {
      return c.attributes["data-text"].value;
    });
  }

  get series() {
    let li = this.doc.qsf("li.seriesLabel");
    if (!li?.element) return [];

    let series = [];

    let children = Array.from(li.childNodes);
    for (let i in children) {
      let node = children[i];
      if (!(node instanceof HTMLAnchorElement)) continue;

      let [_, url, id] = /(\/series\/.*\/(.*))\?/.exec(node.href) || [
        null,
        "",
        "",
      ];

      let number = "";
      let sibling = node.nextSibling;
      if (sibling && sibling instanceof Text) {
        number = sibling.textContent.match(/[\d.-]+/)?.[0] || "";
      }

      series.push({
        id: id,
        url: url,
        name: node.innerHTML.trim(),
        number: number,
      });
    }
    return series;
  }
};
