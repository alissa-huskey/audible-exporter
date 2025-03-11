const babel = require("gulp-babel");
const concat = require("gulp-concat");
const esbuild = require('gulp-esbuild')
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
  comp: "build/components",
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
    .pipe(dest(dirs.build));
});

/**
 * Compile all Javascript source code with babel for backwards compatibility
 * and save to build/.
 *
 * Out of date and not currently used.
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
 * Copy all javascript to the build directory.
 */
task("copy", () => {
  return src(`${dirs.src}/*.js`)
    .pipe(dest(dirs.build));
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
    .pipe(esbuild({bundle: true}))
    .pipe(dest(dirs.comp));
});

/**
 * Generate single-file audible-exporter.js using browserify and save to build/.
 */
task("bundle", () => {
  return src(`${dirs.build}/exporter.js`)
    .pipe(using({}))
    .pipe(esbuild({bundle: true}))
    // .pipe(replace(/$/, () => "\n"))
    .pipe(rename("audible-exporter.js"))
    .pipe(dest(dirs.build));
});

/**
 * Add the two line runner script at the end and save to dist/.
 */
task("final", () => {
  return src([`${dirs.build}/audible-exporter.js`, `${dirs.src}/runner.js`])
    .pipe(using({}))
    .pipe(concat("audible-exporter.js"))
    .pipe(replace("CONSOLE_OUTPUT = false", (_) => "CONSOLE_OUTPUT = true"))
    .pipe(dest(dirs.dist))
});

task("components", series("copy", "style", "dom"));
task("exporter", series("copy", "style", "bundle", "final"));
task("default", parallel("components", "exporter"));
