const replace = require("gulp-replace");
const using = require("gulp-using");
const concat = require("gulp-concat");
const { src, dest, task, series, parallel, done } = require("gulp");
const fs = require("fs");

let log = console.log;

let dirs = {
  src: "src",
  build: "build",
  tmp: "build/tmp",
};

/**
 * DOM components that:
 * (a.) have CSS injected and saved in build/tmp/
 * (b.) have a standalone file including all dependencies saved in build/
 * (c.) (may be) the base for other standalone files
 */
let components = ["status-notifier", "modal"];

/**
 * Notifier compoenents that depend on build/status-notifier.js and have a
 * standalone file including all dependencies saved in build/
 */
let notifiers = ["purchase-history", "order", "library", "details"];

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
  "result",
  "dom",
];

/**
 * Inject the contents of a CSS file in a Javascript file and save to build/tmp/.
 *
 * Look for files with the text "CSS_MARKER <name>" and replace that line with
 * the contents of the file `src/<name>.css`.
 */
task("inject-css", (cb) => {
  log("task: inject-css");
  return src([`${dirs.src}/colors.js`, ...components.map((d) => `src/${d}.js`)])
    .pipe(using({}))
    .pipe(
      replace(/\n\s+\/\* CSS_MARKER (.*) \*\/\n/, (_, stylesheet) => {
        if (!stylesheet) {
          cb(new Error("No matching stylesheet found."));
        }
        console.log(`injecting stylesheet: src/${stylesheet}.js`);
        let css = fs.readFileSync(`src/${stylesheet}.css`).toString();
        return `\n${css}`;
      }),
    )
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
buildComponents = function (done) {
  const tasks = components.map((name) => {
    log(`generated task: buildComponents->${name}.js`);
    return () =>
      src([
        ...["dev", "util", "timer", "doc", "dom"].map((d) => `src/${d}.js`),
        `${dirs.tmp}/colors.js`,
        `${dirs.tmp}/${name}.js`,
      ])
        .pipe(concat(`${name}.js`))
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
  const tasks = notifiers.map((label) => {
    let name = `${label}-notifier.js`;
    log(`generated task: buildNotifiers->${name}`);
    return () =>
      src([`${dirs.build}/status-notifier.js`, `${dirs.src}/${name}`])
        .pipe(concat(name))
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
    ...sources.map((f) => `${dirs.src}/${f}.js`),
    `${dirs.tmp}/colors.js`,
    ...components.map((f) => `${dirs.tmp}/${f}.js`),
    ...notifiers.map((f) => `${dirs.src}/${f}-notifier.js`),
    `${dirs.src}/exporter.js`,
    `${dirs.src}/runner.js`,
  ])
    .pipe(concat("audible-exporter.js"))
    .pipe(dest(dirs.build));
});

task("dom", series("inject-css", buildComponents));
task("notifiers", series("dom", buildNotifiers));
task("exporter", series("inject-css", "audible-exporter"));
task("default", parallel("dom", "notifiers", "exporter"));
