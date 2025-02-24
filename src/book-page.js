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
