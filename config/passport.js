const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const User = require('../models/user');

const initialize = (passport) => {
  const authenticateUser = async (email, password, done) => {
    const user = await User.findOne( { email });
    console.log(user);
    if (!user) {
      return done(null, false, { message: 'that email is not registered' } );
    }

    if (await bcrypt.compare(password, user.password)) {
      console.log(2222222222222)
      return done(null, user);
    } else {
      return done(null, false, { message: 'Password incorrect' });
    }
  }; 

  passport.use(new LocalStrategy({ usernameField: 'email'}, 
    authenticateUser));

  passport.serializeUser((user, done) => {
    console.log('serial')
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log('deserial')
    const user = await User.findById(id);
    done(null, user);
  });
};

module.exports = initialize;