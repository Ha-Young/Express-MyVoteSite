/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/
const express = require('express');
const router = express.Router();

router.get('/', function(req, res, _next) {
  res.render('index', { title: 'Sign up' });
});

module.exports = router;
