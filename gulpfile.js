const replace = require("gulp-replace");
const using = require("gulp-using");
const concat = require("gulp-concat");
const { src, dest, task, series, parallel, done } = require("gulp");

const fs = require("fs");
const glob = require("glob").sync;

let log = console.log;

let dirs = {
  src: "src",
  build: "build",
  tmp: "build/tmp",
};

/**
 * Modal compoenents that depend on build/modal.js and have a
 * standalone file including all dependencies saved in build/
 */
let modals = ["start", "download"];

/**
 * Notifier compoenents that depend on build/status-notifier.js and have a
 * standalone file including all dependencies saved in build/
 */
let notifiers = ["purchase-history", "order", "library", "details"];

let dom_dependencies = ["util", "timer", "doc", "list", "dom"];

/**
 * Files in src/ that the main exporter depends on, in the order they must be
 * required.
 */
let sources = [
  "util",
  "doc",
  "list",
  "parser",
  "page",
  "timer",
  "purchase",
  "order-row",
  "order-page",
  "orders-fetcher",
  "library-book-row",
  "library-page",
  "library-fetcher",
  "book-page",
  "details-fetcher",
  "virtual-file",
  "tsv-file",
  "json-file",
  "result",
  "dom",
];

/**
 * Inject the contents of a CSS file in a style.js save to build/tmp/.
 */
task("style", (cb) => {
  let files = glob(`${dirs.src}/*.css`);
  let css = files.reduce(
    (text, filename) => text + fs.readFileSync(filename).toString(),
    "",
  );

  return src([`${dirs.src}/style.js`])
    .pipe(using({}))
    .pipe(replace(/\s*\/\* CSS_MARKER \*\/\n/, (_) => `\n${css}`))
    .pipe(dest(dirs.tmp));
});

/**
 * Generate tasks to build standalone DOM compoenents.
 *
 * Combine DOM dependencies with the CSS-injected file in build/tmp to create a
 * standalone base file in build/.
 *
 * Returns a series with one task for each component.
 */
buildModals = function (done) {
  const tasks = modals.map((name) => {
    let filename = `${name}-modal.js`;
    log(`generated task: buildModals->${filename}-modal.js`);
    return () =>
      src([
        // the dependencies from src/
        ...dom_dependencies.map((d) => `src/${d}.js`),

        // the generated style.js including css
        `${dirs.tmp}/style.js`,

        // the modal base class
        `${dirs.src}/modal.js`,

        // this modal
        `${dirs.src}/${filename}`,
      ])
        .pipe(concat(filename))
        .pipe(dest(dirs.build));
  });

  return series(...tasks, (seriesDone) => {
    seriesDone();
    done();
  })();
};

/**
 * Generate tasks to build standalone notifiers.
 *
 * Combine generated build/status-notifier.js with src/*-notifier.js to
 * generate a standalone notifier file including all of its dependencies.
 *
 * Returns a series with one task for each notifier.
 */
buildNotifiers = function (done) {
  const tasks = notifiers.map((name) => {
    let filename = `${name}-notifier.js`;
    log(`generated task: buildNotifier->${filename}`);
    return () =>
      src([
        // the dependencies from src/
        ...dom_dependencies.map((d) => `src/${d}.js`),

        // the generated style.js including css
        `${dirs.tmp}/style.js`,

        // the notifier base class
        `${dirs.src}/status-notifier.js`,

        // this notifier
        `${dirs.src}/${filename}`,
      ])
        .pipe(concat(filename))
        .pipe(dest(dirs.build));
  });

  return series(...tasks, (seriesDone) => {
    seriesDone();
    done();
  })();
};

/**
 * Build the main audible-exporter.js file.
 */
task("audible-exporter", (done) => {
  log("task: audible-exporter");
  return src([
    // all the regular dependencies
    ...sources.map((f) => `${dirs.src}/${f}.js`),

    // generated style.js
    `${dirs.tmp}/style.js`,

    // all modals
    `${dirs.src}/modal.js`,
    ...modals.map((f) => `${dirs.src}/${f}-modal.js`),

    // all notifiers
    `${dirs.src}/status-notifier.js`,
    ...notifiers.map((f) => `${dirs.src}/${f}-notifier.js`),

    // the exporter and runner
    `${dirs.src}/exporter.js`,
    `${dirs.src}/runner.js`,
  ])
    .pipe(concat("audible-exporter.js"))
    .pipe(dest(dirs.build));
});

task("modals", series("style", buildModals));
task("notifiers", series("style", buildNotifiers));
task("exporter", series("style", "audible-exporter"));
task("default", parallel("modals", "notifiers", "exporter"));
