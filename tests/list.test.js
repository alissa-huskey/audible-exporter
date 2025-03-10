/**
 * @jest-environment jsdom
 */

require("../src/dev.js");
require("../src/doc.js");
require("../src/list.js");

describe("List", () => {
  document.body.innerHTML = `
    <div id="wrapper" class="container">
      <ul id="list">
        <li>a</li>
        <li class="selected">b</li>
        <li>c</li>
      </ul>
    </div>
  `;

  let doc = toDoc(document.body.innerHTML);
  let elements = document.getElementsByTagName("li");
  let items = new List(elements);

  test("constructor", () => {
    expect(elements.length).toBe(3);
    expect(items[1].tagName).toBe("LI");
    expect(items[1].innerHTML).toBe("b");
  });

  test("first", () => {
    expect(items.first.innerHTML).toBe("a");
  });

  test("last", () => {
    expect(items.last.innerHTML).toBe("c");
  });
});
