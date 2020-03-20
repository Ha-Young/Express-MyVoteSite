const express = require('express');

function authenticateUser (req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(301).redirect('/login');
  }
};

exports.authenticateUser = authenticateUser;
