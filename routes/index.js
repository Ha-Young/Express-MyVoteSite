const express = require('express');

const home = require('./home');
const notFound = require('./notFound');
const errorHandler = require('./errorHandler');

const router = express.Router();

router.use('/', home);

router.use(notFound);
router.use(errorHandler);

module.exports = router;
