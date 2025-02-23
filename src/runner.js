if (typeof process === "undefined" || process.env.JEST_WORKER_ID === undefined) {
  Exporter().run();
}
