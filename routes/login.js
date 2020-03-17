const express = require('express');
const passport = require('passport');
const router = express.Router();

const loginControllers = require('./controllers/login.controllers');

router.get('/', (req, res, next) => res.render('login'));
router.post('/', loginControllers.authenticate);

module.exports = router;
