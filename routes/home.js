const express = require('express');
const router = express.Router();

const homeController = require('../routes/controllers/home.controller');

/* GET home page. */
router.get('/', homeController.renderHome);

module.exports = router;
