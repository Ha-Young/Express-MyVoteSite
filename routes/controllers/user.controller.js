const jwt = require("jsonwebToken");
const passport = require("passport");
const mongoose = require("mongoose");

exports.getSignUp = (req, res, next) => {
  res.status(200).render("signup", { message: "" });
};

exports.getLogIn = (req, res, next) => {
  res.status(200).render("login");
};

exports.getToken = async (req, res, next) => {
  const { user, cookies } = req;
  const userData = user instanceof mongoose.Model ? user.toObject() : user; // tojson
  
  try {
    const token = await jwt.sign(
      userData,
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1h" }
    );
    
		const redirectUrl = cookies["redirect"] ? cookies["redirect"] : "/";

    res
      .cookie("jwt", token, { httpOnly: true })
      .status(200)
      .redirect(redirectUrl);
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  res.clearCookie("jwt").redirect("/");
};

exports.postSignUp = passport.authenticate(
  "local-signup", 
  { successRedirect: "/login", failureRedirect: "/signup", session: false }
);
exports.postLogIn = passport.authenticate("local-login", { session: false });

exports.getGitHubLogIn = passport.authenticate("github");
exports.getGitHubCallback = passport.authenticate("github", { session: false });
