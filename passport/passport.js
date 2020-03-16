const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./user');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new LocalStrategy(
      {
        usernameField: 'id',
        passwordField: 'pw',
        session: true,
        passReqToCallback: false
      },
      async (id, password, done) => {
        await Users.findOne({ id: id });
      }
    )
  );
};
