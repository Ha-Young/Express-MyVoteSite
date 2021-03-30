const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const passport = require("passport");
const User = require("../model/User");

router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/signIn", function(req, res, next) {
  console.log(req.flash("info"));
  res.render("signIn", { messages: req.flash("info") });
});

// 저장되어있는 토큰을 꺼내다가 확인하고 재발급까지 해준다. 만약 없다면 signin페이지로 리다이렉트
passport.authenticate("jwt", { session: false });

router.post("/signIn", async function(req, res, next) {
  const {
    body: { email, password }
  } = req;

  const user = await User.findOne({ email }).lean();
  console.log("user", user);
  if (!user) {
    console.log("signIn : Email fail");
    req.flash("info", "pls check your Email!");
    return res.redirect("/signIn");
  }

  if (!bcrypt.compareSync(password, user.password)) {
    console.log("signIn : password fail");
    req.flash("info", "pls check your Password!");
    return res.redirect("/signIn");
  }

  res.cookie("access", jwt.sign({
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30m",
    })
  );

  res.cookie("refresh", jwt.sign({
      _id: savedUser._id,
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    })
  );

  res.redirect("/");
});

router.get("/signUp", async function(req, res, next) {
  console.log(req.flash("info"));
  res.render("signUp", { messages: req.flash("info") });
});

router.post("/signUp", async function(req, res, next) {
  const {
    body: { email, password, password2, name },
  } = req;

  if (password !== password2) {
    req.flash("info", "Passwords is not same");
    return res.redirect("/signUp");
  }

  const hashedPassword = bcrypt.hashSync(password, 10);
  const newUser = {
    email,
    password: hashedPassword,
    name,
  };

  res.cookie("access", jwt.sign({
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "30m",
    })
  );

  await User.create(newUser);

  // 가입할땐 refresh token이 반드시 없다.
  const savedUser = User.findOne({ email });
  res.cookie("refresh", jwt.sign({
      _id: savedUser._id,
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d",
    })
  );

  res.redirect("/signin");
});

module.exports = router;
