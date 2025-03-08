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
 * timer.js
 * ************************************************************************************
 */

/**
 * Measure how long a block of code takes to execute.
 *
 * @example
 *   
      let sleep = (ms) => new Promise(res => {
        setTimeout(res, ms);
      });

      let timer = new Timer();
      timer.start();

      await sleep(500);

      timer.stop();
      console.log(`That took: ${timer.seconds} seconds.`);
 *
 */
Timer = class {
  constructor(beginning=null, end=null, task=null) {
    this.beginning = beginning;
    this.end = end;
    this.task = task;
  }

  start() {
    this.beginning = this.ts();
    return this.beginning;
  }

  stop() {
    this.end = this.ts();
    return this.end;
  }

  get elapsed() {
    return this.end - this.beginning;
  }

  get seconds() {
    return this.elapsed / 1000;
  }

  get minutes() {
    return (this.seconds / 60).toFixed(2);
  }

  ts() {
    return new Date().getTime();
  }

  async time(callback) {
    this.start();
    let result = await callback();
    this.stop();
    return result;
  }
}

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
 * colors.js
 * ************************************************************************************
 */

Colors = class extends DOM {
  #style = null;
  #css = null;

  selectors = { style: "ae-colors", wrapper: "ae-colors" };

  get css() {
    if (!this.#css) {
      this.#css = `
/*
  #colors = {
    darkGray: "#232530",
    offWhite: "#abaab3",
  }
*/

:root {
  /* --ae-dark-green: #14c45a; */
  /* --ae-light-green: #18e76a; */
  /* --ae-emerald-green: #43c26d; */

  --ae-near-black: #1A191B;
  --ae-black-russian: #25242A;

  --ae-dark-green: #07ba5b;
  --ae-emerald-green: #14B762;
  --ae-light-green: #20D174;
  --ae-bright-green: #0aff99;

  --ae-carbon: #333333;
  --ae-dim-gray: #4d4d4d;
  --ae-gray: #808080;
  --ae-basalt-gray: #9a99a1;  /* very close to #999999 */
  --ae-mystic-white: #dce6ef;
  --ae-near-white: #eaeaea;

}
      `;
    }
    return this.#css;
  }

  get wrapper() {
    return this.style;
  }

  create() {
    super.create();
    window.ae = window.ae || {};
    window.ae.colors = this;
  }

  /**
   * Remove the style HTML element from the DOM and the window.ae object.
   */
  remove() {
    if (window.ae) {
      window.ae.colors = null;
    }
    this.wrapper.element.remove();
  }
}

/**
 * modal.js
 * ************************************************************************************
 */

Modal = class extends DOM {
  #css = null;
  #wrapper = null;
  #close_btn = null
  #dl_btn = null;
  #file = null;

  selectors = {
    style: "ae-modal-css",
    wrapper: "ae-modal",
    content: "ae-content",
    head: "ae-head",
    close_btn: "ae-close-btn",
    dl_btn: "ae-download-btn",
  };

  get css() {
    if (!this.#css) {
      this.#css = `
:root {
  --ae-box-shadow: 3px 3px 10px 3px;
  --ae-box-shadow-light-bg: var(--ae-box-shadow) var(--ae-dim-gray);
  --ae-box-shadow-dark-bg: var(--ae-box-shadow) var(--ae-carbon);
}

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
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 50%;
  height: 300px;

  border-radius: 15px;
  box-shadow: 0 3px 15px -2px #222;
  padding: 20px;
  background-color: var(--ae-black-russian);
  color: var(--ae-near-white);
}

.ae-modal .ae-head {
  background-color: var(--ae-near-black);
  padding: 10px;
  border-radius: 10px 10px 0px 0px;
}

.ae-modal h1 {
  color: var(--ae-mystic-white);
  font-size: 1.1rem;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  padding-bottom: 10px;
  text-transform: uppercase;
}

.ae-modal #ae-close-btn {
  color: var(--ae-basalt-gray);
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

a#ae-download-btn {
  background-color: var(--ae-emerald-green);
  color: #000;
  cursor: pointer;

  text-decoration: none;
  font-family: sans-serif;
  text-align: center;
  font-size: 0.9em;

  display: inline-block;
  padding: 10px 25px;
  text-indent: 15px;

  box-shadow: var(--ae-box-shadow-light-bg);
  -webkit-box-shadow: var(--ae-box-shadow-light-bg);
  -moz-box-shadow: var(--ae-box-shadow-light-bg);
}

a#ae-download-btn:hover {
  background-color: var(--ae-near-black);
  color: var(--ae-near-white);

  box-shadow: var(--ae-box-shadow-dark-bg);
  -webkit-box-shadow: var(--ae-box-shadow-dark-bg);
  -moz-box-shadow: var(--ae-box-shadow-dark-bg);
}

a#ae-download-btn:before, a#ae-download-btn:after {
  content: ' ';
  display: block;
  position: absolute;
  left: 33px;
  top: 45%;
}

/* Download box shape  */
a#ae-download-btn:before {
  width: 10px;
  height: 2px;
  border-style: solid;
  border-width: 0 2px 2px;
}

/* Download arrow shape */
a#ae-download-btn:after {
  width: 0;
  height: 0;
  margin-left: 1px;
  margin-top: -7px;

  border-style: solid;
  border-width: 4px 4px 0 4px;
  border-color: transparent;
  border-top-color: inherit;

  animation: downloadArrow 2s linear infinite;
  animation-play-state: paused;
}

a#ae-download-btn:hover:before {
  border-color: var(--ae-emerald-green);
}

a#ae-download-btn:hover:after {
  border-top-color: var(--ae-emerald-green);
  animation-play-state: running;
}

/* keyframes for the download icon anim */
@keyframes downloadArrow {
  /* 0% and 0.001% keyframes used as a hackish way of having the button frozen on a nice looking frame by default */
  0% {
    margin-top: -7px;
    opacity: 1;
  }

  0.001% {
    margin-top: -15px;
    opacity: 0;
  }

  50% {
    opacity: 1;
  }

  100% {
    margin-top: 0;
    opacity: 0;
  }
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

      this.#wrapper.style["z-index"] = new Date().getTime();
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
      this.#dl_btn = Element.create("a", {id: this.selectors.dl_btn});
        this.#dl_btn.attributes.href = "#";
      this.#dl_btn.innerHTML = "Download";;
    }
    return this.#dl_btn;
  }

  get file() {
    return this.#file;
  }

  set file(file) {
    this.#file = file;
    this.dl_btn.element.href = file.url;
    this.dl_btn.element.download = file.filename;
    this.dl_btn.element.addEventListener("click", () => {
        setTimeout(() => {
          window.URL.revokeObjectURL(file.url);
        }, 10);
    });
  }

  show() {
    this.#wrapper.style.display = "block";
  }

  hide() {
    this.#wrapper.style.display = "none";
  }

  /**
   * Add the wrapper HTML element to the DOM.
   */
  create() {
    super.create();
    new Colors().create();
  }
}
