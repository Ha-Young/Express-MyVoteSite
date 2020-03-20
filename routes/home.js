const express = require('express');
const router = express.Router();
const authorization = require('../middlewares/auth');
const controller = require('../controllers/home.Controller');

router.get('/', controller.renderHome);

router.get('/login', controller.renderLogin);

router.get('/logout', controller.renderLogOut);

router.get('/join', controller.renderJoin);

router.post('/login', controller.handleLogin);

router.post('/join', controller.handleJoin); //유효성은 미들웨어만들어서 넣자

module.exports = router;
