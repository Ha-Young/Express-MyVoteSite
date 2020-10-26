const express = require('express');
const votingRouter = express.Router();
const votingsController = require('../controllers/votingsController');
const routes = require('../constants/routes');

votingRouter.get(routes.new, votingsController.newVote);
votingRouter.post(routes.new, votingsController.createNewVote);

module.exports = votingRouter;
