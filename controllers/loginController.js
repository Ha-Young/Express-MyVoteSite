require("dotenv").config();

const createError = require("http-errors");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.loginPage = (req, res) => {
  res.render("login");
};

exports.loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    createError(400, "please provide email and password")
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.redirect(301, "/login");
  } else {
    const token = jwt.sign({ email }, process.env.JWT_SECRETKEY);

    res
      .status(201)
      .cookie("access_token", token, {
        expires: new Date(Date.now() + 10000)
      })
      .redirect(301, "/");
  }
};
