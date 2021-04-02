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
    const redirectUrl = req.headers.referer.replace("http://localhost:3000/auth/login?url=", "");
    const loginUrl = "http://localhost:3000/auth/login";

    if (redirectUrl !== "undefined" && redirectUrl !== loginUrl) {
      res.redirect(redirectUrl);
    } else {
      res.redirect("/");
    }
  } catch (err) {
    next(err);
  }
});

router.get("/logout", authenticateUser, authController.logout);
router.get("/signup", authController.renderSignup);
router.post("/signup", authController.postSignup);

module.exports = router;
