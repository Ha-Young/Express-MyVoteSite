const router = require('express').Router();
const { saveSession } = require('./middlewares/auth');
const email = require('email-validator');
const User = require('../models/User');

router.get('/', (req, res, next) => {
  res.render('signup/signup', { title: 'Please signup!' });
});

router.post('/', async (req, res, next) => {
  try {
    if (!email.validate(req.body.email)) {
      res.redirect('/signup/invalidEmail');
    }
    if (req.body.password !== req.body.confirmPassword) {
      res.redirect('/signup/invalidPassword');
    }

    const user = await User.findOne({ email: req.body.email });
    if (user) {
      res.status(400).send({ error: 'existing email' });
    } else {
      const newUser = new User({
        email: req.body.email,
        password: req.body.password
      });
      await newUser.save();
      saveSession(null, newUser, req, res, next);
      res.redirect('/signup/complete');
    }
  } catch(err) {
    next(err);
  }
});

router.get('/complete', (req, res, next) => {
  res.status(201).render('signup/complete', { title: 'signup complete!!' });
});

router.get('/invalidEmail', (req, res, next) => {
  res.send('invaild email');
});

router.get('/invalidPassword', (req, res, next) => {
  res.send('invalid password');
});

module.exports = router;

// signup
// - /signup
// - /signup/complete
// - /signup/invalidmail
// - /signup/invalidpass 
