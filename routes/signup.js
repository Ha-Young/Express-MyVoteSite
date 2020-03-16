const express = require('express');
const router = express.Router();
const createError = require('http-errors')
const User = require('../models/user');
const bcrypt = require('bcrypt');

const regPatterns = {
  email: /^[a-z\d]+@[a-z]{4,8}\.[a-z]{2,5}$/,
  password: /^[a-z\d]{8,20}$/,
};


router.get('/', (req, res, next) => {
  res.render('signup');
});


const validateSignupInput = async (req, res, next) => {
  try {
    if (!regPatterns.email.test(req.body.email)) {
      throw(createError(422, "The email address is not acceptable "));
    }

    const password = req.body.password;
    if (!regPatterns.password.test(password)) {
      throw(createError(422, "The password is not acceptable "));
    }

    if (password !== req.body.confirmPassword) {
      throw(createError(422, "Please confirm your password"));
    }

    next();
  } catch(e) {
    next(e)
  }
};

const validateDuplication = async (req,res, next) => {
  try {
    const { email }  = req.body;
    const user = await User.findOne({ email });
    console.log(user)
    if (user) {
      throw(createError(409, "The email already exists"));
    }

    const password = await bcrypt.hash(req.body.password, 10);
    const newUser = await new User({ email, password }).save();
    console.log(newUser);
  } catch(e) {
    next(e);
  }

};


router.post('/', validateSignupInput, validateDuplication, (req, res, next) => {
  console.log(req.body)
});

module.exports = router;