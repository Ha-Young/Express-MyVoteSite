const passport = require('passport');
const githubPassport = require('./github');
const localPassport = require('./local');
const User = require('../../models/user');


function passportLoader(app) {
  githubPassport(
    passport,
    async (id) => await User.findOne({ githubId: id }),
    async (user) => await User.create({
      githubId: user.id,
      nickname: user.displayName,
      root: 'github',
    })
  );
  localPassport(
    passport,
    async (email) => await User.findOne({ localEmail: email }),
  );

  app.use(passport.initialize());
  app.use(passport.session());
}



module.exports = passportLoader;
