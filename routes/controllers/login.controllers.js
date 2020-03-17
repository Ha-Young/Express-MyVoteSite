// const createError = require('http-errors');
// const crypto = require('crypto');
const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;

// const User = require('../../models/User');

exports.authenticate = passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
});

// exports.validation = async (req, res, next) => {
//   const { email, password } = req.body;
//   console.log('validation')
//   // const findUser = await User.findOne({ email });
// }
