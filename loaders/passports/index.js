const passport = require('passport');
const githubPassport = require('./github');
const localPassport = require('./local');
const User = require('../../models/user');

function passportLoader(app) {
  githubPassport(
    passport,
    async (email) => await User.findOne({ email }),
    async (user) => await User.create({
      email: user.id,
      password: 1234567890,
      nickname: user.displayName,
      type: 'google',
    })
  );
  localPassport(
    passport,
    async (email) => await User.findOne({ email }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
}

module.exports = passportLoader;
