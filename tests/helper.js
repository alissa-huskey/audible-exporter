const fs = require("fs");

global.getFixtureFile = function (name) {
  let contents = fs.readFileSync(`${__dirname}/fixtures/${name}`, "utf8");
  return contents;
};

global.toDoc = function (text) {
  return new DOMParser().parseFromString(text, "text/html");
};

global.fixtureDoc = function (name) {
  let doc = toDoc(getFixtureFile(name));
  doc.name = name;
  return doc;
};

global.fixtureElement = function (filename, selector) {
  let doc = fixtureDoc(filename);
  let el = doc.querySelector(selector);

  return el;
};

global.mockFn = function (rv) {
  return jest.fn().mockImplementation(() => Promise.resolve(rv));
};

global.mockFetchDoc = function (fixture) {
  return jest
    .fn()
    .mockImplementation(() => Promise.resolve(fixtureDoc(fixture)));
};

global.mockFetchDocs = function (docs) {
  docs = docs.slice().reverse();
  return jest.fn().mockImplementation((i) => Promise.resolve(docs.pop()));
};

global.mockFetchFixtureDocs = function (files) {
  let docs = files
    .slice()
    .reverse()
    .map((f) => fixtureDoc(f));
  return jest.fn().mockImplementation((i) => Promise.resolve(docs.pop()));
};

global.URL.createObjectURL = jest.fn(
  () => "blob:https://www.google.com/6cb50f1f-699a-4975-9e38-29a4df034064",
);

global.delay = jest.fn();

/**
 * Return the milliseconds per item to process the number of remaining items in
 * the desired minutes.
 *
 * @params notifier {StatusNotifier}  the notifier object
 * @params minutes  {number}          the desired number of minutes
 *
 * @returns         {number}          milliseconds per item
 */
global.timePerItem = function (notifier, minutes) {
  // multiplier to reduce the amount of time to account for padding
  let unpad = 1 - (notifier.estimate_padding - 1);

  // desired minutes in milliseconds divided by remaining items, unpadded
  let ms = ((minutes * 60 * 1000) / notifier.remaining) * unpad;
  return ms;
};
