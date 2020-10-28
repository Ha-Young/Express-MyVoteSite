const express = require('express');
const votingsRouter = express.Router();
const votingsController = require('../controllers/votingsController');
const routes = require('../constants/routes');


votingsRouter.get(routes.new, votingsController.newVoting);
votingsRouter.post(routes.new, votingsController.createNewVoting);

votingsRouter.get(routes.success, votingsController.getSuccess);
votingsRouter.get(routes.failure, votingsController.getFailure);

votingsRouter.get(routes.votingDetail, votingsController.getVotingDetail);
votingsRouter.put(routes.votingDetail, votingsController.updateVotingDetail);
votingsRouter.delete(routes.votingDetail, votingsController.deleteVotingDetail);

module.exports = votingsRouter;
