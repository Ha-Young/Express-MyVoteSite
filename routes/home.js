const express = require('express');
const homeController = require('../controller/home.controller');

const router = express.Router();

router.get('/signup', homeController.signup);
router.post('/signup', homeController.result);
router.get('/login', homeController.login);

module.exports = router;
