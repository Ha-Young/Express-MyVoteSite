const express = require('express');

const homeControllers = require('../controllers/home.controllers');
const checkAuthentication = require('../middlewares/authenticate');

const router = express.Router();

router.get('/', checkAuthentication, homeControllers.renderVotes);

module.exports = router;