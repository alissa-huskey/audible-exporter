const fs = require("fs")

global.getFixtureFile = function(name) {
  let contents = fs.readFileSync(`${__dirname}/fixtures/${name}`, "utf8");
  return contents;
}

global.toDoc = function(text) {
  return new DOMParser().parseFromString(text, "text/html")
}

global.fixtureDoc = function(name) {
  return toDoc(getFixtureFile(name));
}

global.mockFetchDoc = function(fixture) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve(fixtureDoc(fixture)),
  );
};

global.mockFetchDocs = function(docs) {
  return jest.fn().mockImplementation((i) =>
    Promise.resolve(docs.pop()),
  );
};

