const express = require('express');
const myVotingsRouter = express.Router();
const { requiresLogin } = require('../middlewares/requiresLogin');
const myVotingsControllers = require('../controllers/myVotingsController');
const routers = require('../constants/routes');

myVotingsRouter.get(routers.home, requiresLogin, myVotingsControllers.getMyVotings);

module.exports = myVotingsRouter;
