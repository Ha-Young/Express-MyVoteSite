const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/User');

const router = express.Router();

router.get('/signup', function (req, res, next) {
  res.status(200).render('signup');
});

router.post('/signup', async function (req, res, next) {
  const {
    body: { email, password, passwordConfirmation, name }
  } = req;

  if (password !== passwordConfirmation || !name) {
    console.log('[/signup] check input value');
    return res.redirect('/auth/signup');
  }

  try {
    const user = await User.findOne({ email });

    if (user) {
      res.redirect('/auth/login');
    } else {
      const hash = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        email,
        hash,
        name
      });

      req.session.user = newUser;
      res.redirect('/');
    }
  } catch (error) {
    next(error);
  }
});

router.get('/login', function (req, res, next) {
  res.status(200).render('login');
});

router.post('/login', async function (req, res, next) {
  const {
    body: { email, password },
    cookies
  } = req;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.redirect('/');

    const isAuthorized = await bcrypt.compare(password, user.hash);
    if (!isAuthorized) return res.redirect('/auth/login');

    req.session.user = user;

    if (cookies['callback']) {
      return res.redirect(cookies['callback']);
    }
    res.redirect('/');
  } catch (error) {
    next(error);
  }
});

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
