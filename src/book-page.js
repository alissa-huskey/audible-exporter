/**
 * Book page.
 *
 * Parse the book details from an audible book page.
 *
 */

require("./util.js");
require("./page.js");

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
    "authors",
    "narrators",
    "duration",
    "language",
    "release_date",
    "release_timestamp",
    "publisher",
    "summary",
    "audible_original",
    "series",
    "category_type",
    "main_category",
    "sub_category",
    "categories",
    "rating",
    "num_ratings",
    "is_adult",
  ];

  _identifers = ["url"];

  #tags = [];
  #json_scripts = null;
  #json_audiobook = null;
  #json_product = null;
  #product_data = null;
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
  get json_scripts() {
    if (!this.#json_scripts && this.doc) {
      let scripts = this.doc.qs("script[type='application/ld+json']");
      this.#json_scripts = scripts.reduce((obj, doc) => {
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

    return this.#json_scripts;
  }

  get json_audiobook() {
    if (!this.#json_audiobook && this.doc) {
      this.#json_audiobook = this.json_scripts["Audiobook"] || {};
    }
    return this.#json_audiobook;
  }

  get json_product() {
    if (!this.#json_product && this.doc) {
      this.#json_product = this.json_scripts["Product"] || {};
    }
    return this.#json_product;
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
  get product_data() {
    if (!this.#product_data && this.doc) {
      this.#product_data = this.digital_data.product[0].productInfo;
    }
    return this.#product_data;
  }

  /**
   * Return an array of author objects.
   *
   * Each object includes a name and may include id and url.
   *
   * @return {Array}
   */
  get authors() {
    let authors = this.product_data.authors.map((a) => {
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
    return this.product_data.narrators;
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
    return this.json_audiobook?.name;
  }

  get publisher() {
    return this.json_audiobook.publisher;
  }

  get summary() {
    let text = this.json_audiobook.description;
    if (!text) return null;
    return stripHTML(text);
  }

  get audible_original() {
    if (!this.publisher) return null;
    return /^Audible Original/.test(this.publisher);
  }

  get language() {
    let lang = this.json_audiobook.inLanguage;
    return titleCase(lang);
  }

  get is_adult() {
    return this.product_data.isAdultProduct;
  }

  get categories_list() {
    return [];
  }

  /**
   * The duration in minutes.
   *
   * Parsed from a string like: "PT2H25M" or "PT15M".
   *
   * @type      {number}
   */
  get duration() {
    let re = /PT((?<hours>\d+)H)?(?<minutes>\d+)M/;
    let time = this.json_audiobook.duration.match(re);
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

  /**
   * Get tags.
   *
   * Filter tags_list to exclude fiction/nonfiction and main_category.
   *
   * @returns {Array}
   */
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
    return this.digital_data.page.category.primaryCategory;
  }

  get sub_category() {
    return this.digital_data.page.category.subCategory1;
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

  get categories_list() {
    return this.info.categories?.map((c) => c.name.trim()) || [];
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
    for (let s of this.info?.series || []) {
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

  get categories_list() {
    return (
      this.doc.qs(".categoriesLabel a")?.map((c) => {
        return entityDecode(c.innerHTML)?.trim() || "";
      }) || []
    );
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
