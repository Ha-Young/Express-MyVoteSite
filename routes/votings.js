const express = require('express');
const votingsController = require('./controllers/votings.controller');
const verifyUser = require('../routes/middlewares/authorization').verifyUser;

const ROUTE_VOTINGS = require('../config/constants').ROUTE_VOTINGS;
const router = express.Router();

router.get(ROUTE_VOTINGS.NEW, verifyUser, votingsController.getNewVote);
router.post(ROUTE_VOTINGS.NEW, verifyUser, votingsController.postNewVote);
router.get(ROUTE_VOTINGS.ID, votingsController.getVote);
router.put(ROUTE_VOTINGS.ID, verifyUser, votingsController.postVote);
router.delete(ROUTE_VOTINGS.DELETE, verifyUser, votingsController.deleteVote);

module.exports = router;
