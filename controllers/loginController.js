const User = require("../models/User");
const passport = require("passport");

// exports.authenticateUserThroughPassport = async function(req, res, next) {
//   try {
//     const { email, username, password } = req.body;
//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       email,
//       userName: username,
//       password: hashedPassword,
//     });

//     res.redirect("/login");
//   } catch (error) {
//     next(error);
//   }
// };

// exports.authenticateUserThroughPassport = passport.authenticate("local", { scope: ["profile"] });
exports.directUserToRelevantPage = async function(req, res, next) {

  passport.authenticate(
    "local", {
        successRedirect: "/",
        failureRedirect: "/login",
        failureFlash: true,
    })(req, res, next)
};

exports.getLoginPage = async function(req, res, next) {
    // console.log(req.flash("error"), "??")
  res.render("login", { title: 'Login',  error: req.flash("error") });
}
