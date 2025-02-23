titleCase = function(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

str = function(o) {
  return typeof o == "object"
    ? this.tsvReady(JSON.stringify(o))
    : o
}

tryFloat = function(d) {
  try {
    return parseFloat(d);
  } catch (err) {
    return d;
  }
}

entityDecode = function(text) {
  return text.replace("&amp;", "&");
}

dateString = function(d) {
  if (!d) {
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
  var date = new Date(d);
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
