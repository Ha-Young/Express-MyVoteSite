const express = require('express');
const router = express.Router();
const errorController = require('../controllers/error.controller');

router.get('/:status', errorController.renderErrorPage);

module.exports = router;
