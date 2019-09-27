const LocalStrategy = require('passport-local').Strategy;
const LocalUser = require('../models/Local-user');

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
        usernameField: 'username',
        passwordField: 'password'
      },
      async (username, password, done) => {
        try {
          const user = await LocalUser.findOne({ username });
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
