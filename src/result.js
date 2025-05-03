/**
 * Result.
 *
 * Final result set for a book from library data, order data, and book details
 * data.
 */
Result = class {
  /**
   * Mapping of header to list of sources in order of precedence.
   *
   * @access private
   */
  #headers = {
    id: ["order", "library", "details"],
    url: ["order", "library"],
    title: ["order", "details", "library"],
    authors: ["details", "library"],
    narrators: ["details", "library"],
    series: ["library", "details"],
    publisher: ["details"],
    duration: ["details"],
    release_date: ["details"],
    release_timestamp: ["details"],
    purchase_date: ["order"],
    language: ["details"],
    summary: ["details"],
    rating: ["details"],
    num_ratings: ["details"],
    audible_original: ["details"],
    type: ["details"],
    genre: ["details"],
    subgenre: ["details"],
    tags: ["details"],
    is_adult: ["details"],
  };

  constructor(library = null, details = null, order = null) {
    this.library = library || {};
    this.details = details || {};
    this.order = order || {};
  }

  /**
   * Get the value for key from the first source that has it defined.
   *
   * @param {string} key  Key from .#headers.
   *
   * @return {any}
   */
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

  /**
   * Mapping of keys from .#headers to the value pulled from source data.
   *
   * @return {object}
   */
  data() {
    return Object.fromEntries(
      Object.keys(this.#headers).map((key) => {
        return [key, this.first(key)];
      }),
    );
  }
};
