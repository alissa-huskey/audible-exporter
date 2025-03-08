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
