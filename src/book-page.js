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
    "duration_minutes",
    "language",
    "release_date",
    "release_timestamp",
    "publisher",
    "publisher_summary",
    "audible_oginal",
    "series",
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
    return this.categories_list[0]?.trim() || null;
  }

  get sub_category() {
    // return the second category if there is one
    if (this.categories_list && this.categories_list.length == 2) {
      return this.categories_list[1].trim();
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

  // get summary() {
  //   return this.doc.qsf("adbl-text-block[slot='summary']").textContent;
  // }

  get categories_list() {
    return this.info.categories?.map((c) => c.name.trim()) || [];
  }

  get tags_list() {
    return this.doc
      .qs("adbl-chip-group.product-topictag-impression adbl-chip")
      .map((c) => c.innerHTML);
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
        return entityDecode(c.innerHTML)?.trim() || "";
      }) || []
    );
  }

  get series() {
    let li = this.doc.qsf("li.seriesLabel");
    if (!li) return null;

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
        number = sibling.textContent.match(/[\d.]+-/)?.[0] || "";
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
