const express = require('express');

const checkExpiration = require('../middlewares/checkExpiration');
const homeControllers = require('../controllers/home.controllers');

const router = express.Router();

router.get('/', checkExpiration, homeControllers.renderVotes);

module.exports = router;
