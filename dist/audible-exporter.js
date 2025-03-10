(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _category_types, _category_genres, _sub_categories, _tags, _json_audiobook, _json_product;
function _regeneratorRuntime() {  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
/**
 * Book page.
 *
 * Parse the book details from an audible book page.
 *
 */

require("./util.js");
require("./page.js");
BookPage = (_category_types = /*#__PURE__*/new WeakMap(), _category_genres = /*#__PURE__*/new WeakMap(), _sub_categories = /*#__PURE__*/new WeakMap(), _tags = /*#__PURE__*/new WeakMap(), _json_audiobook = /*#__PURE__*/new WeakMap(), _json_product = /*#__PURE__*/new WeakMap(), /*#__PURE__*/function (_Page) {
  function BookPage() {
    var _this;
    var doc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    _classCallCheck(this, BookPage);
    _this = _callSuper(this, BookPage);
    _classPrivateFieldInitSpec(_this, _category_types, ["Fiction", "Nonfiction"]);
    _classPrivateFieldInitSpec(_this, _category_genres, {
      "Arts & Entertainment": "nonfiction",
      "Biographies & Memoirs": "nonfiction",
      "Business & Careers": "nonfiction",
      "Children's Audiobooks": null,
      "Action & Adventure": "fiction",
      // children"s audiobooks
      "Activities & Hobbies": "nonfiction",
      // children"s audiobooks
      "Animals & Nature": "nonfiction",
      // children"s audiobooks
      "Fairy Tales, Folk Tales & Myths": "fiction",
      "Geography & Cultures": "nonfiction",
      "Comedy & Humor": null,
      "Performing Arts": "nonfiction",
      // comedy & humor
      "Computers & Technology": "nonfiction",
      "Education & Learning": "nonfiction",
      Erotica: null,
      "Sex Instruction": "nonfiction",
      // erotica
      "Health & Wellness": "nonfiction",
      History: "nonfiction",
      "Home & Garden": "nonfiction",
      "LGBTQ+": "null",
      "LGBTQ+ Studies": "nonfiction",
      "Parenting & Families": "nonfiction",
      "Literature & Fiction": "fiction",
      "Money & Finance": "nonfiction",
      "Mystery, Thriller & Suspense": null,
      "True Crime": "nonfiction",
      // mystery, thriller & suspense
      Mystery: "fiction",
      // mystery, thriller & suspense
      "Thriller & Suspense": "fiction",
      // mystery, thriller & suspense
      "Crime Fiction": "fiction",
      // mystery, thriller & suspense
      "Politics & Social Sciences": "nonfiction",
      "Politics, Society & Current Events": "nonfiction",
      "Relationships, Parenting & Personal Development": "nonfiction",
      "Religion & Spirituality": "nonfiction",
      Romance: "fiction",
      "Science & Engineering": "nonfiction",
      "Sports & Outdoors": "nonfiction",
      "Teen & Young Adult": null,
      "Health, Lifestyle & Relationships": "nonfiction",
      // teen & young adult
      "History & Culture": "nonfiction",
      // teen & young adult
      "Travel & Tourism": "nonfiction"
    });
    _classPrivateFieldInitSpec(_this, _sub_categories, ["Science Fiction", "Fantasy", "LitRPG", "True Crime", "Mystery", "Horror", "Epic Fantasy", "Satire", "Paranormal Romance", "Contemporary Romance", "Sex Instruction", "Romantic Suspense", "History & Criticism",
    // Arts & Entertainment
    "Instruction & Technique",
    // Arts & Entertainment
    "Historical Fiction", "Literary Fiction", "Personal Development", "Classics", "Fairy Tales", "Crime Fiction", "Fairy Tales, Folk Tales & Myths",
    // Children's Audiobooks
    "Education & Learning",
    // Children's Audiobooks
    "Essays",
    // biographies & Memoiirs
    "Historical",
    // biographies & Memoiirs
    "Young Adult", "Thriller & Suspense"]);
    _defineProperty(_this, "_fields", ["id", "title", "duration_minutes", "language", "release_date", "release_timestamp", "publisher", "publisher_summary", "audible_oginal", "book", "category_type", "main_category", "sub_category", "categories", "rating", "num_ratings"]);
    _defineProperty(_this, "_identifers", ["url"]);
    _classPrivateFieldInitSpec(_this, _tags, []);
    _classPrivateFieldInitSpec(_this, _json_audiobook, null);
    _classPrivateFieldInitSpec(_this, _json_product, null);
    _this.doc = doc;
    return _this;
  }

  /* Convert duration string to minutes int.
   *
   * @example
   * page.toMinutes("2 hrs and 25 mins"); // 145
   */
  _inherits(BookPage, _Page);
  return _createClass(BookPage, [{
    key: "toMinutes",
    value: function toMinutes(text) {
      var _exec, _exec2;
      var mins = ((_exec = /\d+(?=\smin)/.exec(text)) === null || _exec === void 0 ? void 0 : _exec[0]) || "0";
      var hours = ((_exec2 = /\d+(?=\shrs)/.exec(text)) === null || _exec2 === void 0 ? void 0 : _exec2[0]) || "0";
      return parseInt(hours) * 60 + parseInt(mins);
    }
  }, {
    key: "json_audiobook",
    get: function get() {
      if (!_classPrivateFieldGet(_json_audiobook, this)) {
        var scripts = this.doc.qs("script[type='application/ld+json']");
        var s;
        var _iterator = _createForOfIteratorHelper(scripts),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var _json$;
            s = _step.value;
            var json = JSON.parse(s.innerHTML);
            if ((json === null || json === void 0 || (_json$ = json[0]) === null || _json$ === void 0 ? void 0 : _json$["@type"]) == "Audiobook") {
              _classPrivateFieldSet(_json_audiobook, this, json[0]);
              break;
            }
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
      }
      return _classPrivateFieldGet(_json_audiobook, this);
    }
  }, {
    key: "json_product",
    get: function get() {
      if (!_classPrivateFieldGet(_json_product, this)) {
        var scripts = this.doc.qs("script[type='application/ld+json']");
        var s;
        var _iterator2 = _createForOfIteratorHelper(scripts),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            var _json$2;
            s = _step2.value;
            var json = JSON.parse(s.innerHTML);
            if ((json === null || json === void 0 || (_json$2 = json[0]) === null || _json$2 === void 0 ? void 0 : _json$2["@type"]) == "Product") {
              _classPrivateFieldSet(_json_product, this, json[0]);
              break;
            }
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      return _classPrivateFieldGet(_json_product, this);
    }
  }, {
    key: "rating",
    get: function get() {
      var _this$json_audiobook$;
      var rating = tryFloat((_this$json_audiobook$ = this.json_audiobook.aggregateRating) === null || _this$json_audiobook$ === void 0 ? void 0 : _this$json_audiobook$.ratingValue);
      return rating ? +rating.toFixed(1) : "";
    }
  }, {
    key: "num_ratings",
    get: function get() {
      var _this$json_audiobook$2;
      return tryInt((_this$json_audiobook$2 = this.json_audiobook.aggregateRating) === null || _this$json_audiobook$2 === void 0 ? void 0 : _this$json_audiobook$2.ratingCount);
    }
  }, {
    key: "id",
    get: function get() {
      return this.json_product.productID;
    }
  }, {
    key: "date",
    get: function get() {
      var date = this.json_audiobook.datePublished;
      if (!date) return null;
      return new Date("".concat(date, ":00:00:01"));
    }
  }, {
    key: "release_date",
    get: function get() {
      if (!this.date) return null;
      return dateString(this.date);
    }
  }, {
    key: "release_timestamp",
    get: function get() {
      return this.date.getTime();
    }
  }, {
    key: "title",
    get: function get() {
      var _this$json_audiobook, _this$doc$qsf;
      var values = [(_this$json_audiobook = this.json_audiobook) === null || _this$json_audiobook === void 0 ? void 0 : _this$json_audiobook.name, (_this$doc$qsf = this.doc.qsf("meta[property='og:title']")) === null || _this$doc$qsf === void 0 ? void 0 : _this$doc$qsf.content];
      return first(values);
    }
  }, {
    key: "publisher",
    get: function get() {
      return this.json_audiobook.publisher;
    }
  }, {
    key: "publisher_summary",
    get: function get() {
      var text = this.json_audiobook.description;
      if (!text) return null;
      return stripHTML(text);
    }
  }, {
    key: "audible_oginal",
    get: function get() {
      if (!this.publisher) return null;
      return /^Audible Original/.test(this.publisher);
    }
  }, {
    key: "language",
    get: function get() {
      var lang = this.json_audiobook.inLanguage;
      return titleCase(lang);
    }
  }, {
    key: "categories_list",
    get: function get() {
      return [];
    }

    /**
     * The duration in minutes.
     *
     * @type      {number}
     * @abstract
     */
  }, {
    key: "duration_minutes",
    get: function get() {
      return null;
    }

    /**
     * The book number in a series.
     *
     * @type      {number}
     * @abstract
     */
  }, {
    key: "book",
    get: function get() {
      return null;
    }
  }, {
    key: "tags_list",
    get: function get() {
      return [];
    }
  }, {
    key: "category_type",
    get: function get() {
      // check if the fiction tag is listed in the tags
      var _iterator3 = _createForOfIteratorHelper(_classPrivateFieldGet(_category_types, this)),
        _step3;
      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var genre = _step3.value;
          var idx = this.tags_list.indexOf(genre);
          if (idx && idx >= 0) {
            return genre.toLowerCase();
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
      var all = [].concat(_toConsumableArray(this.categories_list), _toConsumableArray(this.tags_list));

      // check if the word "fiction" or "nonfiction" is in any of the categories or tags
      var _iterator4 = _createForOfIteratorHelper(_classPrivateFieldGet(_category_types, this)),
        _step4;
      try {
        var _loop = function _loop() {
            var genre = _step4.value;
            if (all.some(function (c) {
              return c.toLowerCase().includes(genre.toLowerCase());
            })) {
              return {
                v: genre.toLowerCase()
              };
            }
          },
          _ret;
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          _ret = _loop();
          if (_ret) return _ret.v;
        }

        // get the fiction/nonfiction designation from #category_genres
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
      var _iterator5 = _createForOfIteratorHelper(all),
        _step5;
      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var label = _step5.value;
          genre = _classPrivateFieldGet(_category_genres, this)[label];
          if (genre) {
            return genre.toLowerCase();
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
      return null;
    }
  }, {
    key: "tags",
    get: function get() {
      if (!_classPrivateFieldGet(_tags, this).length && this.tags_list) {
        var exclude = _toConsumableArray(_classPrivateFieldGet(_category_types, this));
        if (this.main_category) {
          exclude.push(this.main_category);
        }
        _classPrivateFieldSet(_tags, this, this.tags_list.filter(function (t) {
          return !exclude.includes(t);
        }));
      }
      return _classPrivateFieldGet(_tags, this);
    }
  }, {
    key: "main_category",
    get: function get() {
      return this.categories_list[0] || null;
    }
  }, {
    key: "sub_category",
    get: function get() {
      // return the second category if there is one
      if (this.categories_list && this.categories_list.length == 2) {
        return this.categories_list[1];
      }

      // find the first subgenre listed in tags
      var listed_subgenres = _toConsumableArray(new Set(this.tags).intersection(new Set(_classPrivateFieldGet(_sub_categories, this))));
      if (listed_subgenres.length >= 1) {
        return listed_subgenres[0];
      }

      // return the first tag
      return this.tags[0] || null;
    }
  }, {
    key: "categories",
    get: function get() {
      var _this2 = this;
      return this.tags.filter(function (c) {
        return !_this2.categories_list.includes(c);
      });
    }
  }], [{
    key: "get",
    value: (
    /**
     * Fetch the book page and return the BookPage object.
     *
     * @param {string} url
     *
     * @returns {BookPage}
     */
    function () {
      var _get = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(url) {
        var page, doc;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              page = new Page();
              _context.next = 3;
              return page.fetchDoc(url);
            case 3:
              doc = _context.sent;
              doc = new Doc(doc);
              if (doc.gt("adbl-product-details").length) {
                page = new ADBLBookPage(doc);
              } else {
                page = new NormalBookPage(doc);
              }
              page.url = url;
              return _context.abrupt("return", page);
            case 8:
            case "end":
              return _context.stop();
          }
        }, _callee);
      }));
      function get(_x) {
        return _get.apply(this, arguments);
      }
      return get;
    }())
  }]);
}(Page));

/* Book pages which use custom <adbl-*> tags.
 *
 * (Note: Not audible-original books.)
 *
 * @link https://www.audible.com/pd/Ghosts-of-Zenith-Audiobook/B0BL84CBLZ
 *
 */
ADBLBookPage = /*#__PURE__*/function (_BookPage) {
  function ADBLBookPage() {
    _classCallCheck(this, ADBLBookPage);
    return _callSuper(this, ADBLBookPage, arguments);
  }
  _inherits(ADBLBookPage, _BookPage);
  return _createClass(ADBLBookPage, [{
    key: "adbl",
    get: function get() {
      return this.doc.qs("adbl-product-metadata script");
    }
  }, {
    key: "info",
    get: function get() {
      return Object.assign.apply(Object, [{}].concat(_toConsumableArray(this.adbl.map(function (e) {
        return JSON.parse(e.textContent);
      }))));
    }
  }, {
    key: "duration_minutes",
    get: function get() {
      return this.toMinutes(this.info.duration);
    }

    // get rating() {
    //   return tryFloat(Number(this.info.rating?.value).toFixed(1));
    // }

    // get date() {
    //   return this.info.releaseDate;
    // }

    // get num_ratings() {
    //   return this.info.rating?.count || "";
    // }

    // book number
  }, {
    key: "book",
    get: function get() {
      var _exec3, _this$info$series;
      return ((_exec3 = /Book (\d+)/i.exec((_this$info$series = this.info.series) === null || _this$info$series === void 0 ? void 0 : _this$info$series[0].part)) === null || _exec3 === void 0 ? void 0 : _exec3[1]) || "";
    }

    // get summary() {
    //   return this.doc.qsf("adbl-text-block[slot='summary']").textContent;
    // }
  }, {
    key: "categories_list",
    get: function get() {
      var _this$info$categories;
      return ((_this$info$categories = this.info.categories) === null || _this$info$categories === void 0 ? void 0 : _this$info$categories.map(function (c) {
        return c.name;
      })) || [];
    }
  }, {
    key: "tags_list",
    get: function get() {
      return this.doc.qs("adbl-chip-group.product-topictag-impression adbl-chip").map(function (c) {
        return c.innerHTML;
      });
    }
  }]);
}(BookPage);

/* Book pages which do not use custom <adbl-*> tags.
 *
 * (Note: Possibly only Audible originals books.)
 *
 * @link https://www.audible.com/pd/Midnight-Riot-Audiobook//B009CZNUGU
 *
 */
NormalBookPage = /*#__PURE__*/function (_BookPage2) {
  function NormalBookPage() {
    _classCallCheck(this, NormalBookPage);
    return _callSuper(this, NormalBookPage, arguments);
  }
  _inherits(NormalBookPage, _BookPage2);
  return _createClass(NormalBookPage, [{
    key: "duration_minutes",
    get:
    // get date() {
    //   let li = this.doc.gcf("releaseDateLabel");
    //   return li?.innerHTML?.replace(/Releae date:/, "").trim();
    // }

    function get() {
      var text = this.doc.gcf("runtimeLabel").innerHTML.replace(/length:/i, "");
      return this.toMinutes(text);
    }

    // get rating() {
    //   let elm = this.doc.qsf(".ratingsLabel .bc-pub-offscreen").innerHTML;
    //   let score = /[\d\.]+/.exec(elm)?.[0]
    //   return tryFloat(score);
    // }

    // get num_ratings() {
    //   let elm = this.doc.qsf(".ratingsLabel .bc-color-link");
    //   let text = elm.innerHTML?.trim()
    //   let num = /[\d,]+/.exec(text)[0]?.replace(/\D/, "");
    //   return tryFloat(num);
    // }

    // book number
  }, {
    key: "book",
    get: function get() {
      var _exec4, _this$doc$gcf;
      return ((_exec4 = /, Book (\d+)/i.exec((_this$doc$gcf = this.doc.gcf("seriesLabel")) === null || _this$doc$gcf === void 0 ? void 0 : _this$doc$gcf.innerHTML)) === null || _exec4 === void 0 ? void 0 : _exec4[1]) || "";
    }

    // get summary() {
    //   let elm = this.doc.qs("#center-1 .bc-container")[1]?.gcf("bc-text")

    //   return (
    //     elm.innerHTML
    //       ?.replace(/([\n\r\s]+|)©.+/, "")
    //       ?.replace(/[\n\r]+(\s+|)/g, "<br>")
    //       ?.replace(/\t/g, " ")
    //       ?.replace(/"/g, "'")
    //   );
    // }
  }, {
    key: "tags_list",
    get: function get() {
      return this.doc.gc("bc-chip-text").map(function (c) {
        return c.attributes["data-text"].value;
      });
    }
  }, {
    key: "categories_list",
    get: function get() {
      var _this$doc$qs;
      return ((_this$doc$qs = this.doc.qs(".categoriesLabel a")) === null || _this$doc$qs === void 0 ? void 0 : _this$doc$qs.map(function (c) {
        return entityDecode(c.innerHTML) || "";
      })) || [];
    }
  }]);
}(BookPage);
},{"./page.js":19,"./util.js":30}],2:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _books;
function _regeneratorRuntime() {  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
/**
 * Fetch all book details.
 *
 * Fetch book pages to gather additional details for all objects in the library
 * array.
 */

require("./util.js");
require("./timer.js");
require("./book-page.js");
DetailsFetcher = (_books = /*#__PURE__*/new WeakMap(), /*#__PURE__*/function () {
  /**
   * Constructor.
   *
   * @params {object[]} [library]  List of objects that contain a url key.
   */
  function DetailsFetcher() {
    var library = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    _classCallCheck(this, DetailsFetcher);
    _classPrivateFieldInitSpec(this, _books, {});
    this.library = library;
    _classPrivateFieldSet(_books, this, null);
    this.pages = [];
  }

  /**
   * Fetch the book pages and fire events to update the DetailsNotifier.
   *
   * @fires update-ae-notifier
   */
  return _createClass(DetailsFetcher, [{
    key: "populate",
    value: (function () {
      var _populate = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var book, data, actual, total, i, _iterator, _step, timer, page;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              actual = new Timer();
              actual.start();
              total = this.library.length;
              fireEvent({
                total: total
              });
              i = 0;
              _iterator = _createForOfIteratorHelper(this.library);
              _context.prev = 6;
              _iterator.s();
            case 8:
              if ((_step = _iterator.n()).done) {
                _context.next = 24;
                break;
              }
              book = _step.value;
              if (book.url) {
                _context.next = 12;
                break;
              }
              return _context.abrupt("continue", 22);
            case 12:
              timer = new Timer();
              timer.start();
              _context.next = 16;
              return BookPage.get(book.url.replace("http", "https"));
            case 16:
              page = _context.sent;
              page.url = book.url;
              this.pages.push(page);
              i++;
              timer.stop();
              fireEvent({
                item_no: i,
                timer: timer
              });
            case 22:
              _context.next = 8;
              break;
            case 24:
              _context.next = 29;
              break;
            case 26:
              _context.prev = 26;
              _context.t0 = _context["catch"](6);
              _iterator.e(_context.t0);
            case 29:
              _context.prev = 29;
              _iterator.f();
              return _context.finish(29);
            case 32:
              actual.stop();
              fireEvent({
                percent: 1
              });
              info("DetailsFetcher.populate() took: ".concat(actual.minutes, " minutes (").concat(actual.seconds, " seconds)"));
            case 35:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[6, 26, 29, 32]]);
      }));
      function populate() {
        return _populate.apply(this, arguments);
      }
      return populate;
    }()
    /**
     * Getter for the list of book data.
     *
     * @returns {object}  Book data keyed by audible book ID.
     */
    )
  }, {
    key: "books",
    get: function get() {
      if (!_classPrivateFieldGet(_books, this)) {
        _classPrivateFieldSet(_books, this, {});
        var data, page;
        var _iterator2 = _createForOfIteratorHelper(this.pages),
          _step2;
        try {
          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
            page = _step2.value;
            if (!page) continue;
            var _data = page.data();
            _classPrivateFieldGet(_books, this)[_data.id] = _data;
          }
        } catch (err) {
          _iterator2.e(err);
        } finally {
          _iterator2.f();
        }
      }
      return _classPrivateFieldGet(_books, this);
    }

    /**
     * Setter for the list of book data.
     *
     * @param {object}  Book data keyed by audible book ID.
     */,
    set: function set(value) {
      _classPrivateFieldSet(_books, this, value);
    }
  }]);
}());
},{"./book-page.js":1,"./timer.js":28,"./util.js":30}],3:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _item_no, _total;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
/**
 * Status notifier displayed to the user during the "Additional details"
 * step.
 *
 * @requires status-notifier.js
 */

require("./util.js");
require("./status-notifier.js");
DetailsNotifier = (_item_no = /*#__PURE__*/new WeakMap(), _total = /*#__PURE__*/new WeakMap(), /*#__PURE__*/function (_StatusNotifier) {
  function DetailsNotifier() {
    var _this;
    _classCallCheck(this, DetailsNotifier);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, DetailsNotifier, [].concat(args));
    _classPrivateFieldInitSpec(_this, _item_no, null);
    _classPrivateFieldInitSpec(_this, _total, null);
    _defineProperty(_this, "step_no", 4);
    return _this;
  }
  _inherits(DetailsNotifier, _StatusNotifier);
  return _createClass(DetailsNotifier, [{
    key: "step_desc",
    get:
    /**
     * Description of this step.
     *
     * @returns {string}
     */
    function get() {
      var message = "Additional details";
      if (this.total) {
        message += ", ".concat(this.total, " books");
      }
      return message;
    }

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
  }, {
    key: "message",
    get: function get() {
      if (!this.item_no) {
        return "Retrieving additional information on titles...";
      }
      return "Retrieving book ".concat(this.item_no, " of ").concat(this.total);
    }
  }]);
}(StatusNotifier));
},{"./status-notifier.js":25,"./util.js":30}],4:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Wraper for HTMLElements.
 *
 * @requires util.js
 * @requires list.js
 */

require("./util.js");
require("./list.js");
Doc = /*#__PURE__*/function () {
  /**
   * Constructor.
   *
   * @params {HTMLElement} [elm]
   */
  function _class() {
    var _this = this;
    var elm = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    _classCallCheck(this, _class);
    /**
     * First result of element.getElementsByClassName.
     *
     * @returns {Doc}
     */
    _defineProperty(this, "gcf", function (name) {
      return _this.gc(name)[0];
    });
    /**
     * First result of element.getElementsByTagName.
     *
     * @returns {Doc}
     */
    _defineProperty(this, "gtf", function (name) {
      return _this.gt(name)[0];
    });
    this.element = elm;
    if (!elm) return;
    var _loop = function _loop(k) {
        // eslint-disable-next-line no-prototype-builtins
        if (Object.hasOwnProperty(k)) return 0; // continue
        if (k in _this) return 0; // continue
        Object.defineProperty(_this, k, {
          get: function get() {
            return _this.element[k];
          },
          set: function set(v) {
            _this.element[k] = v;
          }
        });
      },
      _ret;
    for (var k in elm.__proto__) {
      _ret = _loop(k);
      if (_ret === 0) continue;
    }
  }

  /**
   * Shortcut for this.element.append().
   *
   * @params {...Doc,HTMLElement,string}  Child or children to append.
   */
  return _createClass(_class, [{
    key: "append",
    value: function append() {
      var _this2 = this;
      for (var _len = arguments.length, children = new Array(_len), _key = 0; _key < _len; _key++) {
        children[_key] = arguments[_key];
      }
      children.forEach(function (child) {
        if (child instanceof Doc) {
          child = child.element;
        }
        _this2.element.append(child);
      });
    }

    /**
     * Create a Doc object from raw HTML.
     *
     * @params {string} text
     */
  }, {
    key: "gc",
    value:
    /**
     * Shorthand for element.getElementsByClassName.
     *
     * @returns {List}
     */
    function gc(name) {
      if (!this.element) return [];
      var res = this.element.getElementsByClassName(name);
      return new List(res);
    }

    /**
     * Shorthand for element.getElementById.
     *
     * @returns {Doc}
     */
  }, {
    key: "gi",
    value: function gi(name) {
      return Doc.gi(name);
    }

    /**
     * Shorthand for element.getElementsByTagName.
     *
     * @returns {List}
     */
  }, {
    key: "gt",
    value: function gt(name) {
      if (!this.element) return [];
      var res = this.element.getElementsByTagName(name);
      return new List(res);
    }

    /**
     * Shorthand for element.querySelectorAll.
     *
     * @returns {List}
     */
  }, {
    key: "qs",
    value: function qs(query) {
      var res = this.element.querySelectorAll(query);
      return new List(res);
    }
  }, {
    key: "qsf",
    value:
    /**
     * Shorthand for element.querySelector.
     *
     * @returns {Doc}
     */
    function qsf(query) {
      var res = this.element.querySelector(query);
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
  }, {
    key: "set",
    value: function set(attrs) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (typeof attrs == "string") {
        var key = attrs;
        attrs = {};
        attrs[key] = value;
      }
      for (var _i = 0, _Object$entries = Object.entries(attrs); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          k = _Object$entries$_i[0],
          v = _Object$entries$_i[1];
        this.element.setAttribute(k, v);
      }
    }
  }], [{
    key: "from_html",
    value: function from_html(text) {
      var html = document.createElement("html");
      html.innerHTML = text;
      var elm = new Doc(html);
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
  }, {
    key: "create",
    value: function create(html) {
      var attrs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var dom;
      if (html.includes("<")) {
        var doc = document.createElement("body");
        doc.innerHTML = html;
        dom = doc.lastChild;
      } else if (html) {
        dom = document.createElement(html);
      }
      if (attrs.style && _typeof(attrs.style) == "object") {
        for (var _i2 = 0, _Object$entries2 = Object.entries(attrs.style); _i2 < _Object$entries2.length; _i2++) {
          var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
            k = _Object$entries2$_i[0],
            v = _Object$entries2$_i[1];
          dom.style[k] = v;
        }
        delete attrs.style;
      }
      var element = new Doc(dom);
      element.set(attrs);
      return element;
    }

    /**
     * Shorthand for document.getElementsByClassName.
     *
     * @returns {List}
     */
  }, {
    key: "gc",
    value: function gc(name) {
      return new List(document.getElementsByClassName(name));
    }

    /**
     * Shorthand for document.getElementById.
     *
     * @returns {Doc}
     */
  }, {
    key: "gi",
    value: function gi(name) {
      var node = document.getElementById(name);
      return new Doc(node);
    }

    /**
     * Shorthand for document.getElementsByTagName.
     *
     * @returns {List}
     */
  }, {
    key: "gt",
    value: function gt(name) {
      return new List(document.getElementsByTagName(name));
    }

    /**
     * Shorthand for document.querySelector.
     *
     * @returns {Doc}
     */
  }, {
    key: "qs",
    value: function qs(query) {
      var res = document.querySelector(query);
      return new Doc(res);
    }

    /**
     * Shorthand for document.querySelectorAll.
     *
     * @returns {List}
     */
  }, {
    key: "qsa",
    value: function qsa(query) {
      var res = document.querySelectorAll(query);
      return new List(res);
    }
  }]);
}();
},{"./list.js":13,"./util.js":30}],5:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Manage elements in the DOM.
 */

require("./util.js");
require("./doc.js");
DOM = /*#__PURE__*/function () {
  function DOM() {
    var _window;
    _classCallCheck(this, DOM);
    (_window = window).ae || (_window.ae = {});
  }

  /**
   * Add the element to the DOM.
   */
  return _createClass(DOM, [{
    key: "create",
    value: function create() {
      var el = Doc.gi(this.selectors.wrapper);
      if (el) el.outerHTML = "";
      document.body.appendChild(this.wrapper.element);
    }

    /**
     * Remove the wrapper HTML element from the DOM.
     */
  }, {
    key: "remove",
    value: function remove() {
      this.wrapper.element.remove();
    }
  }]);
}();
},{"./doc.js":4,"./util.js":30}],6:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _wrapper, _head, _content, _ft_select, _dl_btn, _h, _file;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
/**
 * Modal pop-up window for downloading the export.
 */

require("./util.js");
require("./modal.js");
DownloadModal = (_wrapper = /*#__PURE__*/new WeakMap(), _head = /*#__PURE__*/new WeakMap(), _content = /*#__PURE__*/new WeakMap(), _ft_select = /*#__PURE__*/new WeakMap(), _dl_btn = /*#__PURE__*/new WeakMap(), _h = /*#__PURE__*/new WeakMap(), _file = /*#__PURE__*/new WeakMap(), /*#__PURE__*/function (_Modal) {
  function DownloadModal() {
    var _this;
    _classCallCheck(this, DownloadModal);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, DownloadModal, [].concat(args));
    _classPrivateFieldInitSpec(_this, _wrapper, null);
    _classPrivateFieldInitSpec(_this, _head, null);
    _classPrivateFieldInitSpec(_this, _content, null);
    _classPrivateFieldInitSpec(_this, _ft_select, null);
    _classPrivateFieldInitSpec(_this, _dl_btn, null);
    _classPrivateFieldInitSpec(_this, _h, null);
    _classPrivateFieldInitSpec(_this, _file, null);
    _defineProperty(_this, "selectors", {
      wrapper: "ae-modal",
      content: "ae-content",
      head: "ae-head",
      close_btn: "ae-close-btn",
      dl_btn: "ae-download-btn",
      ft_select: "ae-filetype",
      actions: "ae-actions"
    });
    return _this;
  }
  _inherits(DownloadModal, _Modal);
  return _createClass(DownloadModal, [{
    key: "head",
    get:
    /* Elements
     ***************************************************************************/

    /**
     * div element for the head section.
     */
    function get() {
      if (!_classPrivateFieldGet(_head, this)) {
        var head = _superPropGet(DownloadModal, "head", this, 1);
        head.append(this.h1);
        _classPrivateFieldSet(_head, this, head);
      }
      return _classPrivateFieldGet(_head, this);
    }

    /**
     * The div element for the main content of the modal.
     *
     * @returns {Doc}
     */
  }, {
    key: "content",
    get: function get() {
      if (!_classPrivateFieldGet(_content, this)) {
        var content = _superPropGet(DownloadModal, "content", this, 1);
        var dl_wrapper = Doc.create("span", {
          id: this.selectors.dl_btn
        });
        var actions = Doc.create("div", {
          "class": this.selectors.actions
        });
        var p = Doc.create("p");
        p.innerHTML = "Your export is ready!";
        actions.append(this.ft_select, dl_wrapper);
        dl_wrapper.append(this.dl_btn);
        content.append(p, actions);
        _classPrivateFieldSet(_content, this, content);
      }
      return _classPrivateFieldGet(_content, this);
    }

    /**
     * h1 element.
     *
     * @returns {Doc}
     */
  }, {
    key: "h1",
    get: function get() {
      if (!_classPrivateFieldGet(_h, this)) {
        _classPrivateFieldSet(_h, this, Doc.create("h1"));
        _classPrivateFieldGet(_h, this).innerHTML = "Download";
      }
      return _classPrivateFieldGet(_h, this);
    }
  }, {
    key: "ft_select",
    get: function get() {
      if (!_classPrivateFieldGet(_ft_select, this)) {
        // create select tag
        var select = Doc.create("select", {
          id: this.selectors.ft_select,
          name: this.selectors.ft_select
        });

        // add options
        var options = {
          "": " -- Format -- ",
          json: "JSON",
          tsv: "TSV"
        };
        for (var _i = 0, _Object$entries = Object.entries(options); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
            ft = _Object$entries$_i[0],
            label = _Object$entries$_i[1];
          var option = Doc.create("option", {
            value: ft
          });
          option.innerText = label;
          select.element.append(option.element);
        }

        // add event listener to disable/enable the button when a filetype is
        // selected
        select.element.addEventListener("change", function () {
          var btn = window.ae.modal.dl_btn;
          if (select.value) {
            btn.classList.remove("disabled");
          } else {
            btn.classList.add("disabled");
          }
        });
        _classPrivateFieldSet(_ft_select, this, select);
      }
      return _classPrivateFieldGet(_ft_select, this);
    }
  }, {
    key: "dl_btn",
    get: function get() {
      if (!_classPrivateFieldGet(_dl_btn, this)) {
        var btn = Doc.create("a", {
          id: this.selectors.dl_btn,
          "class": "ae-btn disabled"
        });
        btn.attributes.href = "#";
        btn.innerHTML = "Download";
        _classPrivateFieldSet(_dl_btn, this, btn);
      }
      return _classPrivateFieldGet(_dl_btn, this);
    }
  }, {
    key: "filetype",
    get: function get() {
      return this.ft_select.value;
    }

    /**
     * Getter for the file that will be downloaded.
     *
     * @returns {VirtualFile}
     */
  }, {
    key: "file",
    get: function get() {
      return _classPrivateFieldGet(_file, this);
    }

    /**
     * Setter for the file that will be downloaded.
     *
     * Set the file, set the attributes on the download button to make it work,
     * and add the event listener to get rid of the generated URL once it has
     * been used.
     *
     * @param {VirtualFile} file
     */,
    set: function set(file) {
      _classPrivateFieldSet(_file, this, file);
      this.dl_btn.element.href = file.url;
      this.dl_btn.element.download = file.filename;
      this.dl_btn.element.addEventListener("click", function () {
        setTimeout(function () {
          window.URL.revokeObjectURL(file.url);
        }, 10);
      });
    }
  }]);
}(Modal));
},{"./modal.js":14,"./util.js":30}],7:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() {  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
require("./util.js");
require("./timer.js");
require("./library-fetcher.js");
require("./details-fetcher.js");
require("./orders-fetcher.js");
require("./start-modal.js");
require("./download-modal.js");
require("./purchase-history-notifier.js");
require("./order-notifier.js");
require("./library-notifier.js");
require("./details-notifier.js");
require("./json-file.js");
require("./tsv-file.js");
require("./result.js");

/**
 * Event listener to create the export file and start the download.
 */
download = function download() {
  var exporter = window.ae;
  var modal = exporter.modal;
  if (!modal.filetype) return;
  var klass = exporter.formats[modal.filetype];
  var file = new klass(exporter.results);
  modal.file = file;
  modal.hide();
};

/**
 * Exporter class.
 */
Exporter = /*#__PURE__*/function () {
  function Exporter() {
    var limit = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    _classCallCheck(this, Exporter);
    _defineProperty(this, "formats", {
      json: JSONFile,
      tsv: TSVFile
    });
    this.limit = limit;
    this.timer = new Timer();
    this.notifier = new StatusNotifier();
    this.orders = new OrdersFetcher();
    this.library = new LibraryFetcher();
    this.details = new DetailsFetcher();
    this.results = [];
    window.ae = this;
    this.style = new Style();
    this.style.create();
    this.modal = new StartModal();
    this.modal.create();
  }
  return _createClass(Exporter, [{
    key: "getPurchaseHistory",
    value: function () {
      var _getPurchaseHistory = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var timer;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              timer = new Timer(null, null, "getPurchaseHistory");
              timer.start();
              this.notifier.remove();
              this.notifier = new PurchaseHistoryNotifier();
              this.notifier.create();
              _context.next = 7;
              return this.orders.init(this.limit);
            case 7:
              _context.next = 9;
              return delay(1000);
            case 9:
              timer.stop();
              info("getPurchaseHistory() took ".concat(timer.minutes, " minutes (").concat(timer.seconds, " seconds)."));
            case 11:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function getPurchaseHistory() {
        return _getPurchaseHistory.apply(this, arguments);
      }
      return getPurchaseHistory;
    }()
  }, {
    key: "getOrders",
    value: function () {
      var _getOrders = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var timer;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              timer = new Timer();
              timer.start();
              this.notifier.remove();
              this.notifier = new OrderNotifier(this.orders.pages.length, this.orders.years);
              this.notifier.create();
              _context2.next = 7;
              return this.orders.populate(this.limit);
            case 7:
              log_table("purchases", this.orders.items);
              _context2.next = 10;
              return delay(1000);
            case 10:
              timer.stop();
              info("getOrders() took ".concat(timer.minutes, " minutes (").concat(timer.seconds, " seconds)."));
              return _context2.abrupt("return", this.orders.items);
            case 13:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function getOrders() {
        return _getOrders.apply(this, arguments);
      }
      return getOrders;
    }()
  }, {
    key: "getLibrary",
    value: function () {
      var _getLibrary = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3() {
        var timer;
        return _regeneratorRuntime().wrap(function _callee3$(_context3) {
          while (1) switch (_context3.prev = _context3.next) {
            case 0:
              timer = new Timer();
              timer.start();
              this.notifier.remove();
              this.notifier = new LibraryNotifier();
              this.notifier.create();
              _context3.next = 7;
              return this.library.populate(this.limit);
            case 7:
              log_table("library", this.library.books);
              _context3.next = 10;
              return delay(1000);
            case 10:
              timer.stop();
              info("getLibrary() took ".concat(timer.minutes, " minutes (").concat(timer.seconds, " seconds)."));
            case 12:
            case "end":
              return _context3.stop();
          }
        }, _callee3, this);
      }));
      function getLibrary() {
        return _getLibrary.apply(this, arguments);
      }
      return getLibrary;
    }()
  }, {
    key: "getBookDetails",
    value: function () {
      var _getBookDetails = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
        var timer;
        return _regeneratorRuntime().wrap(function _callee4$(_context4) {
          while (1) switch (_context4.prev = _context4.next) {
            case 0:
              timer = new Timer();
              timer.start();
              this.notifier.remove();
              this.notifier = new DetailsNotifier();
              this.notifier.create();
              this.details.library = this.library.books;
              _context4.next = 8;
              return this.details.populate();
            case 8:
              log_table("details", this.details.books);
              _context4.next = 11;
              return delay(1500);
            case 11:
              timer.stop();
              info("getBookDetails() took ".concat(timer.minutes, " minutes (").concat(timer.seconds, " seconds)."));
            case 13:
            case "end":
              return _context4.stop();
          }
        }, _callee4, this);
      }));
      function getBookDetails() {
        return _getBookDetails.apply(this, arguments);
      }
      return getBookDetails;
    }()
  }, {
    key: "getResults",
    value: function getResults() {
      var library_info, order_info, book_info, info;
      var results = [];
      var _iterator = _createForOfIteratorHelper(this.library.books),
        _step;
      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          library_info = _step.value;
          book_info = this.details.books[library_info.id];
          order_info = this.orders.items[library_info.id];
          var result = new Result(library_info, book_info, order_info);
          results.push(result.data());
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
      log_table("Your audible data", results);
      this.results = results;
      return results;
    }

    /**
     * Display the download modal.
     */
  }, {
    key: "downloadReady",
    value: function downloadReady() {
      this.notifier.remove();
      this.modal = new DownloadModal();
      this.modal.dl_btn.element.addEventListener("click", download);
      this.modal.create();
      this.modal.show();
    }
  }, {
    key: "run",
    value: function () {
      var _run = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5() {
        return _regeneratorRuntime().wrap(function _callee5$(_context5) {
          while (1) switch (_context5.prev = _context5.next) {
            case 0:
              _context5.prev = 0;
              this.timer.start();
              this.notifier.create();
              _context5.next = 5;
              return this.getPurchaseHistory();
            case 5:
              _context5.next = 7;
              return this.getOrders();
            case 7:
              _context5.next = 9;
              return this.getLibrary();
            case 9:
              _context5.next = 11;
              return this.getBookDetails();
            case 11:
              this.getResults();
              if (!(!this.results || this.results.length == 0)) {
                _context5.next = 15;
                break;
              }
              error("Failed to download books.");
              return _context5.abrupt("return");
            case 15:
              this.timer.stop();
              info("Done. (".concat(this.results.length, " results, ").concat(this.timer.minutes, " minutes)"));
              this.downloadReady();
              _context5.next = 23;
              break;
            case 20:
              _context5.prev = 20;
              _context5.t0 = _context5["catch"](0);
              error("Fatal error:", _context5.t0, _context5.t0.name, _context5.t0.message);
            case 23:
            case "end":
              return _context5.stop();
          }
        }, _callee5, this, [[0, 20]]);
      }));
      function run() {
        return _run.apply(this, arguments);
      }
      return run;
    }()
  }]);
}();
},{"./details-fetcher.js":2,"./details-notifier.js":3,"./download-modal.js":6,"./json-file.js":8,"./library-fetcher.js":10,"./library-notifier.js":11,"./order-notifier.js":15,"./orders-fetcher.js":18,"./purchase-history-notifier.js":21,"./result.js":23,"./start-modal.js":24,"./timer.js":28,"./tsv-file.js":29,"./util.js":30}],8:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _headers, _rows;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
require("./util.js");
require("./virtual-file.js");
JSONFile = (_headers = /*#__PURE__*/new WeakMap(), _rows = /*#__PURE__*/new WeakMap(), /*#__PURE__*/function (_VirtualFile) {
  function JSONFile() {
    var _this;
    var records = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    _classCallCheck(this, JSONFile);
    _this = _callSuper(this, JSONFile);
    _classPrivateFieldInitSpec(_this, _headers, null);
    _classPrivateFieldInitSpec(_this, _rows, null);
    _defineProperty(_this, "mimetype", "text/json");
    _defineProperty(_this, "extension", "json");
    _this.records = records;
    return _this;
  }
  _inherits(JSONFile, _VirtualFile);
  return _createClass(JSONFile, [{
    key: "contents",
    get: function get() {
      if (!this.records || isEmpty(this.records)) return null;
      return JSON.stringify(this.records);
    }
  }]);
}(VirtualFile));
},{"./util.js":30,"./virtual-file.js":31}],9:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
require("./util.js");
require("./parser.js");
LibraryBookRow = /*#__PURE__*/function (_Parser) {
  function LibraryBookRow() {
    var _this;
    var doc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var page_num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var row_num = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    _classCallCheck(this, LibraryBookRow);
    _this = _callSuper(this, LibraryBookRow);
    _defineProperty(_this, "_fields", ["id", "url", "title", "author", "narrator", "series"]);
    _defineProperty(_this, "_identifers", ["page_num", "row_num"]);
    _this.doc = doc;
    _this.page_num = page_num;
    _this.row_num = row_num;
    return _this;
  }
  _inherits(LibraryBookRow, _Parser);
  return _createClass(LibraryBookRow, [{
    key: "id",
    get: function get() {
      return this.doc.id.replace("adbl-library-content-row-", "");
    }
  }, {
    key: "ul",
    get: function get() {
      return this.doc.qsf(".bc-list.bc-list-nostyle");
    }
  }, {
    key: "url",
    get: function get() {
      var _this$ul$gcf$parentEl;
      return (_this$ul$gcf$parentEl = this.ul.gcf("bc-size-headline3").parentElement.attributes["href"]) === null || _this$ul$gcf$parentEl === void 0 ? void 0 : _this$ul$gcf$parentEl.value.replace(/\?.+/, "");
    }
  }, {
    key: "title",
    get: function get() {
      var _this$ul$gcf;
      var title = (_this$ul$gcf = this.ul.gcf("bc-size-headline3")) === null || _this$ul$gcf === void 0 ? void 0 : _this$ul$gcf.innerHTML.trim();
      return entityDecode(title);
    }
  }, {
    key: "author",
    get: function get() {
      return this.ul.gcf("authorLabel").gcf("bc-color-base").innerHTML.trim();
    }
  }, {
    key: "narrator",
    get: function get() {
      var _this$ul$qsf;
      return (_this$ul$qsf = this.ul.qsf(".narratorLabel .bc-color-base")) === null || _this$ul$qsf === void 0 || (_this$ul$qsf = _this$ul$qsf.innerHTML) === null || _this$ul$qsf === void 0 ? void 0 : _this$ul$qsf.trim();
    }
  }, {
    key: "series",
    get: function get() {
      var _this$ul$qsf2;
      return (_this$ul$qsf2 = this.ul.qsf(".seriesLabel a")) === null || _this$ul$qsf2 === void 0 || (_this$ul$qsf2 = _this$ul$qsf2.innerHTML) === null || _this$ul$qsf2 === void 0 ? void 0 : _this$ul$qsf2.trim();
    }
  }]);
}(Parser);
},{"./parser.js":20,"./util.js":30}],10:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _books, _page_count;
function _regeneratorRuntime() {  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
require("./util.js");
require("./timer.js");
require("./library-page.js");
LibraryFetcher = (_books = /*#__PURE__*/new WeakMap(), _page_count = /*#__PURE__*/new WeakMap(), /*#__PURE__*/function (_Page) {
  function LibraryFetcher() {
    var _this;
    _classCallCheck(this, LibraryFetcher);
    _this = _callSuper(this, LibraryFetcher);
    _defineProperty(_this, "page_size", 50);
    _defineProperty(_this, "base_url", "https://www.audible.com/library/titles");
    _classPrivateFieldInitSpec(_this, _books, []);
    _classPrivateFieldInitSpec(_this, _page_count, null);
    _this.pages = [];
    _classPrivateFieldSet(_books, _this, null);
    return _this;
  }
  _inherits(LibraryFetcher, _Page);
  return _createClass(LibraryFetcher, [{
    key: "fetchPage",
    value: function () {
      var _fetchPage = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(i) {
        var url, doc;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              url = "".concat(this.base_url, "?pageSize=").concat(this.page_size, "&page=").concat(i);
              _context.next = 3;
              return this.fetchDoc(url);
            case 3:
              doc = _context.sent;
              return _context.abrupt("return", new LibraryPage(doc));
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function fetchPage(_x) {
        return _fetchPage.apply(this, arguments);
      }
      return fetchPage;
    }()
  }, {
    key: "populate",
    value: function () {
      var _populate = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var limit,
          i,
          timer,
          page_num,
          page,
          _args2 = arguments;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              limit = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : null;
              i = 0;
            case 2:
              timer = new Timer();
              timer.start();
              if (limit) {
                this.page_count = limit;
                fireEvent({
                  total: this.page_count
                });
                this.page_size = 20;
              }
              page_num = i + 1;
              fireEvent({
                item_no: page_num
              });
              _context2.next = 9;
              return this.fetchPage(page_num);
            case 9:
              page = _context2.sent;
              this.pages.push(page);
              i++;
              timer.stop();
              fireEvent({
                item_no: page_num,
                total: this.page_count,
                timer: timer
              });
            case 14:
              if (i < this.page_count) {
                _context2.next = 2;
                break;
              }
            case 15:
              fireEvent({
                percent: 1
              });
              return _context2.abrupt("return", this.pages);
            case 17:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this);
      }));
      function populate() {
        return _populate.apply(this, arguments);
      }
      return populate;
    }()
  }, {
    key: "book_count",
    get: function get() {
      if (!this.pages) return null;
      var page = this.pages[0];
      return page.page_size * page.page_count;
    }
  }, {
    key: "page_count",
    get: function get() {
      if (!_classPrivateFieldGet(_page_count, this)) {
        _classPrivateFieldSet(_page_count, this, Math.ceil(this.book_count / this.page_size));
      }
      return _classPrivateFieldGet(_page_count, this);
    },
    set: function set(value) {
      _classPrivateFieldSet(_page_count, this, value);
    }
  }, {
    key: "books",
    get: function get() {
      if (!_classPrivateFieldGet(_books, this)) {
        var books = this.pages.reduce(function (arr, page) {
          return arr.concat(
          // map books by URL to avoid duplicates
          page.books.map(function (book) {
            return [book.url, book];
          }));
        }, []);
        _classPrivateFieldSet(_books, this, Object.values(Object.fromEntries(books)));
      }
      return _classPrivateFieldGet(_books, this);
    },
    set: function set(value) {
      _classPrivateFieldSet(_books, this, value);
    }
  }]);
}(Page));
},{"./library-page.js":12,"./timer.js":28,"./util.js":30}],11:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _item_no, _total;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
require("./util.js");
require("./status-notifier.js");
LibraryNotifier = (_item_no = /*#__PURE__*/new WeakMap(), _total = /*#__PURE__*/new WeakMap(), /*#__PURE__*/function (_StatusNotifier) {
  function LibraryNotifier() {
    var _this;
    _classCallCheck(this, LibraryNotifier);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, LibraryNotifier, [].concat(args));
    _classPrivateFieldInitSpec(_this, _item_no, null);
    _classPrivateFieldInitSpec(_this, _total, null);
    _defineProperty(_this, "step_no", 3);
    return _this;
  }
  _inherits(LibraryNotifier, _StatusNotifier);
  return _createClass(LibraryNotifier, [{
    key: "step_desc",
    get: function get() {
      var message = "Your library";
      if (this.total) {
        message += ", ".concat(this.total, " ").concat(this.total > 1 ? "pages" : "page");
      }
      return message;
    }

    /**
     * The message to display to the user.
     *
     * @returns {string}
     */
  }, {
    key: "message",
    get: function get() {
      if (!this.item_no) {
        return "Retrieving library...";
      }
      var message = "Retrieving library: page ".concat(this.item_no);
      if (this.total) {
        message += " of ".concat(this.total);
      } else {
        message += "...";
      }
      return message;
    }
  }]);
}(StatusNotifier));
},{"./status-notifier.js":25,"./util.js":30}],12:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _default_page_size, _rows, _books;
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
require("./library-book-row.js");
require("./page.js");
LibraryPage = (_default_page_size = /*#__PURE__*/new WeakMap(), _rows = /*#__PURE__*/new WeakMap(), _books = /*#__PURE__*/new WeakMap(), /*#__PURE__*/function (_Page) {
  function LibraryPage() {
    var _this;
    var doc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    _classCallCheck(this, LibraryPage);
    _this = _callSuper(this, LibraryPage);
    _classPrivateFieldInitSpec(_this, _default_page_size, 20);
    _classPrivateFieldInitSpec(_this, _rows, null);
    _classPrivateFieldInitSpec(_this, _books, null);
    _this.doc = doc;
    _classPrivateFieldSet(_rows, _this, null);
    _classPrivateFieldSet(_books, _this, null);
    return _this;
  }
  _inherits(LibraryPage, _Page);
  return _createClass(LibraryPage, [{
    key: "page_size",
    get: function get() {
      var _this$doc$qsf;
      if (!this.doc) return null;
      var size = ((_this$doc$qsf = this.doc.qsf("select[name='pageSize'] option:checked")) === null || _this$doc$qsf === void 0 ? void 0 : _this$doc$qsf.value) || _classPrivateFieldGet(_default_page_size, this);
      return parseInt(size);
    }
  }, {
    key: "page_num",
    get: function get() {
      var _this$doc$qsf2;
      if (!this.doc) return null;
      var num = ((_this$doc$qsf2 = this.doc.qsf("span.pageNumberElement")) === null || _this$doc$qsf2 === void 0 ? void 0 : _this$doc$qsf2.innerHTML) || 1;
      return parseInt(num);
    }
  }, {
    key: "page_count",
    get: function get() {
      var _links$last;
      if (!this.doc) return null;
      var links = this.doc.qs("a.pageNumberElement");
      var count = ((_links$last = links.last) === null || _links$last === void 0 ? void 0 : _links$last.innerHTML) || 1;
      return parseInt(count);
    }
  }, {
    key: "rows",
    get: function get() {
      if (!_classPrivateFieldGet(_rows, this)) {
        var i = 0;
        var arr = [];
        var rows = this.doc.gc("adbl-library-content-row");
        var _iterator = _createForOfIteratorHelper(rows),
          _step;
        try {
          for (_iterator.s(); !(_step = _iterator.n()).done;) {
            var row = _step.value;
            arr.push(new LibraryBookRow(row, this.page_num, i + 1));
            i++;
          }
        } catch (err) {
          _iterator.e(err);
        } finally {
          _iterator.f();
        }
        _classPrivateFieldSet(_rows, this, arr);
      }
      return _classPrivateFieldGet(_rows, this);
    }
  }, {
    key: "books",
    get: function get() {
      if (!_classPrivateFieldGet(_books, this)) {
        try {
          _classPrivateFieldSet(_books, this, this.rows.reduce(function (arr, row) {
            if (row.title == "Your First Listen") {
              return arr;
            }
            arr.push(row.data());
            return arr;
          }, []));
        } catch (err) {
          error(err);
        }
      }
      return _classPrivateFieldGet(_books, this);
    }
  }]);
}(Page));
},{"./library-book-row.js":9,"./page.js":19}],13:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
require("./util.js");
require("./doc.js");
List = /*#__PURE__*/function (_Array) {
  function List(items) {
    _classCallCheck(this, List);
    items = Array.from(items);
    var elements = items.map(function (item) {
      return new Doc(item);
    });
    return _callSuper(this, List, _toConsumableArray(elements));
  }
  _inherits(List, _Array);
  return _createClass(List, [{
    key: "first",
    get: function get() {
      return this[0];
    }
  }, {
    key: "last",
    get: function get() {
      return this.slice(-1)[0];
    }
  }]);
}(/*#__PURE__*/_wrapNativeSuper(Array));
},{"./doc.js":4,"./util.js":30}],14:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _wrapper, _head, _content, _close_btn;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
/**
 * Modal popup windows.
 */

require("./util.js");
require("./styled.js");
Modal = (_wrapper = /*#__PURE__*/new WeakMap(), _head = /*#__PURE__*/new WeakMap(), _content = /*#__PURE__*/new WeakMap(), _close_btn = /*#__PURE__*/new WeakMap(), /*#__PURE__*/function (_Styled) {
  function Modal() {
    var _this;
    _classCallCheck(this, Modal);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Modal, [].concat(args));
    _classPrivateFieldInitSpec(_this, _wrapper, null);
    _classPrivateFieldInitSpec(_this, _head, null);
    _classPrivateFieldInitSpec(_this, _content, null);
    _classPrivateFieldInitSpec(_this, _close_btn, null);
    _defineProperty(_this, "title", "");
    _defineProperty(_this, "selectors", {
      wrapper: "ae-modal",
      content: "ae-content",
      head: "ae-head",
      close_btn: "ae-close-btn"
    });
    return _this;
  }
  _inherits(Modal, _Styled);
  return _createClass(Modal, [{
    key: "wrapper",
    get:
    /* Elements
     ***************************************************************************/

    /**
     * Construct wrapper div, append all child elements.
     *
     * @returns {Doc}
     */
    function get() {
      if (!_classPrivateFieldGet(_wrapper, this)) {
        var wrapper = Doc.create("div", {
          "class": this.selectors.wrapper
        });
        wrapper.append(this.content);
        wrapper.style["z-index"] = new Date().getTime();
        _classPrivateFieldSet(_wrapper, this, wrapper);
      }
      return _classPrivateFieldGet(_wrapper, this);
    }

    /**
     * div element for the head section.
     */
  }, {
    key: "head",
    get: function get() {
      if (!_classPrivateFieldGet(_head, this)) {
        var head = Doc.create("div", {
          "class": this.selectors.head
        });
        head.append(this.close_btn);
        _classPrivateFieldSet(_head, this, head);
      }
      return _classPrivateFieldGet(_head, this);
    }

    /**
     * div element for the main content.
     */
  }, {
    key: "content",
    get: function get() {
      if (!_classPrivateFieldGet(_content, this)) {
        var content = Doc.create("div", {
          "class": this.selectors.content
        });
        content.append(this.head);
        _classPrivateFieldSet(_content, this, content);
      }
      return _classPrivateFieldGet(_content, this);
    }

    /**
     * Close button a element.
     *
     * @listens click
     *
     * @returns {Doc}
     */
  }, {
    key: "close_btn",
    get: function get() {
      var _this2 = this;
      if (!_classPrivateFieldGet(_close_btn, this)) {
        var btn = Doc.create("a", {
          id: this.selectors.close_btn
        });
        btn.innerHTML = "&times;";
        btn.attributes.href = "#";
        btn.element.addEventListener("click", function () {
          _this2.hide();
        }, false);
        _classPrivateFieldSet(_close_btn, this, btn);
      }
      return _classPrivateFieldGet(_close_btn, this);
    }

    /* Methods
     ***************************************************************************/

    /**
     * Show the modal.
     */
  }, {
    key: "show",
    value: function show() {
      this.wrapper.style.display = "block";
    }

    /**
     * Hide the modal.
     */
  }, {
    key: "hide",
    value: function hide() {
      this.wrapper.style.display = "none";
    }

    /**
     * Add the wrapper HTML element to the DOM.
     */
  }, {
    key: "create",
    value: function create() {
      var _window$ae;
      _superPropGet(Modal, "create", this, 3)([]);
      (_window$ae = window.ae).modal || (_window$ae.modal = this);
    }

    /**
     * Add the wrapper HTML element to the DOM.
     */
  }, {
    key: "remove",
    value: function remove() {
      var _window$ae2;
      _superPropGet(Modal, "remove", this, 3)([]);
      if ((_window$ae2 = window.ae) !== null && _window$ae2 !== void 0 && _window$ae2.modal) {
        window.ae.modal = null;
      }
    }
  }]);
}(Styled));
},{"./styled.js":27,"./util.js":30}],15:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _year, _year_page, _item_no, _page_count;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
require("./util.js");
require("./status-notifier.js");
OrderNotifier = (_year = /*#__PURE__*/new WeakMap(), _year_page = /*#__PURE__*/new WeakMap(), _item_no = /*#__PURE__*/new WeakMap(), _page_count = /*#__PURE__*/new WeakMap(), /*#__PURE__*/function (_StatusNotifier) {
  function OrderNotifier() {
    var _this;
    var total = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var years = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    _classCallCheck(this, OrderNotifier);
    _this = _callSuper(this, OrderNotifier);
    _classPrivateFieldInitSpec(_this, _year, null);
    _classPrivateFieldInitSpec(_this, _year_page, null);
    _classPrivateFieldInitSpec(_this, _item_no, null);
    _classPrivateFieldInitSpec(_this, _page_count, null);
    _defineProperty(_this, "step_no", 2);
    _this.total = total;
    _this.years = years;
    return _this;
  }
  _inherits(OrderNotifier, _StatusNotifier);
  return _createClass(OrderNotifier, [{
    key: "step_desc",
    get: function get() {
      var message = "Purchases";
      if (this.years && this.years.length) {
        message += " since ".concat(this.years.slice(-1)[0]);
      }
      return message;
    }

    /**
     * The year currently being processed.
     *
     * @returns {string}
     */
  }, {
    key: "year",
    get: function get() {
      return _classPrivateFieldGet(_year, this);
    }

    /**
     * Set the year and update text.
     *
     * @params {string} value  The year being processed.
     */,
    set: function set(value) {
      _classPrivateFieldSet(_year, this, value);
      this.text = this.message;
    }

    /**
     * The number of the current year's pages being processed.
     *
     * @returns {number}
     */
  }, {
    key: "year_page",
    get: function get() {
      return _classPrivateFieldGet(_year_page, this);
    }

    /**
     * Set the page_year and update text.
     */,
    set: function set(value) {
      _classPrivateFieldSet(_year_page, this, value);
      this.text = this.message;
    }

    /**
     * The number of pages to be processed for the current year.
     *
     * @returns {number}
     */
  }, {
    key: "page_count",
    get: function get() {
      return _classPrivateFieldGet(_page_count, this);
    }

    /**
     * Set the page_count and update text.
     */,
    set: function set(value) {
      _classPrivateFieldSet(_page_count, this, value);
      this.text = this.message;
    }

    /*
     * The message to display to the user.
     *
     * @returns {string}
     */
  }, {
    key: "message",
    get: function get() {
      if (!this.year) {
        return "Retrieving purchases...";
      }
      var message = "Retrieving ".concat(this.year, " purchases");
      if (this.year_page) {
        message += ": page ".concat(this.year_page);
        if (this.page_count) {
          message += " of ".concat(this.page_count);
        } else {
          message += "...";
        }
      } else {
        message += "...";
      }
      return message;
    }
  }]);
}(StatusNotifier));
},{"./status-notifier.js":25,"./util.js":30}],16:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _default_per_page, _purchases_attrs, _valid_date_ranges, _orders, _purchases, _items, _page_num, _year;
function _regeneratorRuntime() {  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
require("./util.js");
require("./page.js");
require("./order-row.js");
require("./purchase.js");
OrderPage = (_default_per_page = /*#__PURE__*/new WeakMap(), _purchases_attrs = /*#__PURE__*/new WeakMap(), _valid_date_ranges = /*#__PURE__*/new WeakMap(), _orders = /*#__PURE__*/new WeakMap(), _purchases = /*#__PURE__*/new WeakMap(), _items = /*#__PURE__*/new WeakMap(), _page_num = /*#__PURE__*/new WeakMap(), _year = /*#__PURE__*/new WeakMap(), /*#__PURE__*/function (_Page) {
  function OrderPage() {
    var _this;
    var year_or_doc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var page_num = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var per_page = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    _classCallCheck(this, OrderPage);
    _this = _callSuper(this, OrderPage);
    _defineProperty(_this, "base_url", "https://www.audible.com/account/purchase-history?tf=orders");
    _classPrivateFieldInitSpec(_this, _default_per_page, 40);
    _classPrivateFieldInitSpec(_this, _purchases_attrs, {
      id: "data-order-item-asin",
      order_id: "data-order-id",
      amount: "data-order-item-cost",
      credits: "data-order-item-credit-cost",
      title: "data-order-item-name",
      author: "data-order-item-author"
    });
    _classPrivateFieldInitSpec(_this, _valid_date_ranges, ["last_90_days", "last_180_days", "last_365_days"]);
    _classPrivateFieldInitSpec(_this, _orders, {});
    _classPrivateFieldInitSpec(_this, _purchases, {});
    _classPrivateFieldInitSpec(_this, _items, []);
    _classPrivateFieldInitSpec(_this, _page_num, null);
    _classPrivateFieldInitSpec(_this, _year, null);
    _this.doc = null;
    if ((typeof year_or_doc == "number" || _classPrivateFieldGet(_valid_date_ranges, _this).includes(year_or_doc)) && typeof page_num == "number") {
      _this.year = year_or_doc;
      _this.page_num = page_num;
    } else if (year_or_doc) {
      _this.doc = year_or_doc;
    }
    _this.per_page = per_page || _classPrivateFieldGet(_default_per_page, _this);
    _classPrivateFieldSet(_items, _this, null);
    return _this;
  }
  _inherits(OrderPage, _Page);
  return _createClass(OrderPage, [{
    key: "require",
    value: function require() {
      var success = true;
      for (var _len = arguments.length, attrs = new Array(_len), _key = 0; _key < _len; _key++) {
        attrs[_key] = arguments[_key];
      }
      for (var a in attrs) {
        if (!this[attrs[a]]) {
          var source = new Error().stack.split("\n")[2].match(/at (.*)\.require \[as (.*)] \(.*[/](.*)\)/);
          var prefix = source ? "<".concat(source[3], " ").concat(source[1], ".").concat(source[2], "> ") : "";
          error("".concat(prefix, "Missing required attribute: ").concat(attrs[a], "."));
          success = false;
        }
      }
      return success;
    }
  }, {
    key: "get",
    value: function () {
      var _get = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var url;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              url = "".concat(this.base_url, "&df=").concat(this.year, "&pn=").concat(this.page_num, "&ps=").concat(this.per_page);
              _context.next = 3;
              return this.fetchDoc(url);
            case 3:
              this.doc = _context.sent;
              return _context.abrupt("return", this.doc);
            case 5:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function get() {
        return _get.apply(this, arguments);
      }
      return get;
    }()
  }, {
    key: "year",
    get: function get() {
      if (!_classPrivateFieldGet(_year, this) && this.doc) {
        var _this$doc$qsf;
        _classPrivateFieldSet(_year, this, (_this$doc$qsf = this.doc.qsf("#ui-it-purchase-history-date-filter option:checked")) === null || _this$doc$qsf === void 0 ? void 0 : _this$doc$qsf.value);
      }
      return tryInt(_classPrivateFieldGet(_year, this));
    },
    set: function set(value) {
      _classPrivateFieldSet(_year, this, value);
    }
  }, {
    key: "page_num",
    get: function get() {
      if (!_classPrivateFieldGet(_page_num, this) && this.doc) {
        var _this$doc$qsf2;
        _classPrivateFieldSet(_page_num, this, ((_this$doc$qsf2 = this.doc.qsf("span.purchase-history-pagination-button")) === null || _this$doc$qsf2 === void 0 || (_this$doc$qsf2 = _this$doc$qsf2.innerHTML) === null || _this$doc$qsf2 === void 0 ? void 0 : _this$doc$qsf2.trim()) || 1);
      }
      return tryInt(_classPrivateFieldGet(_page_num, this));
    },
    set: function set(value) {
      _classPrivateFieldSet(_page_num, this, value);
    }
  }, {
    key: "page_count",
    get: function get() {
      if (!this.require("doc")) return null;
      var link = this.doc.qs("a.purchase-history-pagination-button").last;
      var count = (link === null || link === void 0 ? void 0 : link.innerHTML.trim()) || 1;
      return parseInt(count);
    }
  }, {
    key: "years",
    get: function get() {
      var options = this.doc.qs("#ui-it-purchase-history-date-filter option");
      var years = options.reduce(function (arr, option) {
        var year = option.value;
        if (/^\d+$/.test(year)) {
          arr.push(year);
        }
        return arr;
      }, []);
      return years;
    }
  }, {
    key: "orders",
    get: function get() {
      if (this.doc && isEmpty(_classPrivateFieldGet(_orders, this))) {
        var rows = this.doc.qs("tr:has(a[href^='/account/order-details'])");
        var orders = rows.map(function (tr) {
          var row = new OrderRow(tr);
          return [row.id, row.data()];
        });
        _classPrivateFieldSet(_orders, this, Object.fromEntries(orders));
      }
      return _classPrivateFieldGet(_orders, this);
    }
  }, {
    key: "purchases",
    get: function get() {
      if (this.doc && isEmpty(_classPrivateFieldGet(_purchases, this))) {
        var links = this.doc.qs("a[data-order-item-id]");
        var purchases = links.map(function (a) {
          return new Purchase(a).data();
        });
        _classPrivateFieldSet(_purchases, this, purchases);
      }
      return _classPrivateFieldGet(_purchases, this);
    }
  }, {
    key: "items",
    get: function get() {
      var _this2 = this;
      if (!_classPrivateFieldGet(_items, this)) {
        try {
          var seen = {};
          _classPrivateFieldSet(_items, this, this.purchases.reduce(function (arr, p) {
            if (p.title && p.author && !seen[p.id]) {
              seen[p.id] = true;
              arr.push({
                id: p.id,
                url: "http://www.audible.com/pd/".concat(p.id),
                title: p.title,
                author: p.author,
                purchase_date: _this2.orders[p.order_id].date
              });
            }
            return arr;
          }, []));
        } catch (err) {
          error(err);
        }
      }
      return _classPrivateFieldGet(_items, this);
    }
  }]);
}(Page));
},{"./order-row.js":17,"./page.js":19,"./purchase.js":22,"./util.js":30}],17:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
require("./util.js");
require("./parser.js");
OrderRow = /*#__PURE__*/function (_Parser) {
  function OrderRow() {
    var _this;
    var doc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    _classCallCheck(this, OrderRow);
    _this = _callSuper(this, OrderRow);
    _defineProperty(_this, "_fields", ["id", "date", "total"]);
    _defineProperty(_this, "_identifers", []);
    _this.doc = doc;
    return _this;
  }
  _inherits(OrderRow, _Parser);
  return _createClass(OrderRow, [{
    key: "url",
    get: function get() {
      return this.doc.qsf("a[href^='/account/order-details']").href;
    }
  }, {
    key: "id",
    get: function get() {
      return this.url.match(/orderId=([^&]+)&/)[1];
    }
  }, {
    key: "date",
    get: function get() {
      var _this$doc$qsf$innerHT;
      return (_this$doc$qsf$innerHT = this.doc.qsf(".ui-it-purchasehistory-item-purchasedate").innerHTML) === null || _this$doc$qsf$innerHT === void 0 ? void 0 : _this$doc$qsf$innerHT.trim();
    }
  }, {
    key: "total",
    get: function get() {
      return this.doc.qsf(".ui-it-purchasehistory-item-total div").innerHTML;
    }
  }]);
}(Parser);
},{"./parser.js":20,"./util.js":30}],18:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _count, _items;
function _regeneratorRuntime() {  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
require("./util.js");
require("./timer.js");
require("./order-page.js");
OrdersFetcher = (_count = /*#__PURE__*/new WeakMap(), _items = /*#__PURE__*/new WeakMap(), /*#__PURE__*/function () {
  function OrdersFetcher() {
    _classCallCheck(this, OrdersFetcher);
    _classPrivateFieldInitSpec(this, _count, 0);
    _classPrivateFieldInitSpec(this, _items, null);
    _classPrivateFieldSet(_count, this, 0);
    _classPrivateFieldSet(_items, this, null);
    this.pages = [];
  }
  return _createClass(OrdersFetcher, [{
    key: "init",
    value: function () {
      var _init = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(limit) {
        var running_count, page, _iterator, _step, year, timer, page_num, page_count, _page;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              // request to get the years in order history
              running_count = 0;
              page = new OrderPage("last_90_days", 1, 20);
              _context.next = 4;
              return page.get();
            case 4:
              this.years = page.years;
              if (limit && this.years.length > limit) {
                this.years.splice(limit);
              }
              fireEvent({
                years: this.years
              });
              _iterator = _createForOfIteratorHelper(this.years);
              _context.prev = 8;
              _iterator.s();
            case 10:
              if ((_step = _iterator.n()).done) {
                _context.next = 34;
                break;
              }
              year = _step.value;
              timer = new Timer();
              timer.start();
              fireEvent({
                year: year
              });
              page_num = 1;
              page_count = void 0;
            case 17:
              _page = new OrderPage(tryInt(year), page_num);
              if (!(page_num == 1)) {
                _context.next = 22;
                break;
              }
              _context.next = 21;
              return _page.get();
            case 21:
              page_count = _page.page_count;
            case 22:
              this.pages.push(_page);
              running_count++;
              page_num++;
              if (!(limit && running_count >= limit)) {
                _context.next = 29;
                break;
              }
              this.years.splice(this.years.indexOf(year));
              fireEvent({
                years: this.years
              });
              return _context.abrupt("break", 30);
            case 29:
              if (page_num <= page_count) {
                _context.next = 17;
                break;
              }
            case 30:
              timer.stop();
              fireEvent({
                timer: timer
              });
            case 32:
              _context.next = 10;
              break;
            case 34:
              _context.next = 39;
              break;
            case 36:
              _context.prev = 36;
              _context.t0 = _context["catch"](8);
              _iterator.e(_context.t0);
            case 39:
              _context.prev = 39;
              _iterator.f();
              return _context.finish(39);
            case 42:
              fireEvent({
                percent: 1
              });
            case 43:
            case "end":
              return _context.stop();
          }
        }, _callee, this, [[8, 36, 39, 42]]);
      }));
      function init(_x) {
        return _init.apply(this, arguments);
      }
      return init;
    }()
  }, {
    key: "populate",
    value: function () {
      var _populate = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2() {
        var limit,
          i,
          _iterator2,
          _step2,
          page,
          timer,
          _args2 = arguments;
        return _regeneratorRuntime().wrap(function _callee2$(_context2) {
          while (1) switch (_context2.prev = _context2.next) {
            case 0:
              limit = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : null;
              if (limit) {
                this.pages.splice(limit, this.pages.length);
              }
              fireEvent({
                total: this.pages.length
              });
              i = 0;
              _iterator2 = _createForOfIteratorHelper(this.pages);
              _context2.prev = 5;
              _iterator2.s();
            case 7:
              if ((_step2 = _iterator2.n()).done) {
                _context2.next = 26;
                break;
              }
              page = _step2.value;
              timer = new Timer();
              timer.start();
              fireEvent({
                year: page.year,
                year_page: page.page_num,
                item_no: i
              });
              if (page.doc) {
                _context2.next = 18;
                break;
              }
              _context2.next = 15;
              return page.get();
            case 15:
              fireEvent({
                page_count: page.page_count
              });
              _context2.next = 21;
              break;
            case 18:
              fireEvent({
                page_count: page.page_count
              });
              _context2.next = 21;
              return delay(500);
            case 21:
              i++;
              timer.stop();
              fireEvent({
                timer: timer
              });
            case 24:
              _context2.next = 7;
              break;
            case 26:
              _context2.next = 31;
              break;
            case 28:
              _context2.prev = 28;
              _context2.t0 = _context2["catch"](5);
              _iterator2.e(_context2.t0);
            case 31:
              _context2.prev = 31;
              _iterator2.f();
              return _context2.finish(31);
            case 34:
              fireEvent({
                percent: 1
              });
            case 35:
            case "end":
              return _context2.stop();
          }
        }, _callee2, this, [[5, 28, 31, 34]]);
      }));
      function populate() {
        return _populate.apply(this, arguments);
      }
      return populate;
    }()
  }, {
    key: "count",
    get: function get() {
      if (!_classPrivateFieldGet(_count, this)) {
        _classPrivateFieldSet(_count, this, this.pages.reduce(function (sum, p) {
          return sum + p.items.length;
        }, 0));
      }
      return _classPrivateFieldGet(_count, this);
    }
  }, {
    key: "items",
    get: function get() {
      if (!_classPrivateFieldGet(_items, this)) {
        var items = {};
        var _iterator3 = _createForOfIteratorHelper(this.pages),
          _step3;
        try {
          for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
            var page = _step3.value;
            var _iterator4 = _createForOfIteratorHelper(page.items),
              _step4;
            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                var item = _step4.value;
                items[item.id] = item;
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }
          }
        } catch (err) {
          _iterator3.e(err);
        } finally {
          _iterator3.f();
        }
        _classPrivateFieldSet(_items, this, items);
      }
      return _classPrivateFieldGet(_items, this);
    },
    set: function set(value) {
      _classPrivateFieldSet(_items, this, value);
    }
  }]);
}());
},{"./order-page.js":16,"./timer.js":28,"./util.js":30}],19:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() {  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
require("./util.js");
require("./parser.js");
Page = /*#__PURE__*/function (_Parser) {
  function Page() {
    _classCallCheck(this, Page);
    return _callSuper(this, Page, arguments);
  }
  _inherits(Page, _Parser);
  return _createClass(Page, [{
    key: "fetchDoc",
    value: function () {
      var _fetchDoc = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(url) {
        var res, text;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return fetch(url);
            case 3:
              res = _context.sent;
              if (!res.ok) {
                error("Page.fetchDoc(\"".concat(url.trim(), "\"): Response status: ").concat(res.status));
              }
              _context.next = 7;
              return res.text();
            case 7:
              text = _context.sent;
              return _context.abrupt("return", new DOMParser().parseFromString(text, "text/html"));
            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](0);
              error("Page.fetchDoc(\"".concat(url.trim(), "\"):\n"), _context.t0);
            case 14:
            case "end":
              return _context.stop();
          }
        }, _callee, null, [[0, 11]]);
      }));
      function fetchDoc(_x) {
        return _fetchDoc.apply(this, arguments);
      }
      return fetchDoc;
    }()
  }]);
}(Parser);
},{"./parser.js":20,"./util.js":30}],20:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _doc;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
require("./util.js");
require("./doc.js");
Parser = (_doc = /*#__PURE__*/new WeakMap(), /*#__PURE__*/function () {
  function Parser() {
    _classCallCheck(this, Parser);
    _classPrivateFieldInitSpec(this, _doc, null);
    _defineProperty(this, "_fields", []);
    _defineProperty(this, "_identifiers", []);
  }
  return _createClass(Parser, [{
    key: "doc",
    get: function get() {
      return _classPrivateFieldGet(_doc, this);
    },
    set: function set(value) {
      if (value) {
        if (!value) return;
        if (!(value instanceof Doc)) {
          value = new Doc(value);
        }
        _classPrivateFieldSet(_doc, this, value);
      }
    }
  }, {
    key: "data",
    value: function data() {
      var _this = this;
      var f;
      var data = {};
      for (var i in this._fields) {
        try {
          f = this._fields[i];
          data[f] = this[f];
        } catch (err) {
          var identifiers = this._identifers.map(function (i) {
            return "".concat(i, ": ").concat(_this[i]);
          }).join(", ");
          error("".concat(this.constructor.name, ".").concat(f, " (").concat(identifiers, "):\n"), err);
        }
      }
      return cleanObject(data);
    }
  }]);
}());
},{"./doc.js":4,"./util.js":30}],21:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _year, _years;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
require("./util.js");
require("./status-notifier.js");
PurchaseHistoryNotifier = (_year = /*#__PURE__*/new WeakMap(), _years = /*#__PURE__*/new WeakMap(), /*#__PURE__*/function (_StatusNotifier) {
  function PurchaseHistoryNotifier() {
    var _this;
    var years = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    _classCallCheck(this, PurchaseHistoryNotifier);
    _this = _callSuper(this, PurchaseHistoryNotifier);
    _classPrivateFieldInitSpec(_this, _year, null);
    _classPrivateFieldInitSpec(_this, _years, null);
    _defineProperty(_this, "step_no", 1);
    _this.times = [];
    _this.years = years || [];
    return _this;
  }
  _inherits(PurchaseHistoryNotifier, _StatusNotifier);
  return _createClass(PurchaseHistoryNotifier, [{
    key: "step_desc",
    get: function get() {
      var message = "Purchase history";
      if (this.years.length) {
        message += " since ".concat(this.years.slice(-1)[0]);
      }
      return message;
    }

    /**
     * The current year being processed.
     *
     * @returns {string}
     */
  }, {
    key: "year",
    get: function get() {
      return _classPrivateFieldGet(_year, this);
    }

    /**
     * Set year and update text and percent.
     *
     * @param {string} value  The year being processed.
     */,
    set: function set(value) {
      _classPrivateFieldSet(_year, this, value);
      this.text = this.message;
      this.percent = this.ratio;
      this.time = this.time_left;
    }

    /**
     * A list of years to process.
     *
     * @returns {string[]}
     */
  }, {
    key: "years",
    get: function get() {
      return _classPrivateFieldGet(_years, this);
    }

    /**
     * Set years and update percent.
     *
     * @param {string[]} value  Array of years to process.
     */,
    set: function set(value) {
      _classPrivateFieldSet(_years, this, value);
      this.percent = this.ratio;
      this.step = this.step_text;
    }
  }, {
    key: "item_no",
    get: function get() {
      return this.years.indexOf(this.year);
    }
  }, {
    key: "total",
    get: function get() {
      return this.years.length;
    }

    /**
     * Message to display to the user.
     *
     * @returns {string}
     */
  }, {
    key: "message",
    get: function get() {
      if (!this.year) {
        return "Retrieving purchase history...";
      }
      return "Retrieving purchase history: ".concat(this.year);
    }
  }]);
}(StatusNotifier));
},{"./status-notifier.js":25,"./util.js":30}],22:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
require("./util.js");
require("./parser.js");
Purchase = /*#__PURE__*/function (_Parser) {
  function Purchase() {
    var _this;
    var doc = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    _classCallCheck(this, Purchase);
    _this = _callSuper(this, Purchase);
    _defineProperty(_this, "_fields", {
      id: "data-order-item-asin",
      order_id: "data-order-id",
      title: "data-order-item-name",
      author: "data-order-item-author",
      amount: "data-order-item-cost",
      credits: "data-order-item-credit-cost"
    });
    _this.doc = doc;
    return _this;
  }
  _inherits(Purchase, _Parser);
  return _createClass(Purchase, [{
    key: "data",
    value: function data() {
      var _this2 = this;
      return Object.fromEntries(Object.entries(this._fields).map(function (_ref) {
        var _this2$doc$attributes;
        var _ref2 = _slicedToArray(_ref, 2),
          key = _ref2[0],
          attr = _ref2[1];
        return [key, (_this2$doc$attributes = _this2.doc.attributes) === null || _this2$doc$attributes === void 0 || (_this2$doc$attributes = _this2$doc$attributes[attr]) === null || _this2$doc$attributes === void 0 ? void 0 : _this2$doc$attributes.value];
      }));
    }
  }]);
}(Parser);
},{"./parser.js":20,"./util.js":30}],23:[function(require,module,exports){


var _headers;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
Result = (_headers = /*#__PURE__*/new WeakMap(), /*#__PURE__*/function () {
  function Result() {
    var library = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var details = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var order = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    _classCallCheck(this, Result);
    _classPrivateFieldInitSpec(this, _headers, {
      id: ["order", "library", "details"],
      url: ["order", "library"],
      title: ["order", "details", "library"],
      author: ["order", "library"],
      narrator: ["library"],
      series: ["library"],
      book: ["details"],
      publisher: ["details"],
      duration_minutes: ["details"],
      release_date: ["details"],
      release_timestamp: ["details"],
      purchase_date: ["order"],
      language: ["details"],
      publisher_summary: ["details"],
      rating: ["details"],
      num_ratings: ["details"],
      audible_oginal: ["details"],
      category_type: ["details"],
      main_category: ["details"],
      sub_category: ["details"],
      categories: ["details"]
    });
    this.library = library || {};
    this.details = details || {};
    this.order = order || {};
  }
  return _createClass(Result, [{
    key: "first",
    value: function first(key) {
      var _this = this;
      // the objects to look for key in
      var sources = _toConsumableArray(_classPrivateFieldGet(_headers, this)[key]);
      return sources.reduce(function (fallback, source, _, arr) {
        var value = _this[source][key];

        // if the key is there, return it and break early
        if (!["null", "undefined"].includes(_typeof(value))) {
          arr.splice(1);
          return value;
        } else {
          // otherwise, return ""
          return fallback;
        }
      }, "");
    }
  }, {
    key: "data",
    value: function data() {
      var _this2 = this;
      return Object.fromEntries(Object.keys(_classPrivateFieldGet(_headers, this)).map(function (key) {
        return [key, _this2.first(key)];
      }));
    }
  }]);
}());
},{}],24:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _wrapper, _content, _close_btn, _ft_select, _start_btn, _file;
function _regeneratorRuntime() {  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
/**
 * Modal pop-up window for starting the exporter.
 *
 * @requires modal.js
 */

require("./util.js");
require("./modal.js");
StartModal = (_wrapper = /*#__PURE__*/new WeakMap(), _content = /*#__PURE__*/new WeakMap(), _close_btn = /*#__PURE__*/new WeakMap(), _ft_select = /*#__PURE__*/new WeakMap(), _start_btn = /*#__PURE__*/new WeakMap(), _file = /*#__PURE__*/new WeakMap(), /*#__PURE__*/function (_Modal) {
  function StartModal() {
    var _this;
    _classCallCheck(this, StartModal);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, StartModal, [].concat(args));
    _classPrivateFieldInitSpec(_this, _wrapper, null);
    _classPrivateFieldInitSpec(_this, _content, null);
    _classPrivateFieldInitSpec(_this, _close_btn, null);
    _classPrivateFieldInitSpec(_this, _ft_select, null);
    _classPrivateFieldInitSpec(_this, _start_btn, null);
    _classPrivateFieldInitSpec(_this, _file, null);
    _defineProperty(_this, "title", "Export your audible library.");
    _defineProperty(_this, "selectors", {
      wrapper: "ae-modal",
      content: "ae-content",
      head: "ae-head",
      close_btn: "ae-close-btn",
      start_btn: "ae-start-btn"
    });
    return _this;
  }
  _inherits(StartModal, _Modal);
  return _createClass(StartModal, [{
    key: "wrapper",
    get:
    /* Elements
     ***************************************************************************/

    /**
     * Construct wrapper div, append all child elements.
     *
     * @returns {Doc}
     */
    function get() {
      if (!_classPrivateFieldGet(_wrapper, this)) {
        _classPrivateFieldSet(_wrapper, this, _superPropGet(StartModal, "wrapper", this, 1));
        _classPrivateFieldGet(_wrapper, this).id = "ae-start-modal";
      }
      return _classPrivateFieldGet(_wrapper, this);
    }

    /**
     * The div element for the main content of the modal.
     *
     * @returns {Doc}
     */
  }, {
    key: "content",
    get: function get() {
      var _this2 = this;
      if (!_classPrivateFieldGet(_content, this)) {
        var content = _superPropGet(StartModal, "content", this, 1);
        var copy = Doc.create("div", {
          "class": "ae-copy"
        });
        var btn_wrapper = Doc.create("span", {
          id: "ae-start-btn"
        });
        var ul = Doc.create("ul");
        btn_wrapper.append(this.start_btn);
        content.append(copy);
        copy.append(this.p("This will export your audible library. It might take awhile."));
        copy.append(this.p("Until it's done, you must:"), ul);
        var need = ["be on audible.com and logged in.", "not close this browser window.", "not navigate away from this page.", "stay online (avoid sleep mode)."];
        ul.append.apply(ul, _toConsumableArray(need.map(function (text) {
          return _this2.li(text);
        })));
        copy.append(this.p("Click the button to get started!"), btn_wrapper.element);
        _classPrivateFieldSet(_content, this, content);
      }
      return _classPrivateFieldGet(_content, this);
    }

    /**
     * Create a paragraph element.
     *
     * @params {string} text  Inner text
     *
     * returns {Doc}
     */
  }, {
    key: "p",
    value: function p(text) {
      var p = Doc.create("p");
      p.innerHTML = text;
      return p;
    }

    /**
     * Create a list element.
     *
     * @params {string} text  Inner text
     *
     * returns {Doc}
     */
  }, {
    key: "li",
    value: function li(text) {
      var li = Doc.create("li");
      li.innerHTML = text;
      return li;
    }
  }, {
    key: "start_btn",
    get: function get() {
      if (!_classPrivateFieldGet(_start_btn, this)) {
        var btn = Doc.create("a", {
          id: this.selectors.start_btn,
          "class": "ae-btn"
        });
        btn.attributes.href = "#";
        btn.innerHTML = "Start";
        btn.element.addEventListener("click", /*#__PURE__*/function () {
          var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(evt) {
            var _window$ae, _window$ae2;
            return _regeneratorRuntime().wrap(function _callee$(_context) {
              while (1) switch (_context.prev = _context.next) {
                case 0:
                  (_window$ae = window.ae) === null || _window$ae === void 0 || (_window$ae = _window$ae.modal) === null || _window$ae === void 0 || _window$ae.remove();
                  if (!((_window$ae2 = window.ae) !== null && _window$ae2 !== void 0 && _window$ae2.run)) {
                    _context.next = 4;
                    break;
                  }
                  _context.next = 4;
                  return window.ae.run();
                case 4:
                case "end":
                  return _context.stop();
              }
            }, _callee);
          }));
          return function (_x) {
            return _ref.apply(this, arguments);
          };
        }(), false);
        _classPrivateFieldSet(_start_btn, this, btn);
      }
      return _classPrivateFieldGet(_start_btn, this);
    }
  }, {
    key: "create",
    value: function create() {
      _superPropGet(StartModal, "create", this, 3)([]);
    }
  }]);
}(Modal));
},{"./modal.js":14,"./util.js":30}],25:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _wrapper, _bar, _status, _percentage, _messages, _context, _steps, _estimate, _percent, _item_no, _total;
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
require("./timer.js");
require("./styled.js");
StatusNotifier = (_wrapper = /*#__PURE__*/new WeakMap(), _bar = /*#__PURE__*/new WeakMap(), _status = /*#__PURE__*/new WeakMap(), _percentage = /*#__PURE__*/new WeakMap(), _messages = /*#__PURE__*/new WeakMap(), _context = /*#__PURE__*/new WeakMap(), _steps = /*#__PURE__*/new WeakMap(), _estimate = /*#__PURE__*/new WeakMap(), _percent = /*#__PURE__*/new WeakMap(), _item_no = /*#__PURE__*/new WeakMap(), _total = /*#__PURE__*/new WeakMap(), /*#__PURE__*/function (_Styled) {
  function StatusNotifier() {
    var _this;
    _classCallCheck(this, StatusNotifier);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, StatusNotifier, [].concat(args));
    _classPrivateFieldInitSpec(_this, _wrapper, null);
    _classPrivateFieldInitSpec(_this, _bar, null);
    _classPrivateFieldInitSpec(_this, _status, null);
    _classPrivateFieldInitSpec(_this, _percentage, null);
    _classPrivateFieldInitSpec(_this, _messages, null);
    _classPrivateFieldInitSpec(_this, _context, null);
    _classPrivateFieldInitSpec(_this, _steps, null);
    _classPrivateFieldInitSpec(_this, _estimate, null);
    _classPrivateFieldInitSpec(_this, _percent, null);
    _classPrivateFieldInitSpec(_this, _item_no, null);
    _classPrivateFieldInitSpec(_this, _total, null);
    _defineProperty(_this, "step_no", null);
    _defineProperty(_this, "total_steps", 4);
    _defineProperty(_this, "estimate_padding", 1.05);
    _defineProperty(_this, "event_name", "update-ae-notifier");
    _defineProperty(_this, "times", []);
    _defineProperty(_this, "selectors", {
      wrapper: "ae-notifier",
      bar: "ae-bar",
      messages: "ae-messages",
      status: "ae-status-text",
      percentage: "ae-percent-text",
      context: "ae-context",
      steps: "ae-steps-text",
      estimate: "ae-estimate-text"
    });
    return _this;
  }
  _inherits(StatusNotifier, _Styled);
  return _createClass(StatusNotifier, [{
    key: "wrapper",
    get:
    /* Elements
     ***************************************************************************/

    /**
     * Construct HTML elements.
     *
     * @returns {Doc}
     */
    function get() {
      if (!_classPrivateFieldGet(_wrapper, this)) {
        _classPrivateFieldSet(_wrapper, this, Doc.create("div", {
          id: this.selectors.wrapper,
          style: {
            width: "".concat(this.bar_width, "px"),
            left: "".concat((this.body_width - this.bar_width) / 2, "px"),
            "z-index": new Date().getTime()
          }
        }));
        this.wrapper.append(this.bar, this.context);
      }
      return _classPrivateFieldGet(_wrapper, this);
    }

    /**
     * Progress bar element.
     *
     * @returns {Doc}
     */
  }, {
    key: "bar",
    get: function get() {
      if (!_classPrivateFieldGet(_bar, this)) {
        _classPrivateFieldSet(_bar, this, Doc.create("div", {
          id: this.selectors.bar
        }));
        _classPrivateFieldGet(_bar, this).append(this.messages);
      }
      return _classPrivateFieldGet(_bar, this);
    }

    /**
     * Div that contains text elements.
     *
     * @returns {Doc}
     */
  }, {
    key: "messages",
    get: function get() {
      if (!_classPrivateFieldGet(_messages, this)) {
        _classPrivateFieldSet(_messages, this, Doc.create("div", {
          id: this.selectors.messages,
          "class": "ae-row",
          style: {
            width: "".concat(this.bar_width, "px")
          }
        }));
        _classPrivateFieldGet(_messages, this).append(this.status, this.percentage);
      }
      return _classPrivateFieldGet(_messages, this);
    }

    /**
     * Div that contains status message.
     *
     * @returns {Doc}
     */
  }, {
    key: "status",
    get: function get() {
      if (!_classPrivateFieldGet(_status, this)) {
        _classPrivateFieldSet(_status, this, Doc.create("div", {
          id: this.selectors.status
        }));
      }
      return _classPrivateFieldGet(_status, this);
    }

    /**
     * Span element that contains percentage text.
     */
  }, {
    key: "percentage",
    get: function get() {
      if (!_classPrivateFieldGet(_percentage, this)) {
        _classPrivateFieldSet(_percentage, this, Doc.create("span", {
          id: this.selectors.percentage
        }));
      }
      return _classPrivateFieldGet(_percentage, this);
    }

    /**
     * Div under the progress bar.
     *
     * @returns {Doc}
     */
  }, {
    key: "context",
    get: function get() {
      if (!_classPrivateFieldGet(_context, this)) {
        _classPrivateFieldSet(_context, this, Doc.create("div", {
          id: this.selectors.context,
          "class": "ae-row empty"
        }));
        _classPrivateFieldGet(_context, this).append(this.steps, this.estimate);
      }
      return _classPrivateFieldGet(_context, this);
    }

    /**
     * Span that contains the "Step x of y" text.
     *
     * @returns {Doc}
     */
  }, {
    key: "steps",
    get: function get() {
      if (!_classPrivateFieldGet(_steps, this)) {
        _classPrivateFieldSet(_steps, this, Doc.create("span", {
          id: this.selectors.steps
        }));
      }
      return _classPrivateFieldGet(_steps, this);
    }

    /**
     * Span that contains the estimated remaining time.
     *
     * @returns {Doc}
     */
  }, {
    key: "estimate",
    get: function get() {
      if (!_classPrivateFieldGet(_estimate, this)) {
        _classPrivateFieldSet(_estimate, this, Doc.create("span", {
          id: this.selectors.estimate
        }));
      }
      return _classPrivateFieldGet(_estimate, this);
    }

    /* Accessors
     ***************************************************************************/

    /**
     * The number of the current item being processed.
     *
     * @returns {number}
     */
  }, {
    key: "item_no",
    get: function get() {
      return _classPrivateFieldGet(_item_no, this);
    }

    /**
     * Set .item_no and update .text and .percent.
     *
     * @param   {number} value  The number of the current item being processed.
     *
     * @returns {number}
     */,
    set: function set(value) {
      _classPrivateFieldSet(_item_no, this, value);
      this.text = this.message;
      this.percent = this.ratio;
      this.time = this.time_left;
    }

    /**
     * The total number of items to process.
     */
  }, {
    key: "total",
    get: function get() {
      return _classPrivateFieldGet(_total, this);
    }

    /**
     * Set .total and update text and percent.
     */,
    set: function set(value) {
      _classPrivateFieldSet(_total, this, value);
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
  }, {
    key: "text",
    get: function get() {
      return this.status.innerText;
    }

    /**
     * Set the status message text.
     *
     * @param {string} message  Message to display.
     */,
    set: function set(message) {
      this.status.innerText = message;
    }

    /**
     * The current percent complete.
     *
     * @returns {float} A value between 0 and 1.0
     */
  }, {
    key: "percent",
    get: function get() {
      return _classPrivateFieldGet(_percent, this);
    }

    /**
     * Set the percent complete.
     *
     * Set the modal.percent value, the progress bar width, and the percentage
     * text.
     */,
    set: function set(decimal) {
      if (isNaN(decimal) || !isFinite(decimal)) {
        return;
      }
      _classPrivateFieldSet(_percent, this, decimal);
      var amount = Math.ceil(decimal * 100);
      this.percentage.innerText = "".concat(amount, "%");
      var width = this.bar_width * decimal;
      this.bar.style.width = "".concat(width, "px");
    }

    /**
     * Get the step message text.
     *
     * @returns {string}
     */
  }, {
    key: "step",
    get: function get() {
      return this.steps.innerText;
    }

    /**
     * Set the step message text.
     *
     * @param {string} message  Message to display.
     */,
    set: function set(message) {
      this.context.classList.remove("empty");
      this.steps.innerText = message;
    }

    /**
     * Get the remaining time message text.
     *
     * @returns {string}
     */
  }, {
    key: "time",
    get: function get() {
      return this.estimate.innerText;
    }

    /**
     * Set the time message text.
     *
     * @param {string} message  Message to display.
     */,
    set: function set(message) {
      this.context.classList.remove("empty");
      this.estimate.innerText = message;
    }

    /**
     * Add a Timer object to the list of times.
     *
     * @param {Timer} value
     */
  }, {
    key: "timer",
    set: function set(value) {
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
  }, {
    key: "message",
    get: function get() {
      return "Initializing...";
    }

    /* Calculated properties
     ***************************************************************************/

    /**
     * The body width.
     *
     * @returns {number}
     */
  }, {
    key: "body_width",
    get: function get() {
      return document.body.getBoundingClientRect().width;
    }

    /**
     * The overall width of the progress bar.
     *
     * @returns {number}
     */
  }, {
    key: "bar_width",
    get: function get() {
      return this.body_width * 0.8;
    }

    /**
     * The "Step x of y" text to display to the user.
     *
     * @returns {string}
     */
  }, {
    key: "step_text",
    get: function get() {
      if (!this.step_no) {
        return "";
      }
      var text = "Step ".concat(this.step_no, " of ").concat(this.total_steps);
      if (this.step_desc) {
        text += ": ".concat(this.step_desc);
      }
      return "[".concat(text, "]");
    }

    /**
     * The calculated percent complete.
     */
  }, {
    key: "ratio",
    get: function get() {
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
  }, {
    key: "remaining",
    get: function get() {
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
  }, {
    key: "per_item",
    get: function get() {
      var total = this.times.reduce(function (sum, t) {
        return sum + t.elapsed;
      }, 0);
      return total / this.times.length;
    }

    /**
     * Estimate time left to process remaining items in milliseconds.
     *
     * @return {number}
     */
  }, {
    key: "ms_left",
    get: function get() {
      return this.remaining * this.per_item * this.estimate_padding;
    }

    /**
     * Estimate time left to process remaining items in minutes.
     *
     * @returns {string}
     */
  }, {
    key: "minutes_left",
    get: function get() {
      var minutes = (this.ms_left / 1000 / 60).toFixed(1);
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
  }, {
    key: "time_left",
    get: function get() {
      if (!(this.times.length && this.item_no != null && this.total)) {
        return "";
      }
      var minutes = this.minutes_left;
      var text;
      if (minutes <= 0.5) {
        text = "less than a minute remaining";
      } else if (minutes <= 1) {
        text = "about a minute remaining";
      } else {
        text = "about ".concat(minutes, " minutes remaining");
      }
      return "".concat(text);
    }

    /* Methods
     ***************************************************************************/

    /**
     * Event listener.
     *
     * For each item in the event.detail object, set the window.ae.notifier
     * attribute named key to value.
     */
  }, {
    key: "listen",
    value: function listen(evt) {
      var notifier = window.ae.notifier;
      for (var _i = 0, _Object$entries = Object.entries(evt.detail); _i < _Object$entries.length; _i++) {
        var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
          k = _Object$entries$_i[0],
          v = _Object$entries$_i[1];
        notifier[k] = v;
      }
    }

    /**
     * Hide the modal element.
     */
  }, {
    key: "hide",
    value: function hide() {
      this.wrapper.classList.add("hidden");
    }

    /**
     * Show the modal element.
     */
  }, {
    key: "show",
    value: function show() {
      this.wrapper.classList.remove("hidden");
    }

    /**
     * Add the wrapper HTML element to the DOM.
     *
     * Add the .wrapper element to the DOM, add the update-ae-notifier event
     * listener, and set the intital status text.
     */
  }, {
    key: "create",
    value: function create() {
      _superPropGet(StatusNotifier, "create", this, 3)([]);
      document.addEventListener(this.event_name, this.listen);
      window.ae.notifier = this;
      this.text = this.message;
      this.step = this.step_text;
    }

    /**
     * Clear all user-visible values and set the percent to zero.
     */
  }, {
    key: "reset",
    value: function reset() {
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
  }, {
    key: "remove",
    value: function remove() {
      document.removeEventListener(this.event_name, this.listen);
      _superPropGet(StatusNotifier, "remove", this, 3)([]);
      _classPrivateFieldSet(_wrapper, this, null);
      _classPrivateFieldSet(_bar, this, null);
      _classPrivateFieldSet(_status, this, null);
      _classPrivateFieldSet(_percentage, this, null);
    }
  }]);
}(Styled));
},{"./styled.js":27,"./timer.js":28}],26:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _wrapper, _css;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
/**
 * Create a <style> tag for CSS.
 */

require("./dom.js");
Style = (_wrapper = /*#__PURE__*/new WeakMap(), _css = /*#__PURE__*/new WeakMap(), /*#__PURE__*/function (_DOM) {
  function Style() {
    var _this;
    _classCallCheck(this, Style);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _callSuper(this, Style, [].concat(args));
    _classPrivateFieldInitSpec(_this, _wrapper, null);
    _classPrivateFieldInitSpec(_this, _css, null);
    _defineProperty(_this, "selectors", {
      wrapper: "ae-style"
    });
    return _this;
  }
  _inherits(Style, _DOM);
  return _createClass(Style, [{
    key: "css",
    get:
    /**
     * The CSS.
     *
     * On build, the CSS_MARKER line will be replaced with the contents of
     * notifier.css.
     *
     * @returns {string}
     */
    function get() {
      if (!_classPrivateFieldGet(_css, this)) {
        _classPrivateFieldSet(_css, this, "\n/* Colors\n *******************************************************************************/\n\n/*\n  #colors = {\n    darkGray: \"#232530\",\n    offWhite: \"#abaab3\",\n  }\n*/\n\n:root {\n  /* --ae-dark-green: #14c45a; */\n  /* --ae-light-green: #18e76a; */\n  /* --ae-emerald-green: #43c26d; */\n\n  --ae-near-black: #1A191B;\n  --ae-black-russian: #25242A;\n\n  --ae-dark-green: #07ba5b;\n  --ae-emerald-green: #14B762;\n  --ae-light-green: #20D174;\n  --ae-bright-green: #0aff99;\n\n  --ae-carbon: #333333;\n  --ae-dim-gray: #4d4d4d;\n  --ae-gray: #808080;\n  --ae-basalt-gray: #9a99a1;  /* very close to #999999 */\n  --ae-mystic-white: #dce6ef;\n  --ae-near-white: #eaeaea;\n\n}\n/* Modals\n *******************************************************************************/\n\n:root {\n  --ae-box-shadow: 3px 3px 10px 3px;\n  --ae-box-shadow-light-bg: var(--ae-box-shadow) var(--ae-dim-gray);\n  --ae-box-shadow-dark-bg: var(--ae-box-shadow) var(--ae-carbon);\n}\n\n.ae-modal {\n  box-sizing: border-box;\n  position: fixed;\n  font-family: \"Cantarell\", sans-serif;\n  height: 100%;\n  width: 100%;\n  top: 0;\n  left: 0;\n}\n\n.ae-modal .ae-content {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%);\n\n  width: 50%;\n  height: 300px;\n\n  border-radius: 15px;\n  box-shadow: 0 3px 15px -2px #222;\n  padding: 20px;\n\n  background-color: var(--ae-black-russian);\n  color: var(--ae-near-white);\n  font-size: 1.1em;\n}\n\n.ae-modal .ae-head {\n  background-color: var(--ae-near-black);\n  padding: 10px;\n  border-radius: 10px 10px 0px 0px;\n}\n\n.ae-modal h1 {\n  color: var(--ae-mystic-white);\n  font-size: 1.2rem;\n  font-weight: 600;\n  line-height: normal;\n  margin: 0;\n  padding-bottom: 10px;\n  text-transform: uppercase;\n}\n\n.ae-modal #ae-close-btn {\n  color: var(--ae-basalt-gray);\n  font-size: 28px;\n  font-weight: bold;\n  text-decoration: none;\n  margin: 0;\n  margin-top: -10px;\n  align-self: flex-end;\n  float: right;\n}\n\n#ae-start-modal .ae-head {\n  background-color: unset;\n}\n\n#ae-start-modal .ae-content {\n  width: 60%;\n  height: unset;\n}\n\n.ae-modal .ae-copy {\n  background-color: var(--ae-near-black);\n  padding: 25px;\n  margin: 20px;\n  border-radius: 15px;\n}\n\n#ae-close-btn:hover,\n#ae-close-btn:focus {\n  color: #000;\n  text-decoration: none;\n  cursor: pointer;\n}\n\n.ae-actions {\n  display: flex;\n  gap: 15px;\n  margin: 30px 20px;\n}\n\n#ae-start-modal ul {\n  margin: 30px 0;\n\n  ::marker {\n    font-size: 1.3em;\n    color: var(--ae-light-green);\n\n    /* NOTE: Double-escaped here because this will be embedded in JS. */\n\t\tcontent: \"\\027B2   \";  /* \u27B2 */\n  }\n}\n\n#ae-start-modal li {\n  line-height: 1.7em;\n}\n\n#ae-start-modal span#ae-start-btn {\n  width: 100%;\n  display: flex;\n  justify-content: center;\n}\n\na.ae-btn {\n  background-color: var(--ae-emerald-green);\n  color: #000;\n  cursor: pointer;\n\n  font-size: 1em;\n  font-family: system-ui;\n  font-weight: 600;\n  text-transform: uppercase;\n\n  text-decoration: none;\n  text-align: center;\n  padding: 10px 25px;\n\n  display: inline-block;\n\n  border-radius: 4px;\n  box-shadow: var(--ae-box-shadow-light-bg);\n  -webkit-box-shadow: var(--ae-box-shadow-light-bg);\n  -moz-box-shadow: var(--ae-box-shadow-light-bg);\n}\n\na.ae-btn:hover {\n  background-color: var(--ae-near-black);\n  color: var(--ae-near-white);\n  text-decoration: none;\n\n  box-shadow: var(--ae-box-shadow-dark-bg);\n  -webkit-box-shadow: var(--ae-box-shadow-dark-bg);\n  -moz-box-shadow: var(--ae-box-shadow-dark-bg);\n}\n\na.ae-btn.disabled {\n  opacity: 0.5;\n  pointer-events: none;\n  color: white;\n}\n\n#ae-start-modal .ae-content {\n  width: 60%;\n  height: unset;\n}\n\n#ae-download-btn {\n  position: relative;\n}\n\n#ae-download-btn a {\n  padding: 10px 25px;\n  text-indent: 15px;\n}\n\n#ae-download-btn a:before,\n#ae-download-btn a:after {\n  content: \" \";\n  display: block;\n  position: absolute;\n  left: 14px;\n  top: 52%;\n}\n\n/* Download box shape  */\n#ae-download-btn a:before {\n  width: 10px;\n  height: 2px;\n  border-style: solid;\n  border-width: 0 2px 2px;\n}\n\n/* Download arrow shape */\n#ae-download-btn a:after {\n  width: 0;\n  height: 0;\n  margin-left: 1px;\n  margin-top: -7px;\n\n  border-style: solid;\n  border-width: 4px 4px 0 4px;\n  border-color: transparent;\n  border-top-color: inherit;\n}\n\n#ae-download-btn a:hover:before {\n  border-color: var(--ae-emerald-green);\n}\n\n#ae-download-btn a:hover:after {\n  animation: downloadArrow 2s linear infinite;\n  animation-play-state: running;\n  border-top-color: var(--ae-emerald-green);\n}\n\n@keyframes downloadArrow {\n  /* 0% and 0.001% keyframes used as a hackish way of having the button frozen\n   * on a nice looking frame by default */\n\n  0% {\n    margin-top: -7px;\n    opacity: 1;\n  }\n\n  0.001% {\n    margin-top: -15px;\n    opacity: 0;\n  }\n\n  50% {\n    opacity: 1;\n  }\n\n  100% {\n    margin-top: 0;\n    opacity: 0;\n  }\n}\n/* Notifiers\n *******************************************************************************/\n\n:root {\n  --ae-transparent-black: rgba(0, 0, 0, 0.05);\n  --ae-blur-shadow: 0 0 8px 8px var(--ae-transparent-black);\n}\n\n#ae-notifier {\n  position: fixed;\n  top: 100px;\n  border-radius: 0.2em;\n  font-family: system-ui;\n  border: 1px solid var(--ae-light-green);\n  background-color: var(--ae-near-black);\n}\n\n#ae-notifier.hidden {\n  display: none;\n}\n\n#ae-bar {\n  width: 0;\n  height: 50px;\n  border-bottom-right-radius: 0.2em;\n  border-top-right-radius: 0.2em;\n  transition: all 1s;\n  border-width: 1px;\n  border-style: solid;\n  background-color: var(--ae-dark-green);\n  border-color: var(--ae-light-green);\n  -webkit-animation: pulse 1s linear alternate;\n  -webkit-animation-iteration-count: infinite; \n}\n\n#ae-messages {\n  padding: 14px;\n  color: #fff;\n  font-size: 1.1em;\n  font-weight: 600;\n\n}\n\n#ae-status-text {\n  text-wrap: nowrap;\n\n  -webkit-text-stroke: 0.2px var(--ae-dim-gray);\n\n  background-color: var(--ae-transparent-black);\n  box-shadow: var(--ae-blur-shadow);\n  -webkit-box-shadow: var(--ae-blur-shadow);\n  -moz-box-shadow: var(--ae-blur-shadow);\n}\n\n#ae-percent-text {\n  color: var(--ae-bright-green);\n}\n\n#ae-context.empty {\n  height: 0px;\n  padding: 0px;\n  border-top: 0px;\n}\n\n#ae-context{\n  font-size: .9em;\n  color: #999;\n  background: var(--ae-black-russian);\n  border-top: 1px solid var(--ae-dim-gray);\n  padding: 3px;\n}\n\n.ae-row {\n  display: flex;\n  flex-wrap: nowrap;\n  justify-content: space-between;\n}\n\n@-webkit-keyframes pulse {\n  from { background-color: var(--ae-dark-green); }\n  to { background-color: var(--ae-light-green); }\n}\n      ");
      }
      return _classPrivateFieldGet(_css, this);
    }

    /**
     * Construct the style element.
     *
     * The contents come from the css getter defined on subclasses.
     *
     * @returns {Doc}
     */
  }, {
    key: "wrapper",
    get: function get() {
      if (!_classPrivateFieldGet(_wrapper, this)) {
        _classPrivateFieldSet(_wrapper, this, Doc.create("style", {
          id: this.selectors.wrapper,
          type: "text/css"
        }));
        if (_classPrivateFieldGet(_wrapper, this).element.styleSheet) {
          // Support for IE
          _classPrivateFieldGet(_wrapper, this).element.styleSheet.cssText = this.css;
        } else {
          // Support for the rest
          var node = document.createTextNode(this.css);
          _classPrivateFieldGet(_wrapper, this).append(node);
        }
      }
      return _classPrivateFieldGet(_wrapper, this);
    }

    /**
     * Add the style HTML element to the DOM.
     *
     * Special case because this is added to the head, not the body.
     */
  }, {
    key: "create",
    value: function create() {
      var _window$ae;
      document.head.appendChild(this.wrapper.element);
      (_window$ae = window.ae).style || (_window$ae.style = this);
    }
  }]);
}(DOM));
},{"./dom.js":5}],27:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
require("./dom.js");
require("./style.js");
Styled = /*#__PURE__*/function (_DOM) {
  function Styled() {
    _classCallCheck(this, Styled);
    return _callSuper(this, Styled, arguments);
  }
  _inherits(Styled, _DOM);
  return _createClass(Styled, [{
    key: "create",
    value: function create() {
      _superPropGet(Styled, "create", this, 3)([]);
      if (!window.ae.style) {
        var style = new Style();
        style.create();
        window.ae.style = style;
      }
    }
  }]);
}(DOM);
},{"./dom.js":5,"./style.js":26}],28:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() {  /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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

require("./util.js");
Timer = /*#__PURE__*/function () {
  function Timer() {
    var beginning = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    var end = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    var task = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    _classCallCheck(this, Timer);
    this.beginning = beginning;
    this.end = end;
    this.task = task;
  }
  return _createClass(Timer, [{
    key: "start",
    value: function start() {
      this.beginning = this.ts();
      return this.beginning;
    }
  }, {
    key: "stop",
    value: function stop() {
      this.end = this.ts();
      return this.end;
    }
  }, {
    key: "elapsed",
    get: function get() {
      return this.end - this.beginning;
    }
  }, {
    key: "seconds",
    get: function get() {
      return this.elapsed / 1000;
    }
  }, {
    key: "minutes",
    get: function get() {
      return (this.seconds / 60).toFixed(2);
    }
  }, {
    key: "ts",
    value: function ts() {
      return new Date().getTime();
    }
  }, {
    key: "time",
    value: function () {
      var _time = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(callback) {
        var result;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              this.start();
              _context.next = 3;
              return callback();
            case 3:
              result = _context.sent;
              this.stop();
              return _context.abrupt("return", result);
            case 6:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function time(_x) {
        return _time.apply(this, arguments);
      }
      return time;
    }()
  }]);
}();
},{"./util.js":30}],29:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _headers, _rows;
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
require("./util.js");
require("./virtual-file.js");
TSVFile = (_headers = /*#__PURE__*/new WeakMap(), _rows = /*#__PURE__*/new WeakMap(), /*#__PURE__*/function (_VirtualFile) {
  function TSVFile() {
    var _this;
    var records = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    _classCallCheck(this, TSVFile);
    _this = _callSuper(this, TSVFile);
    _classPrivateFieldInitSpec(_this, _headers, null);
    _classPrivateFieldInitSpec(_this, _rows, null);
    _defineProperty(_this, "mimetype", "text/tsv");
    _defineProperty(_this, "extension", "tsv");
    _this.records = records;
    return _this;
  }
  _inherits(TSVFile, _VirtualFile);
  return _createClass(TSVFile, [{
    key: "headers",
    get: function get() {
      var _this2 = this;
      if (!this.records || isEmpty(this.records)) return null;
      if (!_classPrivateFieldGet(_headers, this)) {
        _classPrivateFieldSet(_headers, this, Object.keys(this.records[0]).map(function (h) {
          return _this2.sanitize(h);
        }));
      }
      return _classPrivateFieldGet(_headers, this);
    }
  }, {
    key: "rows",
    get: function get() {
      var _this3 = this;
      if (!this.records || isEmpty(this.records)) return null;
      if (!_classPrivateFieldGet(_rows, this)) {
        _classPrivateFieldSet(_rows, this, this.records.map(function (row) {
          return Object.values(row).map(function (v) {
            return _this3.sanitize(v);
          });
        }));
      }
      return _classPrivateFieldGet(_rows, this);
    }
  }, {
    key: "contents",
    get: function get() {
      if (!this.records || isEmpty(this.records)) return null;
      var lines = [this.headers].concat(_toConsumableArray(this.rows));
      var text = lines.map(function (l) {
        return l.join("\t");
      }).join("\n") + "\n";
      return text;
    }
  }, {
    key: "sanitize",
    value: function sanitize(text) {
      text = text || "";
      text = String(text);
      return text.replace(/\t|\v|\f/g, " ").replace(/\r|\n/g, " ").replace(/\0/g, "").replace(/\\/g, "\\\\").replace(/'/g, "\\'").replace(/"/g, '\\"');
    }
  }]);
}(VirtualFile));
},{"./util.js":30,"./virtual-file.js":31}],30:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
var CONSOLE_OUTPUT = false;
var LOG_PREFIX = "[audible-exporter]";
info = function info() {
  var _console;
  if (!CONSOLE_OUTPUT) {
    return;
  }
  for (var _len = arguments.length, msg = new Array(_len), _key = 0; _key < _len; _key++) {
    msg[_key] = arguments[_key];
  }
  (_console = console).log.apply(_console, [LOG_PREFIX].concat(msg));
};
error = function error() {
  var _console2;
  for (var _len2 = arguments.length, msg = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    msg[_key2] = arguments[_key2];
  }
  (_console2 = console).error.apply(_console2, [LOG_PREFIX].concat(msg));
};
log_table = function log_table(label, data) {
  if (!CONSOLE_OUTPUT) {
    return;
  }
  var name = "".concat(LOG_PREFIX, " ").concat(label);
  console.groupCollapsed(name);
  console.table(data);
  console.groupEnd(name);
};
titleCase = function titleCase(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
};
first = function first(arr) {
  var v;
  var _iterator = _createForOfIteratorHelper(arr),
    _step;
  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      v = _step.value;
      if (v) return v;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
};
var EMPTIES = {
  Object: "{}",
  Array: "[]"
};
isEmpty = function isEmpty(o) {
  if (!o) {
    return true;
  }
  var type = o.constructor.name;
  if (type == "List") {
    return o.length == 0;
  }
  if (!(type in EMPTIES)) {
    throw new Error("isEmpty() does not support type: ".concat(type, " (value: ").concat(o, ")."));
  }
  return JSON.stringify(o) == EMPTIES[type];
};
tryFloat = function tryFloat(o) {
  try {
    var f = parseFloat(o);
    return isNaN(f) ? o : f;
  } catch (err) {
    return o;
  }
};
tryInt = function tryInt(f) {
  try {
    var i = parseInt(f);
    return i == f ? i : f;
  } catch (err) {
    return f;
  }
};
entityDecode = function entityDecode(text) {
  return text.replace("&amp;", "&");
};
dateString = function dateString(date) {
  if (!date) return "";
  var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  if (date.constructor.name != "Date") {
    date = new Date(date);
  }
  return "".concat(date.getFullYear(), " ").concat(months[date.getMonth()], " ").concat(date.getDate());
};
cleanObject = function cleanObject(ob) {
  return Object.entries(ob).reduce(function (r, _ref) {
    var _ref2 = _slicedToArray(_ref, 2),
      k = _ref2[0],
      v = _ref2[1];
    if (v != null && v != undefined && v !== "" && (typeof v == "boolean" || typeof v == "string" || _typeof(v) == "symbol" || typeof v == "number" || typeof v == "function" || _typeof(v) == "object" && (Array.isArray(v) && v.length || Array.isArray(v) != true))) {
      r[k] = v;
      return r;
    } else {
      return r;
    }
  }, {});
};
fireEvent = function fireEvent(obj) {
  document.dispatchEvent(new CustomEvent("update-ae-notifier", {
    detail: obj
  }));
};
stripHTML = function stripHTML(html) {
  var doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};
rando = function rando(n) {
  return Math.round(Math.random() * n);
};
reg = function reg(o, n) {
  return o ? o[n] : "";
};
cleanObject = function cleanObject(ob) {
  return Object.entries(ob).reduce(function (r, _ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
      k = _ref4[0],
      v = _ref4[1];
    if (v != null && v != undefined && v !== "" && (typeof v == "boolean" || typeof v == "string" || _typeof(v) == "symbol" || typeof v == "number" || typeof v == "function" || _typeof(v) == "object" && (Array.isArray(v) && v.length || Array.isArray(v) != true))) {
      r[k] = v;
      return r;
    } else {
      return r;
    }
  }, {});
};
delay = function delay(ms) {
  return new Promise(function (res) {
    setTimeout(res, ms);
  });
};
},{}],31:[function(require,module,exports){


function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _contents;
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(e, t, a) { _checkPrivateRedeclaration(e, t), t.set(e, a); }
function _checkPrivateRedeclaration(e, t) { if (t.has(e)) throw new TypeError("Cannot initialize the same private elements twice on an object"); }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
require("./util.js");
VirtualFile = (_contents = /*#__PURE__*/new WeakMap(), /*#__PURE__*/function () {
  function VirtualFile() {
    var contents = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
    _classCallCheck(this, VirtualFile);
    _classPrivateFieldInitSpec(this, _contents, null);
    _defineProperty(this, "mimetype", null);
    _defineProperty(this, "extension", null);
    _classPrivateFieldSet(_contents, this, contents);
  }
  return _createClass(VirtualFile, [{
    key: "blob",
    get: function get() {
      return new Blob([this.contents], {
        type: this.mimetype
      });
    }
  }, {
    key: "url",
    get: function get() {
      return URL.createObjectURL(this.blob);
    }
  }, {
    key: "filename",
    get: function get() {
      var ts = new Date().getTime();
      return "audible_".concat(ts, ".").concat(this.extension);
    }
  }, {
    key: "contents",
    get: function get() {
      return _classPrivateFieldGet(_contents, this);
    },
    set: function set(value) {
      _classPrivateFieldSet(_contents, this, value);
    }
  }]);
}());
},{"./util.js":30}]},{},[7])

CONSOLE_OUTPUT = true;
exporter = new Exporter();
