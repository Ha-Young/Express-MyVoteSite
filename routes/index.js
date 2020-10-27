const express = require('express');
const mainController = require('./controllers/main.controller');

const verifyUser = require('../routes/middlewares/authorization').verifyUser;

const router = express.Router();

router.get('/', mainController.getVotings);
router.get('/my-votings', verifyUser, mainController.getMyVotings);

module.exports = router;
