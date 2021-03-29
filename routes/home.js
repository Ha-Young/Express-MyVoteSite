const express = require('express');
const homeController = require('../controller/home.controller');

const router = express.Router();

router.get('/', homeController.getMain);
router.get('/signup', homeController.signup);
router.post('/signup', homeController.post);
router.get('/login', homeController.login);
router.get('/login', homeController.login);

module.exports = router;
