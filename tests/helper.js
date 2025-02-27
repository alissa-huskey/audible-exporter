const fs = require("fs")

global.getFixtureFile = function(name) {
  let contents = fs.readFileSync(`${__dirname}/fixtures/${name}`, "utf8");
  return contents;
}

global.toDoc = function(text) {
  return new DOMParser().parseFromString(text, "text/html")
}

global.fixtureDoc = function(name) {
  let doc = toDoc(getFixtureFile(name));
  doc.name = name;
  return doc;
}

global.mockFn = function(rv) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve(rv),
  );
};

global.mockFetchDoc = function(fixture) {
  return jest.fn().mockImplementation(() =>
    Promise.resolve(fixtureDoc(fixture)),
  );
};

global.mockFetchDocs = function(docs) {
  docs = docs.slice().reverse();
  return jest.fn().mockImplementation((i) =>
    Promise.resolve(docs.pop()),
  );
};
