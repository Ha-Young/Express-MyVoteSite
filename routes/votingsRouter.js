const express = require('express');
const votingRouter = express.Router();
const votingsController = require('../controllers/votingsController');
const routes = require('../constants/routes');

votingRouter.get(routes.votingDetail, votingsController.votingDetail);


votingRouter.get(routes.new, votingsController.newVoting);
votingRouter.post(routes.new, votingsController.createNewVoting);

votingRouter.get(routes.success, votingsController.getSuccess);
votingRouter.get(routes.failure, votingsController.getFailure);

module.exports = votingRouter;
