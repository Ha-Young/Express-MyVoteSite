const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserService = require('../services/UserService');

module.exports = () => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    session: true,
    passReqToCallback: false,
  }, UserService.login));

  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (userId, done) => {
    try {
      await UserService.find(userId, done);
    } catch (error) {
      
    }
  });
};
