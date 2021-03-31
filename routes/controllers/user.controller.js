const jwt = require("jsonwebToken");
const passport = require("passport");
const mongoose = require("mongoose");

exports.getSignUp = (req, res, next) => {
  res.status(200).render("signup", { message: "" });
};

exports.getLogIn = (req, res, next) => {
  console.log(req);
  res.status(200).render("login");
};

exports.getToken = async (req, res, next) => {
  const { user } = req;
  const userData = user instanceof mongoose.Model ? user.toObject() : user; // tojson
  
  try {
    const token = await jwt.sign(
      user.toJson(),
      process.env.JWT_SECRET_KEY,
      { expiresIn: "6h" }
    );
    
    res
      .cookie("jwt", token, { httpOnly: true })
      .status(200)
      .redirect("/");
  } catch (error) {
    next(error);
  }
};

exports.logout = (req, res) => {
  req.logout();
  
  res.status(302).redirect("/login"); // 쿠키 못지워..?
};

exports.postSignUp = passport.authenticate(
  "local-signup", 
  { successRedirect: "/login", failureRedirect: "/signup", session: false }
);
exports.postLogIn = passport.authenticate("local-login", { session: false });

exports.getGitHubLogIn = passport.authenticate("github");
exports.getGitHubCallback = passport.authenticate("github", { session: false });
