const express = require('express');

const loginControllers = require('../controllers/login.controllers');

const router = express.Router();

router.get('/', (req, res) => res.render('login'));

router.post('/', loginControllers.processLogin);

module.exports = router;
