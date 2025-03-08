const { format: prettyFormat } = require("pretty-format");

/**
 * Return the class name of an object.
 */
function getClass(obj) {
  if (typeof obj === "undefined") return "undefined";
  if (obj === null) return "null";

  return obj.constructor.name;
}

/**
 * Pretty print an object.
 */
function pp(obj) {
  let padding = "\n" + " ".repeat(10);
  let text = padding + prettyFormat(obj).replaceAll("\n", padding);
  return text;
}

/**
 * Return true if the value is an instance of klass.
 *
 * @param  {any}        value  the actual value
 * @param  {str, class} klass  the class to compare to
 *
 * @returns {boolean}
 */
function isInstance(value, klass) {
  if (typeof klass == "string") {
    return value.constructor.name == klass;
  } else {
    return value instanceof klass;
  }
}

/**
 * Return the styled actual class name.
 *
 * In red text.
 *
 * @params {object}     u      this.utils
 * @param  {any}        value  the actual value
 *
 * @returns {string}
 */
function rcvdStyle(u, value) {
  let type = getClass(value);
  return u.RECEIVED_COLOR(type);
}

/**
 * Return the styled expected class name.
 *
 * In green text, quoted if a string was passed, unquoted if a class was
 * passed.
 *
 * @params {object}     u      this.utils
 * @param  {str, class} klass  expected class
 *
 * @returns {string}
 */
function exptStyle(u, klass) {
  if (typeof klass == "string") {
    return u.printExpected(klass);
  } else {
    return u.EXPECTED_COLOR(klass.name);
  }
}

/**
 * Matcher that checks if an object is an instance of a certain class.
 *
 * @param  {any}           value   The value being tested.
 * @param  {string, type}  klass   The expected class.
 */
function toBeA(value, klass) {
  let assertion = this.utils.matcherHint("toBeA", undefined, undefined, {
    isNot: this.isNot,
  });
  let received = rcvdStyle(this.utils, value);
  let expected = exptStyle(this.utils, klass);
  let claim = this.isNot ? "not " : "";
  let pass = isInstance(value, klass);

  let message = `
    ${assertion}

    Expected type: ${claim}${expected}
    Received type: ${" ".repeat(claim.length)}${received}
    Received value:
      ${pp(value)}
  `;

  return { message: () => message, pass: pass };
}

expect.extend({ toBeA });
