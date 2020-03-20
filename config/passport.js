const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const createError = require('http-errors');
const User = require('../models/user');

const initialize = (passport) => {
  try {
    const authenticateUser = async (email, password, done) => {
      const user = await User.findOne( { email });
      if (!user) { 
        return done(createError(404, "The user does not exist"), false);
      }
  
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(createError(401, "You have entered an invalid password"), false);
      }
    }; 
  
    passport.use(new LocalStrategy({ usernameField: 'email'}, 
      authenticateUser));
  
    passport.serializeUser((user, done) => {
      done(null, user.id);
    });
  
    passport.deserializeUser(async (id, done) => {
      const user = await User.findById(id);
      done(null, user);
    });
  } catch(e) {
    next(e);
  }
};

module.exports = initialize;
