const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = function passport (passport) {
  passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async function (username, password, done) {
    try {
      console.log('패스포트 시작됨...');
      const user = await User.findOne({ email: username });

      if (!user) {
        console.log('패스포트...유저없대')
        return done(null, false, { message: 'incorrect user_email' });
      }

      const checkedPassword = await bcrypt.compare(password, user.password);

      if (!checkedPassword) {
        console.log('패스포트..비번틀렸대')
        return done(null, false, { message: 'incorrect password' });
      }
      console.log('패스포트, 성공직전임.');
      return done(null, user);
    } catch (err) {
      done(err);
    }
  }
  ));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};
