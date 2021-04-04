const createError = require("http-errors");
const passport = require("passport");

function authenticateUser(req, res, next) {
  passport.authenticate(
    "local",
    function(err, user) {
      if (err) {
        next(createError(500));
      } else if (!user) {
        res.redirect("/login");
        return;
      }

      return req.login(user, err => {
        if(err) {
          next(createError(500));
        }

        next();
      });
  })(req, res, next);
};

module.exports = authenticateUser;
