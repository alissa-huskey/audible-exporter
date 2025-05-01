/*
 * Parser.
 *
 * DOM Element Parser.
 */

require("./util.js");
require("./doc.js");

/*
 * Parser class.
 *
 *
 */
Parser = class {
  #doc = null;

  /**
   * List of .data() object properties mapped to class members.
   *
   * To be defined in subclasses.
   *
   * @access protected
   */
  _fields = [];

  /*
   * List of class members to identify an individual page for error messages.
   *
   * To be defined in subclasses.
   *
   * @access protected
   */
  _identifiers = [];

  /**
   * Get #doc.
   *
   * @return {Doc}
   */
  get doc() {
    return this.#doc;
  }

  /**
   * Set #doc.
   *
   * @param {Doc} value
   */
  set doc(value) {
    if (value) {
      if (!value) return;

      if (!(value instanceof Doc)) {
        value = new Doc(value);
      }

      this.#doc = value;
    }
  }

  /**
   * Return the data parsed from the .doc.
   *
   * Construct data object by mapping list of ._fields to class member values.
   *
   * Catch and re-raise exceptions using ._identifiers class member values in
   * error message.
   *
   * @return {Object}
   */
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
