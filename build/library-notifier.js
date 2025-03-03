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
 * status-notifier.js
 * ************************************************************************************
 */

StatusNotifier = class extends DOM {
  #wrapper = null;
  #bar = null;
  #status = null;
  #percentage = null;
  #messages = null;
  #style = null;

  #colors = {
    darkGreen: "#07ba5b",
    lightGreen: "#3de367",
    nearBlack: "#121212",
    white: "#fff",
    rasin: "#19191F",
    darkGray: "#232530",
    offWhite: "#abaab3",
    lightGray: "#9a99a1",
  }
  #pulse_colors = {true: "#07ba5b", false: "#3de367"}

  selectors = {
    wrapper: "ae-notifier",
    bar: "ae-bar",
    messages: "ae-messages",
    status: "ae-status-text",
    percentage: "ae-percent-text",
  };

  get message() {
    return "Initializing...";
  }

  get css() {
    return `
#ae-notifier {
  position: fixed;
  top: 100px;
  border-radius: 0.2em;
  border-width: 1px;
  border-style: solid;
  font-family: system-ui;
}

#ae-notifier.hidden {
  display: none;
}

#ae-bar {
  width: 0;
  height: 50px;
  border-bottom-right-radius: 0.2em;
  border-top-right-radius: 0.2em;
  transition: all 1s;
  border-width: 1px;
  border-style: solid;
}

#ae-messages {
  padding: 14px;
  color: #fff;
}

#ae-status-text {
  text-wrap: nowrap;
}

#ae-percent-text {
}

.row {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
    `;
  }

  get body_width() {
    return document.body.getBoundingClientRect().width;
  }

  get bar_width() {
    return this.body_width * 0.8;
  }

  // Construct notifier wrapper div, append all child elements, and return
  get wrapper() {
    if (!this.#wrapper) {
      this.#wrapper = Element.create("div", {id: this.selectors.wrapper, style: {
        width: `${this.bar_width}px`,
        left: `${(this.body_width - this.bar_width) / 2}px`,
        background: this.#colors.nearBlack,
        'border-color': this.#colors.lightGreen,
        'z-index': new Date().getTime(),
      }})

      this.wrapper.element.appendChild(this.bar.element);
      this.bar.element.appendChild(this.messages.element);
      this.messages.element.appendChild(this.status.element);
      this.messages.element.appendChild(this.percentage.element);
    }
    return this.#wrapper;
  }

  // progress bar element
  get bar() {
    if (!this.#bar) {
      this.#bar = Element.create("div", {id: this.selectors.bar, style: {
        background: this.#colors.darkGreen,
        'border-color': this.#colors.lightGreen,
      }});
    }
    return this.#bar;
  }

  get messages() {
    if (!this.#messages) {
      this.#messages = Element.create("div", {id: this.selectors.messages, class: "row", style: {
        width: `${this.bar_width}px`,
        // color: "#112A46",
        // color: "#0c1b1d",
        // color: "#283747",
      }});
    }
    return this.#messages;
  }

  // status text element
  get status() {
    if (!this.#status) {
      this.#status = Element.create("div", {id: this.selectors.status, style: {
        // color: "#112A46",
        // color: "#0c1b1d",
        // color: "#283747",
      }});
    }
    return this.#status;
  }

  // percent text element
  get percentage() {
    if (!this.#percentage) {
      this.#percentage = Element.create("span", {id: this.selectors.percentage, style: {
        color: "#87ff65", // bright green
        color: "#0aff99", // bright green
        // color: "#00ff80", // bright green
        // color: "#00ff9f", // bright green
        // color: "#0dffae", // bright green
      }});
    }
    return this.#percentage;
  }

  // set the status text
  set text(message) {
    this.status.innerText = message;
  }

  // set the percentage text and progress bar width
  set percent(decimal) {
    let amount = Math.ceil(decimal * 100);
    this.percentage.innerText = `${amount}%`;

    let width = this.bar_width * decimal;
    this.bar.style.width = `${width}px`;
  }

  // set the percent text, progress bar width, and pulse the background color
  // on alternating odd/even increments
  updateProgress(percent, i=null) {
    this.percent = percent;
    if (i != null) {
      this.pulse(i);
    }
  }

  pulse(value) {
    this.bar.style["background-color"] = this.#pulse_colors[value % 2 == 0];
  }

  timeLeft(remaining) {
    let per_book = 1.9;

    return Math.round((remaining * per_book) / 60);
  }

  hide() {
    this.wrapper.classList.add("hidden");
  }

  show() {
    this.wrapper.classList.remove("hidden");
  }

  create() {
    super.create();

    document.addEventListener("update-ae-notifier", (e) => {
      for (let [k, v] of Object.entries(e.detail)) {
        this[k] = v;
      }
    });

    this.text = this.message;
  }

  reset() {
    this.text = "";
    this.percent = 0;
    this.bar.style.background = this.#colors.darkGreen;
    this.percentage.innerText = "";
  }

  // remove the elements from the DOM
  remove() {
    this.wrapper.element.remove();

    this.#wrapper = null;
    this.#bar = null;
    this.#status = null;
    this.#percentage = null;
  }
}

/**
 * library-notifier.js
 * ************************************************************************************
 */

LibraryNotifier = class extends StatusNotifier {
  #page = null;
  #page_count = null;

  get page() {
    return this.#page;
  }

  set page(value) {
    this.#page = value
    this.text = this.message;
    this.percent = this.page / this.page_count
  }

  get page_count() {
    return this.#page_count;
  }

  set page_count(value) {
    this.#page_count = value
    this.text = this.message;
  }

  get message() {
    if (!this.page) {
      return "Retrieving library...";
    }

    let message = `Retrieving library: page ${this.page}`
    if (this.page_count) {
      message += ` of ${this.page_count}`;
    } else {
      message += "...";
    }

    return message;
  }
}
