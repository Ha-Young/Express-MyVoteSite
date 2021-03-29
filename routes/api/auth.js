const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const User = require("../../models/User");
const { JWT_SECRET_KEY } = require("../../config/index");

const bcrypt = require("bcrypt");

router.post("/", async function (req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.render("login", { message: "모든 필드를 입력해주세요" });
  }

  const user = await User.find({ email });
  if (!user) {
    return res.render("login", { message: "존재하지 않는 아이디입니다." });
  }

  bcrypt.compare(password, user.password, function (isMatch) {
    if (!isMatch) {
      return res.render("login", { message: "비밀번호가 일치하지 않습니다." });
    }

    const payload = {
      email: user.email,
    };

    const token = jwt.sign(payload, JWT_SECRET_KEY);

    console.log(token);
    res.json({ token: token });
  });
});

module.exports = router;
