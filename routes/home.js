const express = require('express');
const router = express.Router();
const homeController = require('../controller/home.controller');

router.get('/signup', homeController.signup);
router.post('/signup', homeController.result);
router.get('/login', homeController.login);

module.exports = router;
