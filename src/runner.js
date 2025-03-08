/**
 * runner.js
 * ************************************************************************************
 */

CONSOLE_OUTPUT = true;

void (async function main() {
  exporter = new Exporter();
  await exporter.run();
})();
