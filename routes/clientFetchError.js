const express = require('express');
const router = express.Router();
const createError = require('http-errors');

router.get('/', (req, res, next) => {
  throw(createError(400, "Please try again"));
});

module.exports = router;
