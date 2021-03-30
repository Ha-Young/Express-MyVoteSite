const passport = require("passport");
const initializeLocal = require("./local");

const passportLoader = (app) => {
  initializeLocal(passport);

  app.use(passport.initialize());
  app.use(passport.session());
};

module.exports = passportLoader;
