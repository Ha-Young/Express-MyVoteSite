const passport = require('passport');
const githubPassport = require('./github');
const localPassport = require('./local');
const User = require('../../models/user');


function passportLoader(app) {
  githubPassport(
    passport,
    async (id) => await User.findOne({ id }),
    async (user, temporaryPassword) => await User.create({
      id: user.id,
      password: temporaryPassword,
      nickname: user.displayName,
      root: 'github',
    })
  );
  localPassport(
    passport,
    async (id) => await User.findOne({ id }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
}



module.exports = passportLoader;
