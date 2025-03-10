const babel = require("gulp-babel");
const browserify = require("gulp-browserify");
const concat = require("gulp-concat");
const rename = require("gulp-rename");
const replace = require("gulp-replace");
const using = require("gulp-using");

const { src, dest, task, series, parallel, done } = require("gulp");

const fs = require("fs");
const glob = require("glob").sync;

let log = console.log;

let dirs = {
  src: "src",
  build: "build",
  tmp: "build/tmp",
  dist: "dist",
};

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
 * Compile all Javascript source code with babel for backwards compatibility
 * and save to build/.
 */
task("babel", () => {
  return src([`${dirs.src}/*.js`, `${dirs.tmp}/style.js`])
    .pipe(using({}))
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(replace('"use strict";', (_) => ""))
    .pipe(replace("CONSOLE_OUTPUT = false", (_) => "CONSOLE_OUTPUT = true"))
    .pipe(dest(dirs.build))
});

/**
 * Generate standalone modals and notifiers using browserify and save to dist/.
 */
task("dom", () => {
  return src([
    `${dirs.build}/*-modal.js`,
    `${dirs.build}/*-notifier.js`,
  ])
    .pipe(using({}))
    .pipe(browserify({}))
    .pipe(dest(dirs.dist));
});

/**
 * Generate single-file audible-exporter.js using browserify and save to build/tmp/.
 */
task("bundle", () => {
  return src(`${dirs.build}/exporter.js`)
    .pipe(using({}))
    .pipe(browserify({}))
    .pipe(replace(/$/, () => "\n"))
    .pipe(rename("audible-exporter.js"))
    .pipe(dest(dirs.tmp));
});

/**
 * Add the two line runner script at the end and save to dist/.
 */
task("final", () => {
  return src([`${dirs.tmp}/audible-exporter.js`, `${dirs.src}/runner.js`])
    .pipe(using({}))
    .pipe(concat("audible-exporter.js"))
    .pipe(dest(dirs.dist))
});

task("components", series("style", "babel", "dom"));
task("exporter", series("style", "babel", "bundle", "final"));
task("default", parallel("components", "exporter"));
