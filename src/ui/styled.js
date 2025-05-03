require("./dom.js");
require("./style.js");

Styled = class extends DOM {
  create() {
    super.create();
    if (!window.ae.style) {
      let style = new Style();
      style.create();
      window.ae.style = style;
    }
  }
};
