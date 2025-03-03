require("../src/dev.js");
require("../src/timer.js");

describe("Timer", function() {

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
    expect(timer.elapsed >= 100 && timer.elapsed < 150).toBe(true);
  });



});
