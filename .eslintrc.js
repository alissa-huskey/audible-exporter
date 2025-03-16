const prettier = require("eslint-plugin-prettier/recommended");

module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:eslint-plugin-prettier/recommended"],
  parserOptions: {
    ecmaVersion: 15,
  },
  rules: {
    "no-unused-vars": "off",
    "no-undef": "off",
    "no-unused-private-class-members": "off",
  },
  ignorePatterns: ["tests/**/*.testcafe.js", "build/**", "tmp/**", "dist/**"],
};
