Development
===========

Tools
-----

| Task              | Tool                | Command                                                   | Config         |
|-------------------|---------------------|-----------------------------------------------------------|----------------|
| Environment       | [Node.js][]         |                                                           | `package.json` |
| Lint              | [ESLint][]          | `npm lint`                                                | `.eslintrc.js` |
| Format            | [Prettier][]        | `prettier --check src`                                    | `.eslintrc.js` |
| Unit Tests        | [Jest][]            | `npm test`                                                | `package.json` |
| Build             | [Gulp][]            | `gulp`                                                    | `gulpfile.js`  |
| Compile           | [Babel][]           |                                                           |                |
| Package Manager   | [npm][]             |                                                           |                |
| Bundle            | [dependency-tree][] | `gulp bundles`, `dependency-tree -d src --list-form FILE` |                |

[Node.js]: https://nodejs.org/
[ESLint]: https://eslint.org/
[Prettier]: https://prettier.io/
[Jest]: https://jestjs.io/
[Gulp]: https://gulpjs.com/docs/en/getting-started/quick-start
[Babel]: https://babeljs.io/
[npm]: https://www.npmjs.com/
[dependency-tree]: https://github.com/dependents/node-dependency-tree

Build
-----

CSS, stored in `src/css`, is bundled in the file `build/prep/style.css` then
added to Javascript. It is in injected into the DOM at runtime.

Javascript, stored in `src`, is bundled into flat files by following the
`require()` statements and CSS is added.

| Gulp Task      | Location             | Description                                                        |
|----------------|----------------------|--------------------------------------------------------------------|
| `dev`          | `build/dev`          | bundled component files that can be tested individually in browser |
| `prep`         | `build/prepped`      | source files with CSS added into JS                                |
| `dist`         | `dist`               | release files                                                      |

Architecture
------------

Core components:

| Component    | Description                                                         |
|--------------|---------------------------------------------------------------------|
| Fetcher      | Collection of pages.                                                |
| Doc          | HTMLElement wrapper with helpers.                                   |
| Parser       | Document to be parsed.                                              |
| Page         | Page on audible.com to be parsed or contains elements to be parsed. |
| Notifier     | Status/progress bar DOM element.                                    |
| Dialog       | Modal dialog box DOM element.                                       |
| Row          | Row element on a audible.com page.                                  |
| Virtual File | Blob file for download.                                             |
| Exporter     | UI to open dialogs, display notifiers, and produce download file.   |

Coding Style
------------

| What       | Standard                                         |
|------------|--------------------------------------------------|
| JavaScript | [ESLint Recommended][], [Prettier Recommended][] |
| Docs       | [WordPress JavaScript Documentation Standards][] |

[ESLint Recommended]: https://eslint.org/docs/latest/rules/
[Prettier Recommended]: https://github.com/prettier/eslint-plugin-prettier
[WordPress JavaScript Documentation Standards]: https://developer.wordpress.org/coding-standards/inline-documentation-standards/javascript/
