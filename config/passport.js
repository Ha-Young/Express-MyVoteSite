const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

// req.session 객체에 어떤데이터를 저장할지.
passport.serializeUser((user, done) => {
  done(null, user.email);
});

// 사용자 정보 조회 조회한 정보를 req.user에 저장
passport.deserializeUser((email, done) => {
  User.findOne({ email })
      .then(user => {
        console.log('deserializeUser');
        done(null, user);
      })
      .catch(err => done(err));
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
    console.error(error);
    done(error);
  }
}));
