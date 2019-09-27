const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(null, user);
    });
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password'
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email });
          if (user) {
            bcrypt.compare(password, user.password, (err, res) => {
              if (res) {
                done(null, user);
              } else {
                done(null, false, { message: '비밀번호가 일치하지 않습니다.' });
              }
            });
          } else {
            done(null, false, { message: '가입되지 않은 회원입니다.' });
          }
        } catch (error) {
          console.error(error);
          done(error);
        }
      }
    )
  );
};
