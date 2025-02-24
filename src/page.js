Page = class {
  #doc = null;

  async fetchDoc(url) {
    let res = await fetch(url);

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
      this.#doc = new Element(value);
    }
  }
}
