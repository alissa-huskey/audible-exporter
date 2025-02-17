/**
 * @jest-environment jsdom
 */

require("../src/exporter.js");


describe("List", function() {
  document.body.innerHTML = (
    '<div id="wrapper" class="container"><ul id="list">' +
    '<li>a</li><li class="selected">b</li><li>c</li>' +
    '</ul></div>'
  );
  doc = toDoc(document.body.innerHTML);
  elements = document.getElementsByTagName("li");
  items = new List(elements);

  test("constructor", function() {
    expect(elements.length).toBe(3);
    expect(items[1].tagName).toBe("LI");
    expect(items[1].innerHTML).toBe("b");
  });

  test("first", function() {
    e = items.first()
    expect(items.first().innerHTML).toBe("a");
  });
});
