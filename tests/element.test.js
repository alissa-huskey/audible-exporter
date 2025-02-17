/**
 * @jest-environment jsdom
 */

const $ = require("jquery");
const fs = require("fs")
const path = require("path");

require("../src/exporter.js");


describe("Element", function() {
  beforeEach(() => {
    document.body.innerHTML = (
      '<div id="wrapper" class="container"><ul id="list">' +
      '<li>a</li><li class="selected">b</li><li>c</li>' +
      '</ul></div>'
    );
  });

  test("empty constructor", function() {
    e = new Element();
    expect(e.gc).toBeDefined();
  });

  test("constructor", function() {
    elm = document.getElementById("wrapper");
    element = new Element(elm);

    expect(element.id).toBe("wrapper");
    expect(element.element.constructor.name).toBe("HTMLDivElement");
    expect(element.element.attributes["class"].value).toBe("container");
  });

  test("Element.gt", function() {
    items = Element.gt("ul");

    expect(items.constructor.name).toBe("List");
    expect(items.length).toBe(1);
    expect(items[0].element.tagName).toBe("UL");
  });

  test("Element.gc", function() {
    items = Element.gc("selected");

    expect(items.constructor.name).toBe("List");
    expect(items.length).toBe(1);
    expect(items[0].element.tagName).toBe("LI");
  });

  test("Element.gi", function() {
    e = Element.gi("list");

    expect(e.constructor.name).toBe("Element");
    expect(e.element.tagName).toBe("UL");
  });

  test("getter", function() {
    element = new Element(document.getElementById("list"));
    expect(element.tagName).toBe("UL");
  });

  test("setter", function() {
    element = new Element(document.getElementById("list"));
    element.id = "nav";
    expect(element.element.id).toBe("nav");
  });

  test(".from_html()", function() {
    element = Element.from_html("<html><head></head><body><p>hello</p></body></html>");
    expect(element.element.tagName).toBe("HTML");
    expect(element.element.lastChild?.lastChild?.tagName).toBe("P");
    expect(element.element.lastChild?.lastChild?.innerHTML).toBe("hello");

    element = Element.from_html("<p>hello</p>", "p");
    expect(element.element.tagName).toBe("HTML");
    expect(element.element.lastChild?.lastChild?.tagName).toBe("P");
    expect(element.element.lastChild?.lastChild?.innerHTML).toBe("hello");
  });

  test(".gi()", function() {
    element = new Element(document.getElementById("wrapper"));
    res = element.gi("list");

    expect(res.constructor?.name).toBe("Element");
    expect(res.element.tagName).toBe("UL");
  });

  test(".gt()", function() {
    element = new Element(document.getElementById("wrapper"));
    res = element.gt("li")

    expect(res.constructor?.name).toBe("List");
    expect(res.length).toBe(3);
    expect(res[0].constructor?.name).toBe("Element")
  });

  test(".gc()", function() {
    element = new Element(document.getElementById("wrapper"));

    res = element.gc("selected")

    expect(res.constructor?.name).toBe("List");
    expect(res[0].attributes["class"].value).toBe("selected")
  });

  test(".qs()", function() {
    element = new Element(document.getElementById("wrapper"));
    res = element.qs("li");

    expect(res.constructor?.name).toBe("Element");
    expect(res.tagName).toBe("LI");
    expect(res.innerHTML).toBe("a");
  });

  test(".qsa()", function() {
    element = new Element(document.getElementById("wrapper"));
    res = element.qsa("li");

    expect(res.constructor?.name).toBe("List");
    expect(res.length).toBe(3);
  });

  test("set()", function() {
    e = new Element(document.createElement("h1"));
    e.set("id", "title");

    // expect(e.element.attributes["id"].value).toBe("title");
    // expect(e.element.id).toBe("title");
    expect(e.attributes["id"].value).toBe("title");
    expect(e.id).toBe("title");

    // e.set({id: "title"})
  });
});
