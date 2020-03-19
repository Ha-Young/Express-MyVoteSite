const express = require('express');

const authControllers = require('../controllers/auth.controllers');

const router = express.Router();

router.get('/login', (req, res) => res.render('login', { message: req.flash('errorMessage') }));

router.post('/login', authControllers.login);

router.get('/logout', authControllers.logout);

module.exports = router;
