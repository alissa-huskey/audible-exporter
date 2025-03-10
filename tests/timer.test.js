require("../src/dev.js");
require("../src/timer.js");

describe("Timer", () => {
  test("new Timer()", () => {
    let timer = new Timer();
    expect(timer).toBeA(Timer);

    timer = new Timer(5, 10);
    timer.beginning = 5;
    timer.end = 10;

    timer = new Timer(5, 10, "something");
    timer.beginning = 5;
    timer.end = 10;
    timer.task = "something";

    timer = new Timer(null, null, "something");
    timer.beginning = null;
    timer.end = null;
    timer.task = "something";
  });

  test(".ts()", () => {
    let timer = new Timer();
    expect(typeof timer.ts()).toBe("number");
  });

  test(".start()", () => {
    let timer = new Timer();
    expect(typeof timer.start()).toBe("number");
  });

  test(".stop()", () => {
    let timer = new Timer();
    expect(typeof timer.stop()).toBe("number");
  });

  test(".elapsed", () => {
    let timer = new Timer();
    timer.beginning = 1740971898000;
    timer.end = 1740971899000;

    expect(timer.elapsed).toBe(1000);
  });

  test(".time()", async () => {
    let sleep = (ms) =>
      new Promise((res) => {
        setTimeout(res, ms);
      });

    let timer = new Timer();
    let result = await timer.time(async () => {
      await sleep(100);
      return 100;
    });

    expect(result).toBe(100);
    expect(timer.elapsed).toBeWithin(100, 150);
  });
});
