/**
 * Measure how long a block of code takes to execute.
 *
 * @example
 *   
      let sleep = (ms) => new Promise(res => {
        setTimeout(res, ms);
      });

      let timer = new Timer();
      timer.start();

      await sleep(500);

      timer.stop();
      console.log(`That took: ${timer.seconds} seconds.`);
 *
 */

require("./util.js");

Timer = class {
  constructor(beginning = null, end = null, task = null) {
    this.beginning = beginning;
    this.end = end;
    this.task = task;
  }

  start() {
    this.started_at = new Date();
    this.beginning = this.started_at.getTime();
    return this.beginning;
  }

  stop() {
    this.stopped_at = new Date();
    this.end = this.stopped_at.getTime();
    return this.end;
  }

  get elapsed() {
    return this.end - this.beginning;
  }

  get seconds() {
    return this.elapsed / 1000;
  }

  get minutes() {
    return (this.seconds / 60).toFixed(2);
  }

  get start_time() {
    return this.started_at?.toLocaleTimeString();
  }

  get stop_time() {
    return this.stopped_at?.toLocaleTimeString();
  }

  async time(callback) {
    this.start();
    let result = await callback();
    this.stop();
    return result;
  }
};
