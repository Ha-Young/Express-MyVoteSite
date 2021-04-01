const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home.controller');
const { addUserInfo } = require('../middlewares/addUserInfo');

router.get('/', addUserInfo, homeController.getVotings);

module.exports = router;
