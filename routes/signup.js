const router = require('express').Router();
const { saveSession } = require('./middlewares/auth');
const email = require('email-validator');
const User = require('../models/User');
const renderMessage = require('../utils/renderMessage');

router.get('/', (req, res, next) => {
  renderMessage.signup(res, '');
});

router.post('/', async (req, res, next) => {
  try {
    if (!email.validate(req.body.email)) {
      renderMessage.signup(res, 'Invalid email');
    }
    if (req.body.password !== req.body.confirmPassword) {
      renderMessage.signup(res, 'Invalid password');
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      renderMessage.signup(res, 'Email already exists');
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });
      await newUser.save();
      saveSession(null, newUser, req, res, next);

      res.status(201).render('success', {
        title: 'Please Signup to Vote',
        message: 'Now you are signed-up!'
      });
    }
  } catch(err) {
    next(err);
  }
});

module.exports = router;
