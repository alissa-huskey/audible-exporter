/**
 * list.js
 * ************************************************************************************
 */

List = class extends Array {
  constructor(items) {
    items = Array.from(items);
    let elements = items.map((item) => new Doc(item));
    super(...elements);
  }

  get first() {
    return this[0];
  }

  get last() {
    return this.slice(-1)[0];
  }
};
