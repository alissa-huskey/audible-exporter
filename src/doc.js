/**
 * Wraper for HTMLElements.
 */

require("./util.js");

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

      if (k in this) continue;

      Object.defineProperty(this, k, {
        get: () => this.element[k],
        set: (v) => {
          this.element[k] = v;
        },
      });
    }
  }

  /**
   * Convert a HTMLCollection of HTMLElements to an Array of Docs.
   *
   * @param {HTMLCollection} collection
   *
   * @returns {Doc[]}
   */
  static toArray(collection) {
    let elements = Array.from(collection);
    return elements.map((item) => new Doc(item));
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
   * @returns {Array}
   */
  static gc(name) {
    return Doc.toArray(document.getElementsByClassName(name));
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
   * @returns {Array}
   */
  static gt(name) {
    return Doc.toArray(document.getElementsByTagName(name));
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
   * @returns {Array}
   */
  static qsa(query) {
    let res = document.querySelectorAll(query);
    return Doc.toArray(res);
  }

  /**
   * Shorthand for element.getElementsByClassName.
   *
   * @returns {Array}
   */
  gc(name) {
    if (!this.element) return [];

    let res = this.element.getElementsByClassName(name);
    return Doc.toArray(res);
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
   * @returns {Array}
   */
  gt(name) {
    if (!this.element) return [];

    let res = this.element.getElementsByTagName(name);
    return Doc.toArray(res);
  }

  /**
   * Shorthand for element.querySelectorAll.
   *
   * @returns {Array}
   */
  qs(query) {
    let res = this.element.querySelectorAll(query);
    return Doc.toArray(res);
  }

  /**
   * First result of element.getElementsByClassName.
   *
   * @returns {Doc}
   */
  gcf(name) {
    return this.gc(name)[0];
  }

  /**
   * First result of element.getElementsByTagName.
   *
   * @returns {Doc}
   */
  gtf(name) {
    return this.gt(name)[0];
  }

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
   * Shortcut for this.element.append().
   *
   * @params {...Doc,HTMLElement,string}  Child or children to append.
   */
  append(...children) {
    children.forEach((child) => {
      if (child instanceof Doc) {
        child = child.element;
      }
      this.element.append(child);
    });
  }

  /**
   * Shortcut for this.element.addEventListener().
   *
   * @params {...args}  args to pass along
   */
  listen(...args) {
    this.element.addEventListener(...args);
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
