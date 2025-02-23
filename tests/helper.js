const fs = require("fs")

global.getFixtureFile = function(name) {
  let contents = fs.readFileSync(`${__dirname}/fixtures/${name}`, "utf8");
  return contents;
}

global.toDoc = function(text) {
  return new DOMParser().parseFromString(text, "text/html")
}
