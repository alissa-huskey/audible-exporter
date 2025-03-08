/** @type {import('eslint').Linter.Config[]} */

import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";

export default [
  pluginJs.configs.recommended,
  eslintPluginPrettierRecommended,
  {
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.browser,
    },
    files: ["**/*.js"],
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
    },
  },
  {
    files: ["eslint.config.mjs"],
    rules: {
      "no-unused-vars": "off",
      "no-undef": "off",
    },
  },
];
