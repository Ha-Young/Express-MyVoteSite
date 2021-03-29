const express = require("express");
const router = express.Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../../config/index");

router.get("/", (req, res) => {
  res.render("login");
});

router.post("/", async (req, res, next) => {
  console.log(req);
  passport.authenticate("login", async (err, user, info) => {
    try {
      if (err || !user) {
        const error = new Error("error occured");

        return next(error);
      }

      req.login(user, { session: false }, async (error) => {
        if (error) {
          return next(error);
        }

        const body = { _id: user._id, email: user.email };
        const token = jwt.sign({ user: body }, JWT_SECRET_KEY);

        return res.json({ token });
      });
    } catch (error) {
      return next(error);
    }
  })(req, res, next);
});

router.get("/callback", (req, res, next) => {
  res.redirect("/");
});

module.exports = router;
