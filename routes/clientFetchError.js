const express = require('express');
const router = express.Router();
const createError = require('http-errors');

router.get('/', () => {
  throw(createError(500, "Internal Error, Please try again"));
});

module.exports = router;
