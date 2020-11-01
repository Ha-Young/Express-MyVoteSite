const express = require('express');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const User = require('../models/User');

const { renderSignup, redirectBackpageOrHome } = require('./controller/signup.controller');

router.get('/', renderSignup);

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
],
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        throw new Error('Not Valid');
      }

      await redirectBackpageOrHome(req, res, next);
    } catch (err) {
      return next(err);
    }
  }

);

module.exports = router;
