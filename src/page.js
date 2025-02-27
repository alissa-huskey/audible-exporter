Page = class {
  #doc = null;

  async fetchDoc(url) {
    let res;
    try {
      res = await fetch(url);
    } catch {
      throw new Error(`Failed to fetch URL: ${url}.`);
    }

    if (!res.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    let text = await res.text();
    return new DOMParser().parseFromString(text, "text/html");
  }

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
}
