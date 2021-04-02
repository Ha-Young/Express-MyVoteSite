const jwt = require("jsonwebToken");
const passport = require("passport");
const mongoose = require("mongoose");

exports.signUp = (req, res, next) => {
  const [error] = req.flash("signUpError");

  res.status(200).render("signup", { message: error });
};

exports.logIn = (req, res, next) => {
  const [error] = req.flash("loginError");
  const query = req.query.next || "";

  res.status(200).render("login", { message: error, query });
};

exports.getToken = async (req, res, next) => {
  const { user } = req;
  const userData = user instanceof mongoose.Model ? user.toObject() : user;
  
  try {
    const token = await jwt.sign(
      userData,
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );

    res
      .cookie("jwt", token, { httpOnly: true })
      .status(200)
      .redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
};

exports.logOut = (req, res) => {
  res.clearCookie("jwt").redirect("/");
};

exports.trySignUp = passport.authenticate(
  "local-signup", 
  { successRedirect: "/login", failureRedirect: "/signup", session: false }
);

exports.tryLocalLogIn = passport.authenticate("local-login", { session: false });

exports.gitHubLogIn = passport.authenticate("github");
exports.tryGitHubLogIn = passport.authenticate("github", { session: false });
