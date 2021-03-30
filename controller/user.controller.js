const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../model/User");

module.exports.getSignIn = function getSignIn(req, res, next) {
  console.log(req.flash("info"));
  res.render("signIn", { messages: req.flash("info") });
}

module.exports.postSignIn = async function postSignIn(req, res, next) {
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
    console.log("signIn : Password fail");
    req.flash("info", "pls check your Password!");
    return res.redirect("/signIn");
  }

  res.cookie("access", jwt.sign({
      email,
    },
    process.env.JWT_SECRET, {
      expiresIn: "30m",
    })
  );

  res.cookie("refresh", jwt.sign({
      _id: user._id,
      email,
    },
    process.env.JWT_SECRET, {
      expiresIn: "1d",
    })
  );

  res.redirect("/");
}

module.exports.getSignUp = async function getSignUp(req, res, next) {
  console.log(req.flash("info"));
  res.render("signUp", { messages: req.flash("info") });
}

module.exports.postSignUp = async function postSignUp(req, res, next) {
  const {
    body: { email, password, password2, name },
  } = req;

  if (password !== password2) {
    req.flash("info", "Passwords is not same");
    return res.redirect("/signUp");
  }

  const newUser = {
    email,
    password: bcrypt.hashSync(password, 10),
    name,
  };

  res.cookie("access", jwt.sign({
      email,
    },
    process.env.JWT_SECRET, {
      expiresIn: "30m",
    })
  );

  await User.create(newUser);
  const savedUser = await User.findOne({ email }).lean();
  res.cookie("refresh", jwt.sign({
      _id: savedUser._id,
      email,
    },
    process.env.JWT_SECRET, {
      expiresIn: "1d",
    })
  );

  res.redirect("/signin");
}

module.exports.getSignOut = function getSignOut(req, res, next) {
  req.logout();
  res.clearCookie("access");
  res.clearCookie("refresh");
  res.redirect("/");
}
