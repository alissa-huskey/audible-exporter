var fs      = require("fs"),
    path    = require("path"),
    Tree    = require("dependency-tree");

var clean   = require("gulp-clean"),
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
var inject = (pattern, file_pattern) => through(
  (content, file) => {
    if (typeof file_pattern == "string") {
      source = file_pattern;
    } else {
      filename = [
        file_pattern.prefix || "",
        file_pattern.stem || file.stem,
        file_pattern.suffix || "",
        file_pattern.extname || file.extname,
      ].join("");

      source = path.join(
        file_pattern.dirname || file.dirname,
        filename,
      );
    }

    replacement = fs.readFileSync(source);
    text = content.replace(pattern, `\n${replacement}`);
    return text;
  },
);

/**
 * Plugin to bundle all files the dependency tree of a given entry point into
 * one file.
 */
var bundle = () => through(
  (content, file) => {
    let tree = Tree.toList({
      filename: file.path,
      directory: file.dirname,
    });

    let js = tree.reduce(
      (text, fn) => text + fs.readFileSync(fn),
      ""
    );

    return js;
  },
);

/* TASKS
 ******************************************************************************/

/**
 * No-op to make sure the gulpfile has no errors.
 */
task("ok", (done) => { done(); });

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
  return src(`${dirs.src}/*.js`)
    .pipe(using())
    .pipe(dest(dirs.prep));
});

/**
 * Concatenate all CSS source code into style.css.
 */
task("style.css", (cb) => {
  return src(`${dirs.src}/*.css`)
    .pipe(using({}))
    .pipe(concat("style.css"))
    .pipe(dest(dirs.prep));
});

/**
 * Inject the contents of style.css into style.js.
 */
task("style.js", (cb) => {
  return src([`${dirs.src}/style.js`])
    .pipe(using({}))
    .pipe(inject(/\s*\/\* CSS_MARKER \*\/\n/, `${dirs.prep}/style.css`))
    .pipe(dest(dirs.prep));
});

/**
 * Bundle all modals, notifiers, and the exporter into a single flat file each
 * and save them in build/dev/.
 */
task("bundles", () => {
  return src([
    `${dirs.prep}/*-modal.js`,
    `${dirs.prep}/*-notifier.js`,
    `${dirs.prep}/exporter.js`,
  ])
    .pipe(using({}))
    .pipe(bundle())
    .pipe(replace(/require\(["'].+['"]\)[;]?\s*\n/g, () => ""))
    .pipe(dest(dirs.dev));
});

/**
 * Add the two line runner script at the end and save to
 * dist/audible-exporter.js.
 */
task("audible-export.js", () => {
  return src([`${dirs.dev}/exporter.js`, `${dirs.prep}/runner.js`])
    .pipe(using({}))
    .pipe(concat("audible-exporter.js"))
    .pipe(replace("CONSOLE_OUTPUT = false", (_) => "CONSOLE_OUTPUT = true"))
    .pipe(dest(dirs.dev))
    .pipe(dest(dirs.dist))
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
    .pipe(inject(/$/, {dirname: "tests/integration/runners"}))
    .pipe(replace(/^/, (_) => "\nwindow.addEventListener('DOMContentLoaded', function () {\n"))
    .pipe(replace(/$/, (_) => "\n});"))
    .pipe(dest("build/test-scripts"));
});


task("dev", series("copy", "style.css", "style.js", "bundles"));
task("exporter", series("dev", "audible-export.js"));
task("test-scripts", series("dev", "exporter", "_test-scripts"));
task("default", parallel("dev", "exporter", "test-scripts"));
