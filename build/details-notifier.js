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
  #percent = null;

  #item_no = null;
  #total = null;

  estimate_padding = 1.05;
  event_name = "update-ae-notifier";

  times = []

  selectors = {
    wrapper: "ae-notifier",
    bar: "ae-bar",
    messages: "ae-messages",
    status: "ae-status-text",
    percentage: "ae-percent-text",
  };

  /**
   * The number of the current item being processed.
   *
   * @returns {number}
   */
  get item_no() {
    return this.#item_no;
  }

  /**
   * Set .item_no and update .text and .percent.
   *
   * @param   {number} value  The number of the current item being processed.
   *
   * @returns {number}
   */
  set item_no(value) {
    this.#item_no = value
    this.text = this.message;
    this.percent = this.item_no / this.total
  }

  /**
   * The total number of items to process.
   */
  get total() {
    return this.#total;
  }

  /**
   * Set .total and update .text.
   */
  set total(value) {
    this.#total = value
    this.text = this.message;
  }

  /**
   * Add a Timer object to the list of times.
   *
   * @param {Timer} value
   */
  set timer(value) {
    this.times.push(value);
  }

  get message() {
    return "Initializing...";
  }

  get css() {
    return `
:root {
  --ae-transparent-black: rgba(0, 0, 0, 0.05);
  --ae-blur-shadow: 0 0 8px 8px var(--ae-transparent-black);
}

#ae-notifier {
  position: fixed;
  top: 100px;
  border-radius: 0.2em;
  font-family: system-ui;
  border: 1px solid var(--ae-light-green);
  background-color: var(--ae-near-black);
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
  background-color: var(--ae-dark-green);
  border-color: var(--ae-light-green);
  -webkit-animation: pulse 1s linear alternate;
  -webkit-animation-iteration-count: infinite; 
}

#ae-messages {
  padding: 14px;
  color: #fff;
  font-size: 1.1em;
  font-weight: 600;

}

#ae-status-text {
  text-wrap: nowrap;

  -webkit-text-stroke: 0.2px var(--ae-dim-gray);

  background-color: var(--ae-transparent-black);
  box-shadow: var(--ae-blur-shadow);
  -webkit-box-shadow: var(--ae-blur-shadow);
  -moz-box-shadow: var(--ae-blur-shadow);
}

#ae-percent-text {
  color: var(--ae-bright-green);
}

.row {
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}

@-webkit-keyframes pulse {
  from { background-color: var(--ae-dark-green); }
  to { background-color: var(--ae-light-green); }
}
    `;
  }

  get body_width() {
    return document.body.getBoundingClientRect().width;
  }

  get bar_width() {
    return this.body_width * 0.8;
  }

  /**
   * The number of items still to be processed.
   *
   * @returns {number}
   */
  get remaining() {
    return this.total - this.item_no;
  }

  /**
   * Amount of time it takes to process each item.
   *
   * Calculated as average of elapsed time in all timer objects in .times in
   * milliseconds.
   *
   * @returns {number}
   */
  get per_item() {
    let total = this.times.reduce((sum, t) =>  sum + t.elapsed, 0);
    return total / this.times.length;
  }

  /**
   * Estimate time left to process remaining items in milliseconds.
   *
   * @return {number}
   */
  get ms_left() {
    return (this.remaining * this.per_item) * this.estimate_padding;
  }

  get minutes_left() {
    let minutes = ((this.ms_left / 1000) / 60).toFixed(1);
    if (minutes == parseInt(minutes)) {
      minutes = parseInt(minutes);
    }
    return minutes;
  }

  /**
   * Construct HTML elements.
   *
   * @returns {Element}
   */
  get wrapper() {
    if (!this.#wrapper) {
      this.#wrapper = Element.create("div", {id: this.selectors.wrapper, style: {
        width: `${this.bar_width}px`,
        left: `${(this.body_width - this.bar_width) / 2}px`,
        'z-index': new Date().getTime(),
      }})

      this.wrapper.element.appendChild(this.bar.element);
      this.bar.element.appendChild(this.messages.element);
      this.messages.element.appendChild(this.status.element);
      this.messages.element.appendChild(this.percentage.element);
    }
    return this.#wrapper;
  }

  /**
   * Progress bar element.
   *
   * @returns {Element}
   */
  get bar() {
    if (!this.#bar) {
      this.#bar = Element.create("div", {id: this.selectors.bar});
    }
    return this.#bar;
  }

  /**
   * Container element that contains text elements.
   *
   * @returns {Element}
   */
  get messages() {
    if (!this.#messages) {
      this.#messages = Element.create("div", {id: this.selectors.messages, class: "row", style: {
        width: `${this.bar_width}px`,
      }});
    }
    return this.#messages;
  }

  /**
   * Div that contains status message.
   *
   * @returns {Element}
   */
  get status() {
    if (!this.#status) {
      this.#status = Element.create("div", {id: this.selectors.status});
    }
    return this.#status;
  }

  /**
   * Span element that contains percentage text.
   */
  get percentage() {
    if (!this.#percentage) {
      this.#percentage = Element.create("span", {id: this.selectors.percentage});
    }
    return this.#percentage;
  }

  /**
   * Get the status message text.
   *
   * @returns {string}
   */
  get text() {
    return this.status.innerText;
  }

  /**
   * Set the status message text.
   *
   * @param {string} message  Message to display.
   */
  set text(message) {
    this.status.innerText = message;
  }

  /**
   * The current percent complete.
   *
   * @returns {float} A value between 0 and 1.0
   */
  get percent() {
    return this.#percent;
  }

  /**
   * Set the percent complete.
   *
   * Set the modal.percent value, the progress bar width, and the percentage
   * text.
   */
  set percent(decimal) {
    this.#percent = decimal;
    let amount = Math.ceil(decimal * 100);
    this.percentage.innerText = `${amount}%`;

    let width = this.bar_width * decimal;
    this.bar.style.width = `${width}px`;
  }

  /**
   * Message to display to the user of the estimated time left.
   *
   * @returns {string}
   */
  get time_left() {
    if (!this.times.length) {
      return "";
    }

    let minutes = this.minutes_left;
    let text;
    if (minutes <= 0.5) {
      text = "less than a minute remaining";
    } else if (minutes <= 1) {
      text = "about a minute remaining";
    } else {
      text = `about ${minutes} minutes remaining`;
    }

    return ` (${text})`;
  }

  /**
   * Hide the modal element.
   */
  hide() {
    this.wrapper.classList.add("hidden");
  }

  /**
   * Show the modal element.
   */
  show() {
    this.wrapper.classList.remove("hidden");
  }

  /**
   * Add the wrapper HTML element to the DOM.
   *
   * Add the .wrapper element to the DOM, add the update-ae-notifier event
   * listener, and set the intital status text.
   */
  create() {
    super.create();
    document.addEventListener(this.event_name, this.listen);
    window.ae = window.ae || {};
    window.ae.notifier = this;
    this.text = this.message;
  }

  /**
   * Event listener.
   *
   * For each item in the event.detail object, set the window.ae.notifier
   * attribute named key to value.
   */
  listen(evt) {
    let notifier = window.ae.notifier;
    for (let [k, v] of Object.entries(evt.detail)) {
      notifier[k] = v;
    }
  }

  /**
   * Clear all user-visible values and set the percent to zero.
   */
  reset() {
    this.text = "";
    this.percent = 0;
    this.percentage.innerText = "";
  }

  /**
   * Remove the wrapper HTML element from the DOM and remove the event
   * listener.
   */
  remove() {
    document.removeEventListener(this.event_name, this.listen);
    if (window.ae) {
      window.ae.notifier = null;
    }
    this.wrapper.element.remove();

    this.#wrapper = null;
    this.#bar = null;
    this.#status = null;
    this.#percentage = null;
  }
}

/**
 * details-notifier.js
 * ************************************************************************************
 */

DetailsNotifier = class extends StatusNotifier {
  #item_no = null;
  #total = null;

  /**
   * Status message to display to the user.
   *
   * Depending on status of progress bar may include:
   *
   * - Initial message.
   * - item_no of total
   * - Estimated minutes remaining
   *
   * @returns {string}
   */
  get message() {
    if (!this.item_no) {
      return "Retrieving additional information on titles...";
    }

    let message = `Retrieving book ${this.item_no} of ${this.total}`

    if (!isEmpty(this.times)) {
      message += this.time_left;
    }

    return message;
  }
}
