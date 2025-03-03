beforeEach(() => {
  global.delay = jest.fn();
});

afterEach(() => {
  jest.restoreAllMocks();
});
