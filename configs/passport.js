const passport = require('passport');
const createError = require('http-errors');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const User = require('../models/User');

const passportConfig = (req, res, next) => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new LocalStrategy({ usernameField: 'email', passwordField: 'password' }, async (formEmail, formPassword, done) => {
      try {
        const checkUser = await User.findOne({ email: formEmail });
        if (!checkUser) {
          return next(createError(500, '아이디 또는 비밀번호를 확인해주세요.'));
        }

        const isCorrectPassword = bcrypt.compareSync(formPassword, checkUser.hash, (err, result) => result);
        const user = { id: checkUser._id, name: checkUser.name, email: checkUser.email };
        if (isCorrectPassword) {
          done(null, user);
        } else {
          // 에러로 넘기지말고 렌더처리해주기
          return next(createError(500, '아이디 또는 비밀번호를 확인해주세요.'));
        }
      } catch (error) {
        next(error);
      }
    })
  );
  next();
};

module.exports = passportConfig;
