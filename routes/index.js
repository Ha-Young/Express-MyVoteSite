const express = require('express');
const renderController = require('./controllers/index.controller');
const rateLimit = require('./middlewares/blockToManyRequests');
const router = express.Router();

router.get('/', rateLimit.blockTooManyRequests, renderController.renderIndex);

module.exports = router;
