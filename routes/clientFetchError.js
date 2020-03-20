const express = require('express');
const createError = require('http-errors');
const router = express.Router();

router.get('/', () => {
  throw(createError(500, "Internal Error, Please try again"));
});

module.exports = router;
