const passport = require('passport');
``;
const User = require('./models/User');
const LocalStrategy = require('passport-local').Strategy;
const NEW_ACCOUNT = require('./constants/login');

passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
},
  async function (req, email, password, done) {
    User.findOne({ email: email }, (err, user) => {
      if (err) return done(err);

      if (!user) {
        const passNewAcountInfo = {
          email: email
        };

        return done(null, passNewAcountInfo, { message: NEW_ACCOUNT });
      }

      return done(null, user);
    });
  }));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
