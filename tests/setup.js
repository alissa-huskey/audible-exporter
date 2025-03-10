const matchers = require("jest-extended");
expect.extend(matchers);

require("../src/dev.js");

beforeEach(() => {
  global.delay = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});
