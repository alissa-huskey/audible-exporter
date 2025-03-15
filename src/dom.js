/**
 * Manage elements in the DOM.
 */

require("./util.js");
require("./doc.js");

DOM = class {
  constructor() {
    window.ae ||= {};

    ["id", "class", "classList"].forEach((k) => {
      Object.defineProperty(this, k, {
        get: () => this.wrapper[k],
        set: (v) => {
          this.wrapper[k] = v;
        },
      });
    });
  }

  /**
   * Add the element to the DOM.
   */
  create() {
    let el = Doc.gi(this.selectors.wrapper);
    if (el) el.outerHTML = "";

    document.body.appendChild(this.wrapper.element);
  }

  /**
   * Remove the wrapper HTML element from the DOM.
   */
  remove() {
    this.wrapper.element.remove();
  }

  /**
   * Create an element with innerHTML.
   *
   * @params   {string}  tag     tag name
   * @params   {string}  html    inner HTML
   * @params   {attrs}   object  element attributes
   *
   * @returns  {Doc}
   */
  elmWithInner(tag, html, attrs = {}) {
    let elm = Doc.create(tag, attrs);
    elm.innerHTML = html;
    return elm;
  }

  /**
   * Create a paragraph element.
   *
   * @params   {string}  html    inner HTML
   * @params   {attrs}   object  element attributes
   *
   * returns {Doc}
   */
  p(html, attrs = {}) {
    return this.elmWithInner("p", html, attrs);
  }

  /**
   * Create a list element.
   *
   * @params   {string}  html    inner HTML
   * @params   {attrs}   object  element attributes
   *
   * returns {Doc}
   */
  li(html, attrs = {}) {
    return this.elmWithInner("li", html, attrs);
  }

  /**
   * Create a list element.
   *
   * @params   {string}  html    inner HTML
   * @params   {attrs}   object  element attributes
   *
   * returns {Doc}
   */
  h1(html, attrs = {}) {
    return this.elmWithInner("h1", html, attrs);
  }

  /**
   * Create a button element.
   *
   * @params   {string}     text    inner text
   * @params   {attrs}      object  element attributes
   *
   * returns {Doc}
   */
  button(text, attrs = {}) {
    attrs.class = attrs.class ? `ae-btn ${attrs.class}` : "ae-btn";

    let btn = Doc.create("button", attrs);
    btn.innerText = text;
    return btn;
  }
};
