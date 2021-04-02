const express = require("express");
const usersController = require("./controllers/users.controller");
const { validateUser, validateLogin } = require("./middlewares/validator");
const router = express.Router();
const passport = require("passport");
const initializePassport = require("./middlewares/passportConfig");
initializePassport(passport);

/* GET users listing. */
router.get("/login", (req, res, next) => {
  req.session.referrer = req.header("Referer");
  res.status(200).render("login");
});

router.post("/login", validateLogin, usersController.signIn);

router.get("/login-google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

router.get("/login-google/callback", passport.authenticate("google", {
  failureRedirect: "/login",
}), (req, res, next) => {
  const referrer = req.session.referrer ?? "/";
  res.status(200).redirect(referrer);
});

router.get("/logout", usersController.signOut);

router.get("/signup", (req, res, next) => {
  res.status(200).render("signup");
});

router.post("/signup", validateUser, usersController.signUp);


module.exports = router;
