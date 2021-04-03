const express = require("express");
const router = express.Router();
const passport = require("passport");

const authenticateUser = require("./middlewares/authenticateUser");
const authController = require("../routes/controllers/auth.controller");

router.get("/login", authController.renderLogin);
router.post("/login",
  passport.authenticate("local", {
    failureRedirect: "/auth/login",
    failureFlash: true,
  }
), (req, res, next) => {
  try {
    const loginUrl = "https://solsol-voting-platform.herokuapp.com/auth/login";
    const redirectUrl = req.headers.referer.replace(loginUrl+"?url=", "");

    if (redirectUrl !== "undefined" && redirectUrl !== loginUrl) {
      res.status(301).redirect(redirectUrl);
    } else {
      res.status(301).redirect("/");
    }
  } catch (err) {
    next(err);
  }
});

router.get("/logout", authenticateUser, authController.logout);
router.get("/signup", authController.renderSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
