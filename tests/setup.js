const matchers = require("jest-extended");
expect.extend(matchers);

beforeEach(() => {
  global.delay = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});
