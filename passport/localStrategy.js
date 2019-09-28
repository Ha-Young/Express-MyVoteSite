const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = passport => {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  }, async (email, password, done) => {
    try {
      const exUser = await User.findOne({ email });

      if (exUser) {
        const match = await bcrypt.compare(password, exUser.password);

        if (match) {
          done(null, exUser);
        } else {
          done(null, false, {
            message: '비밀번호가 일치하지 않습니다.'
          });
        }
      } else {
        done(null, false, {
          message: '가입되지 않은 회원입니다.'
        });
      }
    } catch (error) {
      done(error);
    }
  }));
};
