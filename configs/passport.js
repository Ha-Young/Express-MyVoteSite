const passport = require('passport');
const createError = require('http-errors');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/User');
const indexController = require('../controllers/indexController');

const passportConfig = (req, res, next) => {
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
  passport.use(new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, indexController.localUserLogin));
  next();
};

module.exports = passportConfig;
