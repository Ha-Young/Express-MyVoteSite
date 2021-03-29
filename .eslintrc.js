module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  allowNamedFunctions: true,
  ignorePatterns: 'node_modules/',
  rules: {
    indent: [
      'error',
      2,
    ],
  },
};
