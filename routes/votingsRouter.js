const express = require('express');
const votingsRouter = express.Router();
const routes = require('../constants/routes');
const { requiresLogin } = require('../middlewares/requiresLogin');
const votingsController = require('../controllers/votingsController');


votingsRouter.get(routes.new, requiresLogin, votingsController.newVoting);
votingsRouter.post(routes.new, votingsController.createNewVoting);

votingsRouter.get(routes.success, votingsController.getSuccess);
votingsRouter.get(routes.failure, votingsController.getFailure);

votingsRouter.get(routes.votingDetail, votingsController.getVotingDetail);
votingsRouter.put(routes.votingDetail, requiresLogin, votingsController.updateVotingDetail);
votingsRouter.delete(routes.votingDetail, votingsController.deleteVotingDetail);

module.exports = votingsRouter;
