const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  passport.use(new localStrategy({
    usernameField: 'email',
    passwordField: 'password',
  }, async (email, password, done) => {
    try {
      const existedUser = await User.findOne({ email: email });
      if (existedUser) {
        const result = await bcrypt.compare(password, existedUser.password);
        if (!result) {
          return done(null, false, { message: '비밀번호가 일치하지 않습니다. 다시 확인해주세요.' });
        }
        return done(null, existedUser);
      }
      return done(null, false, { message: '존재하지 않는 사용자입니다. 다시 확인해주세요.' });
    } catch (error) {
      return done(error);
    }
  }));
};
