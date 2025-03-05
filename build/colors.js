/**
 * dev.js
 * ************************************************************************************
 */

log = function(...msg) {
  console.log("--->", ...msg);
}

hr = function(...msg) {
  console.log("****************************************", ...msg)
}

/**
 * util.js
 * ************************************************************************************
 */

var CONSOLE_OUTPUT = false;
const LOG_PREFIX = "[audible-exporter]";

info = function(...msg) {
  if (!CONSOLE_OUTPUT) {
    return;
  }
  console.log(LOG_PREFIX, ...msg);
}

error = function(...msg) {
  console.error(LOG_PREFIX, ...msg);
}

log_table = function(label, data) {
  if (!CONSOLE_OUTPUT) {
    return;
  }
  let name = `${LOG_PREFIX} ${label}`;
  console.groupCollapsed(name);
  console.table(data);
  console.groupEnd(name);
}

titleCase = function(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

first = function(arr) {
  let v;
  for (v of arr) {
    if (v) return v
  }
}

const EMPTIES = {"Object": "{}", "Array": "[]"};
isEmpty = function(o) {
  if (!o) {
    return true;
  }

  let type = o.constructor.name;

  if (type == "List") {
    return o.length == 0;
  }

  if (!(type in EMPTIES)) {
    throw new Error(`isEmpty() does not support type: ${type} (value: ${o}).`);
  }

  return JSON.stringify(o) == EMPTIES[type];
}

tryFloat = function(o) {
  try {
    f = parseFloat(o);
    return isNaN(f) ? o : f;

  } catch (err) {
    return o;
  }
}

tryInt = function(f) {
  try {
    let i = parseInt(f);
    return i == f ? i : f
  } catch (err) {
    return f;
  }
}

entityDecode = function(text) {
  return text.replace("&amp;", "&");
}

dateString = function(date) {
  if (!date) {
    return ""
  }
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  if (date.constructor.name != "Date") {
    date = new Date(date);
  }
  return `${date.getFullYear()} ${months[date.getMonth()]} ${date.getDate()}`;
}

cleanObject = function(ob) {
  return Object.entries(ob).reduce((r, [k, v]) => {
    if (
      v != null &&
      v != undefined &&
      v !== "" &&
      (typeof v == "boolean" ||
        typeof v == "string" ||
        typeof v == "symbol" ||
        typeof v == "number" ||
        typeof v == "function" ||
        (typeof v == "object" &&
          ((Array.isArray(v) && v.length) || Array.isArray(v) != true)))
    ) {
      r[k] = v;
      return r;
    } else {
      return r;
    }
  }, {});
}

dispatchEvent = function(obj) {
  document.dispatchEvent(new CustomEvent("update-ae-notifier", {
    detail: obj
  }));
}

stripHTML = function(html) {
   let doc = new DOMParser().parseFromString(html, 'text/html');
   return doc.body.textContent || "";
}

rando = (n) => Math.round(Math.random() * n)

reg = (o, n) => (o ? o[n] : "")

cleanObject = function(ob) {
  return Object.entries(ob).reduce((r, [k, v]) => {
    if (
      v != null &&
      v != undefined &&
      v !== "" &&
      (typeof v == "boolean" ||
        typeof v == "string" ||
        typeof v == "symbol" ||
        typeof v == "number" ||
        typeof v == "function" ||
        (typeof v == "object" &&
          ((Array.isArray(v) && v.length) || Array.isArray(v) != true)))
    ) {
      r[k] = v;
      return r;
    } else {
      return r;
    }
  }, {});
}

delay = (ms) => new Promise(res => {
  setTimeout(res, ms)
});

/**
 * element.js
 * ************************************************************************************
 */

Element = class {
  constructor(elm=null) {
    this.element = elm;

    if (!elm) {
      return
    }

    for (let k in elm.__proto__) {
      if (Object.hasOwnProperty(k)) { continue }

      Object.defineProperty(this, k, {
        get: function() { return this.element[k]; },
        set: function(v) { this.element[k] = v },
      });
    }
  }

  static from_html(text) {
    let html = document.createElement("html");
    html.innerHTML = text;

    let elm = new Element(html);
    return elm;
  }

  /**
   * Create HTML Element.
   *
   * @param {str}    html     Tag name or HTML string.
   * @param {object} [attrs]  Attributes to set on element.
   *
   * @return {Element}
   *
   * @example
   * let elm = Element.create("div", {id: "container"});
   * let elm = Element.create("<p>hello</p>");
   */
  static create(html, attrs={}) {
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

    let element = new Element(dom);
    element.set(attrs)
    return element;
  }

  static gc (name) {
    return new List(document.getElementsByClassName(name));
  }

  static gi (name) {
    let node = document.getElementById(name)
    return new Element(node);
  }

  static gt (name) {
    return new List(document.getElementsByTagName(name));
  }

  static qs(query) {
    let res = document.querySelector(query);
    return new Element(res);
  }

  static qsa(query) {
    let res = document.querySelectorAll(query);
    return new List(res);
  }

  gc(name) {
    if (!this.element) {
      return []
    }

    let res = this.element.getElementsByClassName(name);
    return new List(res);
  }

  gi(name) {
    return Element.gi(name);
  }

  gt(name) {
    if (!this.element) {
      return []
    }

    let res = this.element.getElementsByTagName(name);
    return new List(res);
  }

  gcf(name) { return this.gc(name)[0] }
  gtf(name) { return this.gt(name)[0] }

  qs(query) {
    let res = this.element.querySelectorAll(query);
    return new List(res);
  }

  qsf(query) {
    let res = this.element.querySelector(query);
    return new Element(res);
  }

  set(attrs, value=null) {
    if (typeof attrs == "string") {
      let key = attrs;
      attrs = {};
      attrs[key] = value;
    }

    for (let [k, v] of Object.entries(attrs)) {
      this.element.setAttribute(k, v);
    }
  }
}

/**
 * dom.js
 * ************************************************************************************
 */

DOM = class {
  #style = null;
  #css = null;

  constructor() {
    this.#style = null;
    this.#css = null;
  }

  get style() {
    if (!this.#style) {
      this.#style = Element.create("style", {id: this.selectors.style, type: "text/css"});

      if (this.#style.element.styleSheet) {
        // Support for IE
        this.#style.element.styleSheet.cssText = this.css;
      } else {
        // Support for the rest
        let node = document.createTextNode(this.css);
        this.#style.element.appendChild(node);
      }
    }
    return this.#style;
  }

  // add the element to the DOM
  create() {
    let el = Element.gi(this.selectors.wrapper);
    if (el)
      el.outerHTML = "";

    document.head.appendChild(this.style.element);
    document.body.appendChild(this.wrapper.element);
  }
}

/**
 * dom.js
 * ************************************************************************************
 */

Colors = class extends DOM {
  #style = null;
  #css = null;

  get css() {
    if (!this.#css) {
      this.#css = `
/*
  #colors = {
    rasin: "#19191F",
    darkGray: "#232530",
    offWhite: "#abaab3",
    lightGray: "#9a99a1",
  }
*/

:root {
  --ae-bright-green: #0aff99;
  /* --ae-light-green: #18e76a; */
  --ae-light-green: #20D174;
  /* --ae-dark-green: #14c45a; */
  --ae-dark-green: #07ba5b;
  --ae-near-black: #1A191B;

  --ae-black-russian: #25242A;
  --ae-near-black: #1A191B;
  --ae-mystic-white: #dce6ef;
  --ae-basalt-grey: #999999;
  /* --ae-emerald-green: #43c26d; */
  --ae-emerald-green: #14B762;
  --ae-carbon: #333333;
}
      `;
    }
    return this.#css;
  }

  get wrapper() {
    return this.style;
  }
}
