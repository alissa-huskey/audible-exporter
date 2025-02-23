List = class extends Array {
  constructor(items) {
    items = Array.from(items);
    let elements = items.map((item) => new Element(item));
    super(...elements);
  }

  first() {
    return this[0];
  }
}
