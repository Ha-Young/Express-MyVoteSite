const express = require('express');
const homeController = require('../controllers/home.controller');
const router = express.Router();

/* GET home page. */
router.get('/', homeController.renderHome);

module.exports = router;
