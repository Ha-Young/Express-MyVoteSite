module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    mocha: true,
  },
  extends: [
    "airbnb-base",
    "eslint:recommended",
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    indent: ["error", 2, { SwitchCase: 1 }],
    "no-plusplus": "off",
    "comma-dangle": ["error", "always-multiline"],
    "no-unused-vars": ["warn", { argsIgnorePattern: "err|req|res|next|val" }],
    "quote-props": ["error", "as-needed"],
    "func-names": "off",
    "consistent-return": "off",
    "no-underscore-dangle": "off",
    "no-shadow": "off",
    "object-curly-spacing": ["error", "always", {
      arraysInObjects: false,
      objectsInObjects: false,
    }],
    "no-restricted-syntax": ["off", "ForOfStatement"],
    "no-use-before-define": ["error", { functions: false }],
    "no-await-in-loop": "off",
    "import/no-unresolved": "off",
    "no-param-reassign": ["error", { props: false, ignorePropertyModificationsForRegex: ["^err"]}],
  },
};
