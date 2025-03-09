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

    let properties = {};
    for (let k in elm.__proto__) {
      // eslint-disable-next-line no-prototype-builtins
      if (Object.hasOwnProperty(k)) continue;

      properties[k] = k in this;

      if (k in this) continue;

      Object.defineProperty(this, k, {
        get: () => this.element[k],
        set: (v) => {
          this.element[k] = v;
        },
      });

      info(properties);
    }
  }

  append() {
    info("appending...");
  }

  /**
   * Shortcut for this.element.append().
   *
   * @params {...Doc,HTMLElement,string}  Child or children to append.
   */
  add(...children) {
    children.forEach((child) => {
      if (child instanceof Doc) {
        child = child.element;
      }
      log("appending:", child);
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
        this.#style.element.appendChild(node);
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

      wrapper.element.appendChild(this.content.element);

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

      head.element.appendChild(this.close_btn.element);

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

      content.element.appendChild(this.head.element);

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

StatusNotifier = class extends DOM {
  #wrapper = null;
  #bar = null;
  #status = null;
  #percentage = null;
  #messages = null;
  #context = null;
  #steps = null;
  #estimate = null;
  #style = null;
  #percent = null;

  #item_no = null;
  #total = null;

  step_no = null;
  total_steps = 4;
  estimate_padding = 1.05;
  event_name = "update-ae-notifier";

  times = [];

  selectors = {
    wrapper: "ae-notifier",
    bar: "ae-bar",
    messages: "ae-messages",
    status: "ae-status-text",
    percentage: "ae-percent-text",
    context: "ae-context",
    steps: "ae-steps-text",
    estimate: "ae-estimate-text",
  };

  /* Elements
   ***************************************************************************/

  /**
   * Construct HTML elements.
   *
   * @returns {Doc}
   */
  get wrapper() {
    if (!this.#wrapper) {
      this.#wrapper = Doc.create("div", {
        id: this.selectors.wrapper,
        style: {
          width: `${this.bar_width}px`,
          left: `${(this.body_width - this.bar_width) / 2}px`,
          "z-index": new Date().getTime(),
        },
      });

      this.wrapper.element.appendChild(this.bar.element);
      this.wrapper.element.appendChild(this.context.element);
    }
    return this.#wrapper;
  }

  /**
   * Progress bar element.
   *
   * @returns {Doc}
   */
  get bar() {
    if (!this.#bar) {
      this.#bar = Doc.create("div", { id: this.selectors.bar });
      this.#bar.element.appendChild(this.messages.element);
    }
    return this.#bar;
  }

  /**
   * Div that contains text elements.
   *
   * @returns {Doc}
   */
  get messages() {
    if (!this.#messages) {
      this.#messages = Doc.create("div", {
        id: this.selectors.messages,
        class: "ae-row",
        style: { width: `${this.bar_width}px` },
      });
      this.#messages.element.appendChild(this.status.element);
      this.#messages.element.appendChild(this.percentage.element);
    }
    return this.#messages;
  }

  /**
   * Div that contains status message.
   *
   * @returns {Doc}
   */
  get status() {
    if (!this.#status) {
      this.#status = Doc.create("div", { id: this.selectors.status });
    }
    return this.#status;
  }

  /**
   * Span element that contains percentage text.
   */
  get percentage() {
    if (!this.#percentage) {
      this.#percentage = Doc.create("span", {
        id: this.selectors.percentage,
      });
    }
    return this.#percentage;
  }

  /**
   * Div under the progress bar.
   *
   * @returns {Doc}
   */
  get context() {
    if (!this.#context) {
      this.#context = Doc.create("div", {
        id: this.selectors.context,
        class: "ae-row empty",
      });

      this.#context.element.appendChild(this.steps.element);
      this.#context.element.appendChild(this.estimate.element);
    }
    return this.#context;
  }

  /**
   * Span that contains the "Step x of y" text.
   *
   * @returns {Doc}
   */
  get steps() {
    if (!this.#steps) {
      this.#steps = Doc.create("span", { id: this.selectors.steps });
    }
    return this.#steps;
  }

  /**
   * Span that contains the estimated remaining time.
   *
   * @returns {Doc}
   */
  get estimate() {
    if (!this.#estimate) {
      this.#estimate = Doc.create("span", { id: this.selectors.estimate });
    }
    return this.#estimate;
  }

  /* Accessors
   ***************************************************************************/

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
    this.#item_no = value;
    this.text = this.message;
    this.percent = this.ratio;
    this.time = this.time_left;
  }

  /**
   * The total number of items to process.
   */
  get total() {
    return this.#total;
  }

  /**
   * Set .total and update text and percent.
   */
  set total(value) {
    this.#total = value;
    this.text = this.message;
    this.percent = this.ratio;
    this.time = this.time_left;
    this.step = this.step_text;
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
    if (isNaN(decimal) || !isFinite(decimal)) {
      return;
    }
    this.#percent = decimal;
    let amount = Math.ceil(decimal * 100);
    this.percentage.innerText = `${amount}%`;

    let width = this.bar_width * decimal;
    this.bar.style.width = `${width}px`;
  }

  /**
   * Get the step message text.
   *
   * @returns {string}
   */
  get step() {
    return this.steps.innerText;
  }

  /**
   * Set the step message text.
   *
   * @param {string} message  Message to display.
   */
  set step(message) {
    this.context.classList.remove("empty");
    this.steps.innerText = message;
  }

  /**
   * Get the remaining time message text.
   *
   * @returns {string}
   */
  get time() {
    return this.estimate.innerText;
  }

  /**
   * Set the time message text.
   *
   * @param {string} message  Message to display.
   */
  set time(message) {
    this.context.classList.remove("empty");
    this.estimate.innerText = message;
  }

  /**
   * Add a Timer object to the list of times.
   *
   * @param {Timer} value
   */
  set timer(value) {
    this.times.push(value);
    this.time = this.time_left;
  }

  /* Static getters
   ***************************************************************************/

  /**
   * The message to display to the user.
   *
   * @returns {string}
   */
  get message() {
    return "Initializing...";
  }

  /**
   * The CSS required to render this element.
   *
   * On build, the CSS_MARKER line will be replaced with the contents of
   * notifier.css.
   *
   * @returns {string}
   */
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

#ae-context.empty {
  height: 0px;
  padding: 0px;
  border-top: 0px;
}

#ae-context{
  font-size: .9em;
  color: #999;
  background: var(--ae-black-russian);
  border-top: 1px solid var(--ae-dim-gray);
  padding: 3px;
}

.ae-row {
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

  /* Calculated properties
   ***************************************************************************/

  /**
   * The body width.
   *
   * @returns {number}
   */
  get body_width() {
    return document.body.getBoundingClientRect().width;
  }

  /**
   * The overall width of the progress bar.
   *
   * @returns {number}
   */
  get bar_width() {
    return this.body_width * 0.8;
  }

  /**
   * The "Step x of y" text to display to the user.
   *
   * @returns {string}
   */
  get step_text() {
    if (!this.step_no) {
      return "";
    }

    let text = `Step ${this.step_no} of ${this.total_steps}`;

    if (this.step_desc) {
      text += `: ${this.step_desc}`;
    }

    return `[${text}]`;
  }

  /**
   * The calculated percent complete.
   */
  get ratio() {
    if (!(this.item_no && this.item_no >= 0 && this.total)) {
      return null;
    }
    return this.item_no / this.total;
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
    let total = this.times.reduce((sum, t) => sum + t.elapsed, 0);
    return total / this.times.length;
  }

  /**
   * Estimate time left to process remaining items in milliseconds.
   *
   * @return {number}
   */
  get ms_left() {
    return this.remaining * this.per_item * this.estimate_padding;
  }

  /**
   * Estimate time left to process remaining items in minutes.
   *
   * @returns {string}
   */
  get minutes_left() {
    let minutes = (this.ms_left / 1000 / 60).toFixed(1);
    if (minutes == parseInt(minutes)) {
      minutes = parseInt(minutes).toString();
    }
    return minutes;
  }

  /**
   * Message to display to the user of the estimated time left.
   *
   * @returns {string}
   */
  get time_left() {
    if (!(this.times.length && this.item_no != null && this.total)) {
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

    return `${text}`;
  }

  /* Methods
   ***************************************************************************/

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
    let colors = window.ae.colors || new Colors();
    colors.create();
    super.create();

    document.addEventListener(this.event_name, this.listen);
    window.ae.notifier = this;
    this.text = this.message;
    this.step = this.step_text;
  }

  /**
   * Clear all user-visible values and set the percent to zero.
   */
  reset() {
    this.text = "";
    this.percent = 0;
    this.percentage.innerText = "";
    this.estimate.innerText = "";
    this.steps.innerText = "";
  }

  /**
   * Remove the wrapper HTML element from the DOM and remove the event
   * listener.
   */
  remove() {
    document.removeEventListener(this.event_name, this.listen);
    super.remove();

    this.#wrapper = null;
    this.#bar = null;
    this.#status = null;
    this.#percentage = null;
  }
};

PurchaseHistoryNotifier = class extends StatusNotifier {
  #year = null;
  #years = null;

  step_no = 1;

  constructor(years = null) {
    super();
    this.times = [];
    this.years = years || [];
  }

  get step_desc() {
    let message = "Purchase history";

    if (this.years.length) {
      message += ` since ${this.years.slice(-1)[0]}`;
    }

    return message;
  }

  /**
   * The current year being processed.
   *
   * @returns {string}
   */
  get year() {
    return this.#year;
  }

  /**
   * Set year and update text and percent.
   *
   * @param {string} value  The year being processed.
   */
  set year(value) {
    this.#year = value;
    this.text = this.message;
    this.percent = this.ratio;
    this.time = this.time_left;
  }

  /**
   * A list of years to process.
   *
   * @returns {string[]}
   */
  get years() {
    return this.#years;
  }

  /**
   * Set years and update percent.
   *
   * @param {string[]} value  Array of years to process.
   */
  set years(value) {
    this.#years = value;
    this.percent = this.ratio;
    this.step = this.step_text;
  }

  get item_no() {
    return this.years.indexOf(this.year);
  }

  get total() {
    return this.years.length;
  }

  /**
   * Message to display to the user.
   *
   * @returns {string}
   */
  get message() {
    if (!this.year) {
      return "Retrieving purchase history...";
    }

    return `Retrieving purchase history: ${this.year}`;
  }
};
