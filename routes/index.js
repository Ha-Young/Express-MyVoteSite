const express = require('express');
const mainController = require('./controllers/main.controller');
const verifyUser = require('../routes/middlewares/authorization').verifyUser;

const ROUTE_MAIN = require('../config/constants').ROUTE_MAIN;
const router = express.Router();

router.get(ROUTE_MAIN.HOME, mainController.renderAllVotings);
router.get(ROUTE_MAIN.MY_VOTINGS, verifyUser, mainController.renderMyVotings);

module.exports = router;
