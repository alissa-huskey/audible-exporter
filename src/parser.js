Parser = class {
  #doc = null;
  _fields = [];
  _identifiers = [];

  get doc() {
    return this.#doc;
  }

  set doc(value) {
    if (value) {
      if (!value)
        return;

      if (value.constructor.name != "Element") {
        value = new Element(value);
      }

      this.#doc = value;
    }
  }

  data() {
    let f;
    let data = {};

    for (let i in this._fields) {
      try{
        f = this._fields[i];
        data[f] = this[f];
      } catch (err) {
        let identifiers = this._identifers.map((i) => `${i}: ${this[i]}`).join(", ");
        error(`${this.constructor.name}.${f} (${identifiers}):\n`, err);
      }
    }
    return cleanObject(data)
  }
}
