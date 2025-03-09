/**
 * Convenience functions for development.
 */

log = function (...msg) {
  console.log("--->", ...msg);
};

hr = function (...msg) {
  console.log("****************************************", ...msg);
};

var CONSOLE_OUTPUT = false;
const LOG_PREFIX = "[audible-exporter]";

info = function (...msg) {
  if (!CONSOLE_OUTPUT) {
    return;
  }
  console.log(LOG_PREFIX, ...msg);
};

error = function (...msg) {
  console.error(LOG_PREFIX, ...msg);
};

log_table = function (label, data) {
  if (!CONSOLE_OUTPUT) {
    return;
  }
  let name = `${LOG_PREFIX} ${label}`;
  console.groupCollapsed(name);
  console.table(data);
  console.groupEnd(name);
};

titleCase = function (text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
};

first = function (arr) {
  let v;
  for (v of arr) {
    if (v) return v;
  }
};

const EMPTIES = { Object: "{}", Array: "[]" };
isEmpty = function (o) {
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
};

tryFloat = function (o) {
  try {
    f = parseFloat(o);
    return isNaN(f) ? o : f;
  } catch (err) {
    return o;
  }
};

tryInt = function (f) {
  try {
    let i = parseInt(f);
    return i == f ? i : f;
  } catch (err) {
    return f;
  }
};

entityDecode = function (text) {
  return text.replace("&amp;", "&");
};

dateString = function (date) {
  if (!date) return "";
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
};

cleanObject = function (ob) {
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
};

fireEvent = function (obj) {
  document.dispatchEvent(
    new CustomEvent("update-ae-notifier", { detail: obj }),
  );
};

stripHTML = function (html) {
  let doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

rando = (n) => Math.round(Math.random() * n);

reg = (o, n) => (o ? o[n] : "");

cleanObject = function (ob) {
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
};

delay = (ms) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

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
  constructor(beginning = null, end = null, task = null) {
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
};

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

/**
 * Manage elements in the DOM.
 *
 * @requires util.js
 * @requires doc.js
 */
DOM = class {
  #style = null;
  #css = null;

  constructor() {
    this.#style = null;
    this.#css = null;
    window.ae ||= {};
  }

  /**
   * CSS content required for an element.
   *
   * @abstract
   */
  get css() {
    return null;
  }

  /**
   * A style tag specific to this element.
   *
   * The contents come from the css getter defined on subclasses.
   *
   * @returns {Doc}
   */
  get style() {
    if (!this.#style) {
      this.#style = Doc.create("style", {
        id: this.selectors.style,
        type: "text/css",
      });

      if (this.#style.element.styleSheet) {
        // Support for IE
        this.#style.element.styleSheet.cssText = this.css;
      } else {
        // Support for the rest
        let node = document.createTextNode(this.css);
        this.#style.append(node);
      }
    }
    return this.#style;
  }

  /**
   * Add the element to the DOM.
   */
  create() {
    let el = Doc.gi(this.selectors.wrapper);
    if (el) el.outerHTML = "";

    document.head.appendChild(this.style.element);
    document.body.appendChild(this.wrapper.element);
  }

  /**
   * Remove the wrapper HTML element from the DOM.
   */
  remove() {
    this.wrapper.element.remove();
  }
};

/**
 * Modal popup windows.
 *
 * @requires util.js
 * @requires doc.js
 * @requires dom.js
 */
Modal = class extends DOM {
  #css = null;
  #wrapper = null;
  #head = null;
  #content = null;
  #close_btn = null;

  title = "";

  selectors = {
    style: "ae-modal-css",
    wrapper: "ae-modal",
    content: "ae-content",
    head: "ae-head",
    close_btn: "ae-close-btn",
  };

  /* Elements
   ***************************************************************************/

  /**
   * Construct wrapper div, append all child elements.
   *
   * @returns {Doc}
   */
  get wrapper() {
    if (!this.#wrapper) {
      let wrapper = Doc.create("div", { class: this.selectors.wrapper });

      wrapper.append(this.content);

      wrapper.style["z-index"] = new Date().getTime();

      this.#wrapper = wrapper;
    }
    return this.#wrapper;
  }

  /**
   * div element for the head section.
   */
  get head() {
    if (!this.#head) {
      let head = Doc.create("div", { class: this.selectors.head });

      head.append(this.close_btn);

      this.#head = head;
    }
    return this.#head;
  }

  /**
   * div element for the main content.
   */
  get content() {
    if (!this.#content) {
      let content = Doc.create("div", { class: this.selectors.content });

      content.append(this.head);

      this.#content = content;
    }
    return this.#content;
  }

  /**
   * Close button a element.
   *
   * @listens click
   *
   * @returns {Doc}
   */
  get close_btn() {
    if (!this.#close_btn) {
      let btn = Doc.create("a", { id: this.selectors.close_btn });
      btn.innerHTML = "&times;";
      btn.attributes.href = "#";

      btn.element.addEventListener(
        "click",
        () => {
          this.hide();
        },
        false,
      );
      this.#close_btn = btn;
    }
    return this.#close_btn;
  }

  /* Methods
   ***************************************************************************/

  /**
   * Show the modal.
   */
  show() {
    this.wrapper.style.display = "block";
  }

  /**
   * Hide the modal.
   */
  hide() {
    this.wrapper.style.display = "none";
  }

  /**
   * Add the wrapper HTML element to the DOM.
   */
  create() {
    window.ae.modal ||= this;
    let colors = window.ae.colors || new Colors();
    colors.create();
    super.create();
  }

  /**
   * Add the wrapper HTML element to the DOM.
   */
  remove() {
    super.remove();
    if (window.ae?.modal) {
      window.ae.modal = null;
    }
  }
};

/**
 * Create a <style> tag for the shared CSS colors.
 *
 * @requires dom.js
 */
Colors = class extends DOM {
  #style = null;
  #css = null;

  selectors = { style: "ae-colors", wrapper: "ae-colors" };

  /**
   * The CSS.
   *
   * On build, the CSS_MARKER line will be replaced with the contents of
   * notifier.css.
   *
   * @returns {string}
   */
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

  /**
   * Construct the style element.
   *
   * @returns {Doc}
   */
  get wrapper() {
    return this.style;
  }

  /**
   * Add the style HTML element to the DOM.
   */
  create() {
    super.create();
    window.ae.colors ||= this;
  }

  /**
   * Remove the style HTML element from the DOM.
   */
  remove() {
    this.wrapper.element.remove();
  }
};

/**
 * Modal pop-up window for downloading the export.
 */
DownloadModal = class extends Modal {
  #css = null;
  #wrapper = null;
  #head = null;
  #content = null;
  #ft_select = null;
  #dl_btn = null;
  #h1 = null;
  #file = null;

  selectors = {
    style: "ae-modal-css",
    wrapper: "ae-modal",
    content: "ae-content",
    head: "ae-head",
    close_btn: "ae-close-btn",

    dl_btn: "ae-download-btn",
    ft_select: "ae-filetype",
    actions: "ae-actions",
  };

  /* Elements
   ***************************************************************************/

  /**
   * div element for the head section.
   */
  get head() {
    if (!this.#head) {
      let head = super.head;

      head.append(this.h1);

      this.#head = head;
    }
    return this.#head;
  }

  /**
   * The div element for the main content of the modal.
   *
   * @returns {Doc}
   */
  get content() {
    if (!this.#content) {
      let content = super.content;

      let dl_wrapper = Doc.create("span", { id: this.selectors.dl_btn });
      let actions = Doc.create("div", { class: this.selectors.actions });
      let p = Doc.create("p");

      p.innerHTML = "Your export is ready!";

      actions.append(this.ft_select, dl_wrapper);

      dl_wrapper.append(this.dl_btn);

      content.append(p, actions);

      this.#content = content;
    }
    return this.#content;
  }

  /**
   * h1 element.
   *
   * @returns {Doc}
   */
  get h1() {
    if (!this.#h1) {
      this.#h1 = Doc.create("h1");
      this.#h1.innerHTML = "Download";
    }
    return this.#h1;
  }

  get ft_select() {
    if (!this.#ft_select) {
      // create select tag
      let select = Doc.create("select", {
        id: this.selectors.ft_select,
        name: this.selectors.ft_select,
      });

      // add options
      let options = { "": " -- Format -- ", json: "JSON", tsv: "TSV" };
      for (let [ft, label] of Object.entries(options)) {
        let option = Doc.create("option", { value: ft });
        option.innerText = label;
        select.element.append(option.element);
      }

      // add event listener to disable/enable the button when a filetype is
      // selected
      select.element.addEventListener("change", () => {
        let btn = window.ae.modal.dl_btn;
        if (select.value) {
          btn.classList.remove("disabled");
        } else {
          btn.classList.add("disabled");
        }
      });

      this.#ft_select = select;
    }
    return this.#ft_select;
  }

  get dl_btn() {
    if (!this.#dl_btn) {
      let btn = Doc.create("a", {
        id: this.selectors.dl_btn,
        class: "ae-btn disabled",
      });
      btn.attributes.href = "#";
      btn.innerHTML = "Download";
      this.#dl_btn = btn;
    }
    return this.#dl_btn;
  }

  get filetype() {
    return this.ft_select.value;
  }

  /**
   * Getter for the file that will be downloaded.
   *
   * @returns {VirtualFile}
   */
  get file() {
    return this.#file;
  }

  /**
   * Setter for the file that will be downloaded.
   *
   * Set the file, set the attributes on the download button to make it work,
   * and add the event listener to get rid of the generated URL once it has
   * been used.
   *
   * @param {VirtualFile} file
   */
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

  /* Static getters.
   ***************************************************************************/

  /**
   * The CSS required to render this element.
   *
   * On build, the CSS_MARKER line will be replaced with the contents of
   * notifier.css.
   *
   * @returns {string}
   */
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
  font-size: 1.1em;
}

.ae-modal .ae-head {
  background-color: var(--ae-near-black);
  padding: 10px;
  border-radius: 10px 10px 0px 0px;
}

.ae-modal h1 {
  color: var(--ae-mystic-white);
  font-size: 1.2rem;
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

#ae-start-modal .ae-head {
  background-color: unset;
}

#ae-start-modal .ae-content {
  width: 60%;
  height: unset;
}

.ae-modal .ae-copy {
  background-color: var(--ae-near-black);
  padding: 25px;
  margin: 20px;
  border-radius: 15px;
}

#ae-close-btn:hover,
#ae-close-btn:focus {
  color: #000;
  text-decoration: none;
  cursor: pointer;
}

.ae-actions {
  display: flex;
  gap: 15px;
  margin: 30px 20px;
}

#ae-start-modal ul {
  margin: 30px 0;

  ::marker {
    font-size: 1.3em;
    color: var(--ae-light-green);

    /* NOTE: Double-escaped here because this will be embedded in JS. */
		content: "\\027B2   ";  /* ➲ */
  }
}

#ae-start-modal li {
  line-height: 1.7em;
}

#ae-start-modal span#ae-start-btn {
  width: 100%;
  display: flex;
  justify-content: center;
}

a.ae-btn {
  background-color: var(--ae-emerald-green);
  color: #000;
  cursor: pointer;

  font-size: 1em;
  font-family: system-ui;
  font-weight: 600;
  text-transform: uppercase;

  text-decoration: none;
  text-align: center;
  padding: 10px 25px;

  display: inline-block;

  border-radius: 4px;
  box-shadow: var(--ae-box-shadow-light-bg);
  -webkit-box-shadow: var(--ae-box-shadow-light-bg);
  -moz-box-shadow: var(--ae-box-shadow-light-bg);
}

a.ae-btn:hover {
  background-color: var(--ae-near-black);
  color: var(--ae-near-white);
  text-decoration: none;

  box-shadow: var(--ae-box-shadow-dark-bg);
  -webkit-box-shadow: var(--ae-box-shadow-dark-bg);
  -moz-box-shadow: var(--ae-box-shadow-dark-bg);
}

a.ae-btn.disabled {
  opacity: 0.5;
  pointer-events: none;
  color: white;
}

#ae-start-modal .ae-content {
  width: 60%;
  height: unset;
}

#ae-download-btn {
  position: relative;
}

#ae-download-btn a {
  padding: 10px 25px;
  text-indent: 15px;
}

#ae-download-btn a:before,
#ae-download-btn a:after {
  content: " ";
  display: block;
  position: absolute;
  left: 14px;
  top: 52%;
}

/* Download box shape  */
#ae-download-btn a:before {
  width: 10px;
  height: 2px;
  border-style: solid;
  border-width: 0 2px 2px;
}

/* Download arrow shape */
#ae-download-btn a:after {
  width: 0;
  height: 0;
  margin-left: 1px;
  margin-top: -7px;

  border-style: solid;
  border-width: 4px 4px 0 4px;
  border-color: transparent;
  border-top-color: inherit;
}

#ae-download-btn a:hover:before {
  border-color: var(--ae-emerald-green);
}

#ae-download-btn a:hover:after {
  animation: downloadArrow 2s linear infinite;
  animation-play-state: running;
  border-top-color: var(--ae-emerald-green);
}

@keyframes downloadArrow {
  /* 0% and 0.001% keyframes used as a hackish way of having the button frozen
   * on a nice looking frame by default */

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
};
