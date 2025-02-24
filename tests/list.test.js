/**
 * @jest-environment jsdom
 */

require("../src/dev.js");
require("../src/element.js");
require("../src/list.js");


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
    expect(items.first.innerHTML).toBe("a");
  });

  test("last", function() {
    expect(items.last.innerHTML).toBe("c");
  });
});
