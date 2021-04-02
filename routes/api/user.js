const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const saltRounds = 10;

const User = require("../../models/User");

router.get("/", (req, res) => {
  res.render("signup");
});

router.post("/", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("signup", { message: "모든 정보를 입력해주세요." });
  }

  const user = await User.findOne({ email });

  if (user) {
    return res.render("signup", { message: "이미 가입된 이메일입니다." });
  }

  const newUser = new User({
    email,
    password,
  });

  bcrypt.genSalt(saltRounds, function (error, salt) {
    bcrypt.hash(password, salt, function (error, hash) {
      if (error) {
        throw new Error(error);
      }

      newUser.password = hash;
      newUser.save().then(() => {
        return res.render("login");
      });
    });
  });
});

module.exports = router;
