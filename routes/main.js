const express = require('express');
const mainController = require('../controller/main.controller');

const router = express.Router();

router.get('/', mainController.getMain);

module.exports = router;
