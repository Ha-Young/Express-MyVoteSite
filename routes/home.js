const express = require('express');
const router = express.Router();

const homeController = require('../routes/controllers/home.controller');

router.get('/', homeController.getVotings);

module.exports = router;
