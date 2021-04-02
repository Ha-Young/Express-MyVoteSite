const createError = require("http-errors");
const passport = require("passport");

exports.getLoginPage = async function(req, res, next) {
  res.render(
    "login",
    { title: "Login",
      error: req.flash("error")
    }
  );
};

exports.authenticateUser = async function(req, res, next) {
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

exports.directUserToRelevantPage = async function(req, res, next) {
  if (req.session.returnTo) {
    res.redirect(req.session.returnTo);
  } else {
    res.redirect("/");
  }
};
