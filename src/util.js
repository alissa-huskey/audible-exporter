var CONSOLE_OUTPUT = false;
var LOG_PREFIX = "[audible-exporter]";

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

  if (!(type in EMPTIES)) {
    throw new Error(`isEmpty() does not support type: ${type} (value: ${o}).`);
  }

  return JSON.stringify(o) == EMPTIES[type];
};

tryFloat = function (o) {
  try {
    let f = parseFloat(o);
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
  if (date.constructor.name != "Date") {
    date = new Date(date);
  }
  return date.toLocaleDateString();
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

/* Convert duration string to array of hours and minutes.
 *
 * @param {string} text  Human readable hours/minutes text.
 *
 * @return {Array}       Array of hours/minutes integers.
 *
 * @example
 * parseTime("2 hrs and 25 mins"); // [2, 25]
 */
parseTime = function (text) {
  let re = /((?<hrs>\d+)[ ]?hr[s]?)?( and)?[ ]?((?<mins>\d+)[ ]?min[s]?)?$/;
  let found = text.match(re);
  let hrs = found.groups.hrs || "0";
  let mins = found.groups.mins || "0";
  return [parseInt(hrs), parseInt(mins)];
};

/* Calculate minutes from hours and minutes.
 *
 * @return {number}
 *
 * @example
 * page.toMinutes(2, 25); // 145
 */
toMinutes = function (hours, minutes) {
  hours = hours || 0;
  return parseInt(hours) * 60 + parseInt(minutes);
};

delay = (ms) =>
  new Promise((res) => {
    setTimeout(res, ms);
  });

if (!("first" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "first", {
    get: function () {
      return this[0];
    },
  });
}

if (!("last" in Array.prototype)) {
  Object.defineProperty(Array.prototype, "last", {
    get: function () {
      return this.slice(-1)[0];
    },
  });
}
