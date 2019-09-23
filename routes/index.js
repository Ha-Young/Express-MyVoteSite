const express = require('express');
const router = express.Router();
const User = require('../models/User');
const crypto = require('crypto');
const { validateUser } = require('./middleware/validation');

router.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.get('/join', (req, res, next) => {
  const errorMessage = req.flash('errorMessage')[0] || null;
  res.render('join', { errorMessage });
});

router.post('/join', validateUser, async (req, res, next) => {
  try {
    const {
      email,
      name,
      password
    } = req.body;

    const salt = crypto.randomBytes(8).toString('hex').slice(0, 16);
    const hashPassword = (salt) => crypto.createHash('sha512').update(password + salt).digest('hex');

    await new User({
      email,
      name,
      password: hashPassword(salt),
      salt
    }).save();

    return res.redirect("/login");
  } catch (err) {
    console.error(err);

    const dbValidationError = err.errors.name || err.errors.password || err.errors.email;

    if (dbValidationError) {
      req.flash('errorMessage', dbValidationError.message);
    }

    return res.redirect("/join");
  }
});

module.exports = router;
