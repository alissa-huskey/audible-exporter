/**
 * @jest-environment jsdom
 */

require("../src/dev.js");
require("../src/util.js");
require("../src/list.js");
require("../src/doc.js");

describe("Doc", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="wrapper" class="container">
        <ul id="list">
          <li>a</li>
          <li class="selected">b</li>
          <li>c</li>
        </ul>
      </div>"
    `;
  });

  test("Doc()", () => {
    let e = new Doc();
    expect(e).toBeA(Doc);
  });

  test("Doc(HTMLElement())", () => {
    let elm = document.getElementById("wrapper");
    element = new Doc(elm);

    expect(element.id).toBe("wrapper");
    expect(element.element).toBeA(HTMLDivElement);
    expect(element.element.attributes["class"].value).toBe("container");
  });

  test("Doc.create()", () => {
    let e = Doc.create("p");
    expect(e.element.tagName).toBe("P");

    e = Doc.create("p", { style: "width: 200px; border: 2px;" });
    expect(e.element.style.width).toBe("200px");
    expect(e.element.style.border).toBe("2px");

    e = Doc.create("p", { style: { width: "500px", color: "blue" } });
    expect(e.element.style.width).toBe("500px");
    expect(e.element.style.color).toBe("blue");

    e = Doc.create("p", { style: "width: 200px;" });
    expect(e.element.style.width).toBe("200px");

    e = Doc.create("p", { id: "summary" });
    expect(e.element.tagName).toBe("P");
    expect(e.element.id).toBe("summary");

    e = Doc.create("<p>hello</p>");
    expect(e.element.tagName).toBe("P");
    expect(e.element.innerHTML).toBe("hello");
  });

  test("Doc.gt()", () => {
    let items = Doc.gt("ul");

    expect(items).toBeA(List);
    expect(items.length).toBe(1);
    expect(items[0].element.tagName).toBe("UL");
  });

  test("Doc.gc()", () => {
    let items = Doc.gc("selected");

    expect(items).toBeA(List);
    expect(items.length).toBe(1);
    expect(items[0].element.tagName).toBe("LI");
  });

  test("Doc.gi()", () => {
    let e = Doc.gi("list");

    expect(e).toBeA(Doc);
    expect(e.element.tagName).toBe("UL");
  });

  test("getter", () => {
    let element = new Doc(document.getElementById("list"));
    expect(element.tagName).toBe("UL");
  });

  test("setter", () => {
    let element = new Doc(document.getElementById("list"));
    element.id = "nav";
    expect(element.element.id).toBe("nav");
  });

  test("Doc.from_html()", () => {
    let element = Doc.from_html(
      "<html><head></head><body><p>hello</p></body></html>",
    );
    expect(element.element.tagName).toBe("HTML");
    expect(element.element.lastChild?.lastChild?.tagName).toBe("P");
    expect(element.element.lastChild?.lastChild?.innerHTML).toBe("hello");

    element = Doc.from_html("<p>hello</p>", "p");
    expect(element.element.tagName).toBe("HTML");
    expect(element.element.lastChild?.lastChild?.tagName).toBe("P");
    expect(element.element.lastChild?.lastChild?.innerHTML).toBe("hello");
  });

  test(".gi()", () => {
    let element = new Doc(document.getElementById("wrapper"));
    res = element.gi("list");

    expect(res.constructor?.name).toBe("Doc");
    expect(res.element.tagName).toBe("UL");
  });

  test(".gt()", () => {
    let element = new Doc(document.getElementById("wrapper"));
    res = element.gt("li");

    expect(res.constructor?.name).toBe("List");
    expect(res.length).toBe(3);
    expect(res[0].constructor?.name).toBe("Doc");
  });

  test(".gc()", () => {
    let element = new Doc(document.getElementById("wrapper"));

    res = element.gc("selected");

    expect(res.constructor?.name).toBe("List");
    expect(res[0].attributes["class"].value).toBe("selected");
  });

  test(".gtf()", () => {
    let element = new Doc(document.getElementById("wrapper"));
    res = element.gtf("li");

    expect(res.constructor?.name).toBe("Doc");
    expect(res.element.tagName).toBe("LI");
  });

  test(".gc()", () => {
    let element = new Doc(document.getElementById("wrapper"));

    res = element.gcf("selected");

    expect(res.constructor?.name).toBe("Doc");
    expect(res.element.attributes["class"].value).toBe("selected");
  });

  test(".qsf()", () => {
    let element = new Doc(document.getElementById("wrapper"));
    res = element.qsf("li");

    expect(res.constructor?.name).toBe("Doc");
    expect(res.tagName).toBe("LI");
    expect(res.innerHTML).toBe("a");
  });

  test(".qs()", () => {
    let element = new Doc(document.getElementById("wrapper"));
    res = element.qs("li");

    expect(res.constructor?.name).toBe("List");
    expect(res.length).toBe(3);
  });

  test(".set()", () => {
    let e = new Doc(document.createElement("h1"));
    e.set("id", "title");

    expect(e.attributes["id"].value).toBe("title");
    expect(e.id).toBe("title");

    e = new Doc(document.createElement("h1"));
    e.set("id", "title");

    e.set({ id: "title", class: "big" });

    expect(e.element.id).toBe("title");
    expect(e.element.className).toBe("big");
  });

  test(".append()", () => {
    let ul = Doc.create("ul");
    let li = Doc.create("li", { id: "one" });

    ul.append(li.element);

    expect(ul.children).toHaveLength(1);
    expect(ul.element.children).toHaveLength(1);

    ul.append(Doc.create("li", { id: "two" }));

    expect(ul.children).toHaveLength(2);
    expect(ul.element.children).toHaveLength(2);

    ul.append(
      Doc.create("li", { id: "three" }),
      Doc.create("li", { id: "four" }),
    );

    expect(ul.children).toHaveLength(4);
    expect(ul.element.children).toHaveLength(4);
  });
});
