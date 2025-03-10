require("./util.js");
require("./parser.js");

Page = class extends Parser {
  async fetchDoc(url) {
    let res;
    try {
      res = await fetch(url);

      if (!res.ok) {
        error(`Page.fetchDoc("${url.trim()}"): Response status: ${res.status}`);
      }

      let text = await res.text();
      return new DOMParser().parseFromString(text, "text/html");
    } catch (err) {
      error(`Page.fetchDoc("${url.trim()}"):\n`, err);
    }
  }
};
