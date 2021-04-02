const passport = require("passport");

exports.directUserToRelevantPage = async function(req, res, next) {
  // if (!req.user) {
  //   res.redirect("/login");
  //   return;
  // }
  // console.log(req.session, "Session")
  // `${req.session.redirectUrl}`

  // if (req.user) {
  //   req.session.redirectUrl = '/votings';
  // }
console.log(req.session.returnTo, "~~~~~~~")

  passport.authenticate(
    "local", {
        failureRedirect: "/login",
        successRedirect: req.session.returnTo || "/",
        failureFlash: true,
    })(req, res, next);
}
  // req.login(user, error => {
  //   if (error) return next(error);
  //   console.log(req.session.returnTo, "return")
  //   if (req.session.returnTo) {
  //     const redirectUrl = req.session.returnTo;
  //     delete req.session.returnTo;
  //     return res.redirect(redirectUrl);
  //   }
  //   return res.redirect('/');
  // })(req, res, next);

  // passport.authenticate(
  //   "local", {
  //       failureRedirect: "/login",
  //       successRedirect: `${req.session.redirectUrl}`,
  //       failureFlash: true,
  //   })(req, res, next);
// };

exports.getLoginPage = async function(req, res, next) {
  res.render("login", { title: "Login",  error: req.flash("error") });
};
