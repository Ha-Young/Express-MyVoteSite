const express = require('express');
const router = express.Router();

const signupControllers = require('./controllers/signup.controllers');

router.get('/', (req, res) => res.render('signup', { user: req.user }));
router.post('/', signupControllers.validation);

module.exports = router;
