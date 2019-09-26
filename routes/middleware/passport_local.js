const User = require('../../models/User');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

module.exports = function passport(passport) {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'name',
        passwordField: 'password'
      },
      async function(name, password, done) {
        try {
          const loginUser = await User.findOne({
            name: name
          });
          if (loginUser) {
            const result = await bcrypt.compare(password, loginUser.password);
            if (result) {
              return done(null, loginUser);
            } else {
              return done(null, false, { message: '비밀번호가 틀렸습니다' });
            }
          } else {
            return done(null, false, { message: '이름이 틀렸습니다' });
          }
        } catch (error) {
          if (error.name === 'CastError') {
            return next();
          } else {
            return next(error);
          }
        }
      }
    )
  );
};
