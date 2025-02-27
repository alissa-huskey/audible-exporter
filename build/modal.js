
log = function(...msg) {
  console.log("--->", ...msg);
}

hr = function(...msg) {
  console.log("****************************************", ...msg)
}
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

str = function(o) {
  return typeof o == "object"
    ? this.tsvReady(JSON.stringify(o))
    : o
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

stripHTML = function(html) {
   let doc = new DOMParser().parseFromString(html, 'text/html');
   return doc.body.textContent || "";
}

rando = (n) => Math.round(Math.random() * n)

tsvReady = (s) => (
  s
    ? s
        .replace(/\t|\v|\f|\u0009/g, " ")
        .replace(/\r|\n/g, "↵")
        .replace(/\0/g, "")
        .replace(/\\/g, "\\\\")
        .replace(/\'/g, "\\'")
        .replace(/\"/g, '\\"')
    : s
)

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
DOM = class {
  #style = null;
  #css = null;

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
Modal = class extends DOM {
  #css = null;
  #wrapper = null;
  #close_btn = null
  #dl_btn = null;

  selectors = {
    style: "ae-modal-css",
    wrapper: "ae-modal",
    content: "ae-content",
    head: "ae-head",
    close_btn: "ae-close-btn",
  };

  get css() {
    if (!this.#css) {
      this.#css = `
.ae-modal {
  box-sizing: border-box;
  position: fixed;
  font-family: "Cantarell", sans-serif;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  display: none;
}

.ae-modal .ae-content {
  position: absolute;
  width: 50%;
  height: 300px;
  max-height: 50%;
  top: 15%;
  left: 15%;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 3px 15px -2px #222;
  padding: 20px;
  color: #6b7280;
}

.ae-modal .ae-head {
  background-color: #eee;
  padding: 10px;
  /* top-left  top-right bottom-right bottom-left */
  border-radius: 10px 10px 0px 0px;
  border-bottom: 1px solid #ddd;
}

.ae-modal h1 {
  color: #111827;
  font-size: 1.1rem;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  padding-bottom: 10px;
  text-transform: uppercase;
}

#ae-close-btn {
  color: #999;
  font-size: 28px;
  font-weight: bold;
  text-decoration: none;
  margin: 0;
  margin-top: -10px;
  align-self: flex-end;
  float: right;
}

#ae-close-btn:hover,
#ae-close-btn:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}
      `;
    }
    return this.#css;
  }

  // Construct wrapper div, append all child elements, and return
  get wrapper() {
    if (!this.#wrapper) {
      this.#wrapper = Element.create("div", {class: this.selectors.wrapper });
      let content = Element.create("div", {class: this.selectors.content});
      let head = Element.create("div", {class: this.selectors.head});
      let h1 = Element.create("h1");
      let p = Element.create("p");

      h1.innerHTML = "Download";
      p.innerHTML = "Your export is ready!";

      this.wrapper.element.appendChild(content.element);
      content.element.appendChild(head.element);
      content.element.appendChild(p.element);
      content.element.appendChild(this.dl_btn.element)
      head.element.appendChild(this.close_btn.element)
      head.element.appendChild(h1.element)
    }
    return this.#wrapper;
  }

  get close_btn() {
    if (!this.#close_btn) {
        this.#close_btn = Element.create("a", {id: this.selectors.close_btn});
        this.#close_btn.innerHTML = "&times;";
        this.#close_btn.attributes.href = "#";
        this.#close_btn.element.addEventListener("click", () => {
          this.hide();
        }, false);
    }
    return this.#close_btn;
  }

  get dl_btn() {
    if (!this.#dl_btn) {
      this.#dl_btn = Element.create("button", {id: this.selectors.dl_btn});
      this.#dl_btn.innerHTML = "Download";;
    }
    return this.#dl_btn;
  }

  show() {
    this.#wrapper.style.display = "block";
  }

  hide() {
    this.#wrapper.style.display = "none";
  }
}
