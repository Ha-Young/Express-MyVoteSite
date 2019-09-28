const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return done(new Error('가입되지 않은 회원입니다.'));
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password'
},
async (email, password, done) => {
  try {
    const user = await User.findOne({ email });

    if (user) {
      bcrypt.compare(password, user.password, (err, res) => {
        if(res) return done(null, user);

        done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
      });
    } else {
      done(null, false, { message: '가입되지 않은 회원입니다.' });
    }
  } catch (error) {
    done(error);
  }
}));
