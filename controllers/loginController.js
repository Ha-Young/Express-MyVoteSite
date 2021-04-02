require("dotenv").config();

const createError = require("http-errors");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.loginPage = (req, res) => {
  let { pageId } = req.query;

  if (pageId) {
    res.render("login", { pageId });

    return;
  }

  res.render("login", { pageId });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const { pageId } = req.query;

  if (!email || !password) {
    createError(400, "please provide email and password")
  }

  const user = await User.findOne({ email });

  if (!user) {

    res.redirect(301, "/login");
    return;
  }

  const isCorrectUser = await user.correctPassword(password, user.password);

  if (!isCorrectUser) {
    res.redirect(301, `/login/?pageId=${pageId}`);
  } else {
    const id = user._id;
    const token = jwt.sign({ id }, process.env.JWT_SECRETKEY);

    if (pageId) {
      res
        .status(201)
        .cookie("access_token", token, {
          expires: new Date(Date.now() + 1 * 3600000)
        })
        .redirect(301, `/votings/${pageId}`);

      return;
    }

    res
      .status(201)
      .cookie("access_token", token, {
        expires: new Date(Date.now() + 1 * 3600000)
      })
      .redirect(301, "/");
  }
};
