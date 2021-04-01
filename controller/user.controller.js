const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const datefns = require("date-fns");

const User = require("../model/User");
const Vote = require("../model/Vote");

module.exports.getSignIn = function getSignIn(req, res, next) {
  console.log(req.flash("info"));
  res.render("signIn", { messages: req.flash("info") });
}

module.exports.postSignIn = async function postSignIn(req, res, next) {
  const {
    body: { email, password }
  } = req;

  const user = await User.findOne({ email }).lean();
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

module.exports.getMyVotes = async function getMyVotes(req, res, next) {
  const {
    user
  } = req;

  const myVotes = await Vote.find({ creator: user._id }).lean();

  myVotes.forEach(vote => {
    vote.createAt = datefns.format(vote.createAt, "yyyy/M/d h:m:s");
    vote.dueDate = datefns.format(vote.dueDate, "yyyy/M/d h:m:s");
    vote.isCreator = user && String(vote.creator) === String(user._id);
  });

  res.render("main", { votes: myVotes, user, isMyPage: true });
}
