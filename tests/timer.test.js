require("../src/dev.js");
require("../src/util.js");
require("../src/timer.js");

describe("Timer", function() {


  test("new Timer()", function() {
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

  test(".ts()", function() {
    let timer = new Timer();
    expect(typeof timer.ts()).toBe("number");
  });

  test(".start()", function() {
    let timer = new Timer();
    expect(typeof timer.start()).toBe("number");
  });

  test(".stop()", function() {
    let timer = new Timer();
    expect(typeof timer.stop()).toBe("number");
  });

  test(".elapsed", function() {
    let timer = new Timer();
    timer.beginning = 1740971898000;
    timer.end = 1740971899000;

    expect(timer.elapsed).toBe(1000);
  });

  test(".time()", async function() {
    let sleep = (ms) => new Promise(res => {
      setTimeout(res, ms)
    });

    let timer = new Timer();
    let result = await timer.time(async function() {
      await sleep(100);
      return 100;
    });

    expect(result).toBe(100);
    expect(timer.elapsed).toBeWithin(100, 110);
  });

});
