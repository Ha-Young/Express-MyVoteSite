const express = require('express');
const myVotingsRouter = express.Router();
const myVotingsControllers = require('../controllers/myVotingsController');
const routers = require('../constants/routes');

myVotingsRouter.get(routers.home, myVotingsControllers.getMyVotings);

module.exports = myVotingsRouter;
