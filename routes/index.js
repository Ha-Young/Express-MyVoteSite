const express = require('express');
const router = express.Router();

const renderHome = require('./controller/home.controller');

router.get('/', renderHome);

module.exports = router;
