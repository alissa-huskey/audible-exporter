/*
 * Gulp taskfile.
 */

/* eslint-disable prettier/prettier */

var fs      = require("fs"),
    path    = require("path"),
    Tree    = require("dependency-tree");

var babel   = require("gulp-babel"),
    clean   = require("gulp-clean"),
    concat  = require("gulp-concat"),
    rename  = require("gulp-rename"),
    replace = require("gulp-replace"),
    through = require("gulp-through2"),
    using   = require("gulp-using");

var {
  src,
  dest,
  task,
  series,
  parallel,
  done
}           = require("gulp");

/* GLOBAL VARIABLES
 ******************************************************************************/

var log = console.log;

var dirs = {
  src    : "src",               // source code
  build  : "build",             // root build directory
  prep   : "build/prepped",     // injected source code
  dev    : "build/dev",         // bundled files testing
  dist   : "dist",              // for release
};

/* eslint-enable prettier/prettier */

/* PLUGINS
 ******************************************************************************/

/*
 * Plugin to replace a pattern in a file with the contents of another file.
 *
 * @param {string, regex}  pattern       The pattern to search for.
 * @param {string, object, array} file_pattern  A string of the file to replace with
 *                                       or an object containing any of the
 *                                       following keys:
 *
 *                                       dirname, prefix, stem, suffix, extname
 *
 */
var inject = (pattern, file_pattern) =>
  through((content, file) => {
    if (typeof file_pattern == "string") {
      source = file_pattern;
    } else {
      filename = [
        file_pattern.prefix || "",
        file_pattern.stem || file.stem,
        file_pattern.suffix || "",
        file_pattern.extname || file.extname,
      ].join("");

      source = path.join(file_pattern.dirname || file.dirname, filename);
    }

    replacement = fs.readFileSync(source);
    text = content.replace(pattern, `\n${replacement}`);
    return text;
  });

/**
 * Plugin to bundle all files the dependency tree of a given entry point into
 * one file.
 */
var bundle = (directory = null) =>
  through((content, file) => {
    let tree = Tree.toList({
      filename: file.path,
      directory: directory || file.dirname,
    });

    let js = tree.reduce((text, fn) => text + fs.readFileSync(fn), "");

    js = js.replace(/require\(["'].+['"]\)[;]?\s*\n/g, "");

    return js;
  });

/* TASKS
 ******************************************************************************/

/**
 * No-op to make sure the gulpfile has no errors.
 */
task("ok", (done) => {
  done();
});

/**
 * Remove the build directory.
 */
task("clean", () => {
  return src(dirs.build).pipe(clean());
});

/**
 * Copy all javascript source code to the prep directory.
 */
task("copy", () => {
  return src([`${dirs.src}/**/*.js`])
    .pipe(using())
    .pipe(dest(dirs.prep));
});

/**
 * Concatenate all CSS source code into style.css.
 */
task("style.css", (cb) => {
  return src(`${dirs.src}/css/*.css`)
    .pipe(using({}))
    .pipe(concat("style.css"))
    .pipe(dest(dirs.prep));
});

/**
 * Inject the contents of style.css into style.js.
 */
task("style.js", (cb) => {
  return src([`${dirs.src}/ui/style.js`])
    .pipe(using({}))
    .pipe(inject(/\s*\/\* CSS_MARKER \*\/\n/, `${dirs.prep}/style.css`))
    .pipe(dest(`${dirs.prep}/ui`));
});

/**
 * Bundle all modals and notifiers into a single flat file each
 * and save them in build/dev/.
 */
task("ui", () => {
  return src([`${dirs.prep}/ui/*-modal.js`, `${dirs.prep}/ui/*-notifier.js`])
    .pipe(using({}))
    .pipe(bundle())
    .pipe(dest(`${dirs.dev}/ui`));
});

/**
 * Bundle exporter and save in build/dev/.
 */
task("exporter.js", () => {
  return src([`${dirs.prep}/ui/exporter.js`])
    .pipe(using({}))
    .pipe(bundle())
    .pipe(dest(dirs.dev));
});

/**
 * Add the two line runner script at the end and save to
 * build/dev/audible-exporter.js.
 */
task("audible-exporter.js", () => {
  return src([`${dirs.dev}/exporter.js`, `${dirs.prep}/ui/runner.js`])
    .pipe(using({}))
    .pipe(concat("audible-exporter.js"))
    .pipe(replace("CONSOLE_OUTPUT = false", (_) => "CONSOLE_OUTPUT = true"))
    .pipe(replace("info = function", (_) => "var info = function"))
    .pipe(replace("error = function", (_) => "var error = function"))
    .pipe(dest(dirs.dev))
    .pipe(dest(dirs.dist));
});

/**
 * Compile with babel then save to dist/audible-exporter.js.
 */
task("babel", () => {
  let res = src([`${dirs.dist}/audible-exporter.js`])
    .pipe(using({}))
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(replace('"use strict";', (_) => ""))
    .pipe(dest(dirs.build));

  return res;
});

/**
 * Prefix with minified core-js and save to dist/audible-exporter.js.
 */
task("corejs", () => {
  let res = src([
    "node_modules/core-js-bundle/minified.js",
    `${dirs.build}/audible-exporter.js`,
  ])
    .pipe(using({}))
    .pipe(concat("audible-exporter-compat.js"))
    .pipe(dest(dirs.dist));

  return res;
});

/*
 * Generate the scripts to use in testcafe integration testing.
 */
task("index.html", () => {
  return src(`${dirs.src}/index.html`).pipe(using({})).pipe(dest(dirs.dev));
});

/*
 * Generate the scripts to use in testcafe integration testing.
 */
task("_test-scripts", () => {
  return src([
    `${dirs.dev}/*-modal.js`,
    `${dirs.dev}/*-notifier.js`,
    `${dirs.dev}/audible-exporter.js`,
  ])
    .pipe(using({}))
    .pipe(inject(/$/, { dirname: "tests/integration/runners" }))
    .pipe(
      replace(
        /^/,
        (_) => "\nwindow.addEventListener('DOMContentLoaded', function () {\n",
      ),
    )
    .pipe(replace(/$/, (_) => "\n});"))
    .pipe(dest("build/test-scripts"));
});

task(
  "dev",
  series("copy", "index.html", "style.css", "style.js", "ui", "exporter.js"),
);
task("exporter", series("dev", "audible-exporter.js"));
task("compat", series("exporter", "babel", "corejs"));
task("test-scripts", series("dev", "exporter", "_test-scripts"));
task("default", parallel("test-scripts", "exporter", "compat"));
