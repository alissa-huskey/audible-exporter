/** @type {import('eslint').Linter.Config[]} */

import globals from "globals";
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier/recommended";

const files = ["src/**/*.js", "tests/**/*.js"];
prettier.files = files;

export default [
  prettier,
  {
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.browser,
    },
    files: files,
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "off",
      "no-undef": "off",
      "no-unused-private-class-members": "off",
    },
  },
];
