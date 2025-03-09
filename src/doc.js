/**
 * Wraper for HTMLElements.
 *
 * @requires util.js
 * @requires list.js
 */
Doc = class {
  /**
   * Constructor.
   *
   * @params {HTMLElement} [elm]
   */
  constructor(elm = null) {
    this.element = elm;

    if (!elm) return;

    for (let k in elm.__proto__) {
      // eslint-disable-next-line no-prototype-builtins
      if (Object.hasOwnProperty(k)) continue;

      Object.defineProperty(this, k, {
        get: () => this.element[k],
        set: (v) => {
          this.element[k] = v;
        },
      });
    }
  }

  /**
   * Create a Doc object from raw HTML.
   *
   * @params {string} text
   */
  static from_html(text) {
    let html = document.createElement("html");
    html.innerHTML = text;

    let elm = new Doc(html);
    return elm;
  }

  /**
   * Create HTMLElement.
   *
   * @param {str}    html     Tag name or HTML string.
   * @param {object} [attrs]  Attributes to set on element.
   *
   * @return {Doc}
   *
   * @example
   * let elm = Doc.create("div", {id: "container"});
   * let elm = Doc.create("<p>hello</p>");
   */
  static create(html, attrs = {}) {
    let dom;
    if (html.includes("<")) {
      let doc = document.createElement("body");
      doc.innerHTML = html;
      dom = doc.lastChild;
    } else if (html) {
      dom = document.createElement(html);
    }

    if (attrs.style && typeof attrs.style == "object") {
      for (let [k, v] of Object.entries(attrs.style)) {
        dom.style[k] = v;
      }
      delete attrs.style;
    }

    let element = new Doc(dom);
    element.set(attrs);
    return element;
  }

  /**
   * Shorthand for document.getElementsByClassName.
   *
   * @returns {List}
   */
  static gc(name) {
    return new List(document.getElementsByClassName(name));
  }

  /**
   * Shorthand for document.getElementById.
   *
   * @returns {Doc}
   */
  static gi(name) {
    let node = document.getElementById(name);
    return new Doc(node);
  }

  /**
   * Shorthand for document.getElementsByTagName.
   *
   * @returns {List}
   */
  static gt(name) {
    return new List(document.getElementsByTagName(name));
  }

  /**
   * Shorthand for document.querySelector.
   *
   * @returns {Doc}
   */
  static qs(query) {
    let res = document.querySelector(query);
    return new Doc(res);
  }

  /**
   * Shorthand for document.querySelectorAll.
   *
   * @returns {List}
   */
  static qsa(query) {
    let res = document.querySelectorAll(query);
    return new List(res);
  }

  /**
   * Shorthand for element.getElementsByClassName.
   *
   * @returns {List}
   */
  gc(name) {
    if (!this.element) return [];

    let res = this.element.getElementsByClassName(name);
    return new List(res);
  }

  /**
   * Shorthand for element.getElementById.
   *
   * @returns {Doc}
   */
  gi(name) {
    return Doc.gi(name);
  }

  /**
   * Shorthand for element.getElementsByTagName.
   *
   * @returns {List}
   */
  gt(name) {
    if (!this.element) return [];

    let res = this.element.getElementsByTagName(name);
    return new List(res);
  }

  /**
   * Shorthand for element.querySelectorAll.
   *
   * @returns {List}
   */
  qs(query) {
    let res = this.element.querySelectorAll(query);
    return new List(res);
  }

  /**
   * First result of element.getElementsByClassName.
   *
   * @returns {Doc}
   */
  gcf = (name) => this.gc(name)[0];

  /**
   * First result of element.getElementsByTagName.
   *
   * @returns {Doc}
   */
  gtf = (name) => this.gt(name)[0];

  /**
   * Shorthand for element.querySelector.
   *
   * @returns {Doc}
   */
  qsf(query) {
    let res = this.element.querySelector(query);
    return new Doc(res);
  }

  /**
   * Set attributes.
   *
   * @param {string, object} attrs  An object of attr names and values, or a
   *                                   single attribute name.
   * @param {string}         value  The value to set, when attrs is a string.
   *
   * @example
   *
   * doc.set("id", "thing-1");
   * doc.set({id: "thing-2", "class": "small"});
   */
  set(attrs, value = null) {
    if (typeof attrs == "string") {
      let key = attrs;
      attrs = {};
      attrs[key] = value;
    }

    for (let [k, v] of Object.entries(attrs)) {
      this.element.setAttribute(k, v);
    }
  }
};
