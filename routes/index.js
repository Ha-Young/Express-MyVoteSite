const express = require('express');
const router = express.Router();
const renderController = require('./controllers/index.controller');

router.get('/', renderController.renderIndex);

module.exports = router;
