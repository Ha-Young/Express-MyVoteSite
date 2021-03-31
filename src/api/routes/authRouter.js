const express = require("express");
const { validatePostSignUp } = require("../middlewares/validator");
const {
  getSignup,
  postSignup,
  getLogin,
  postLogin,
} = require("../../controllers/authController");
const passport = require("passport");

const authRouter = express.Router();

authRouter.get("/login", getLogin);
authRouter.post("/login", passport.authenticate('local', { failureRedirect: '/login' }),
(req, res) => {
  const queryKey = Object.keys(req.query);

  if (queryKey.length) {
    res.redirect(`/${queryKey}/${req.query[queryKey]}`);
    return;
  }

  res.redirect("/");
});

authRouter.get("/signup", getSignup);
authRouter.post("/signup", validatePostSignUp, postSignup);

module.exports = authRouter;
