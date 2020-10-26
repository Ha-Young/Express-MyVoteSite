const express = require('express');
const router = express.Router();

exports.renderSignup = (req, res, next) => {
  res.render('signup');
};

exports.getInfo = (req, res, next) => {
  const { body: { name, email, password } } = req;
  console.log(email, name, password );
  res.redirect('/login');
};

