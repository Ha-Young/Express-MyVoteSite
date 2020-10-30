const express = require('express');
const globalRouter = express.Router();
const { validateSignup } = require('../middlewares/validateSignup');
const useController = require('../controllers/userController');
const votingsController = require('../controllers/votingsController');
const routes = require('../constants/routes');

globalRouter.get(routes.home, votingsController.getAllVotings);

globalRouter.get(routes.signup, useController.getSignUp);
globalRouter.post(routes.signup, validateSignup, useController.postSignUp);

globalRouter.get(routes.login, useController.getLogin);
globalRouter.post(routes.login, useController.postLogin);

globalRouter.get(routes.logout, useController.logout);

module.exports = globalRouter;
