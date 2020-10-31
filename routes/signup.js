const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../models/User');

router.get('/', (req, res, next) => {
  try {
    res.render('signup');
  } catch (err) {
    next(err);
  }
});

router.post('/', [
  body('email').isEmail(),
  body('password')
    .trim()
    .isLength({ min: 6, max: 12 })
    .withMessage('Password must be between 6 to 12 characters'),
  body('confirm-password')
    .custom((confirmPassword, { req }) => {
      if (confirmPassword !== req.body.password) {
        throw new Error('Password confitmation does not match password');
      }
      return true;
    })
], async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      throw new Error('Not Valid');
    }

    const newUserDataSavedInDB = await User.create({
      email: req.body.email,
      password: req.body.password
    });

    if (req.session.backpageUrl === `http://localhost:3000/votings/${req.session.lastVisitedVoteId}`)
      if (newUserDataSavedInDB) {
        req.flash('email', newUserDataSavedInDB.email);
        res.redirect('/login');
      } else {
        next();
      }
    else {
      res.redirect('/');
    }
  } catch (err) {
    return next(err);
  }
});

module.exports = router;
