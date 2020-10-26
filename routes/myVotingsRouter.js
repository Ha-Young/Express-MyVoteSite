const express = require('express');
const myVotingsRouter = express.Router();
const routers = require('../constants/routes');

/* GET users listing. */
myVotingsRouter.get(routers.myVotings, function (req, res, next) {
  res.send('respond with a resource');
});

module.exports = myVotingsRouter;
