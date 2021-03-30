const { check, validationResult } = require("express-validator");
const format = require("date-fns/format");
const { getUserInfo } = require("../../util/jwtHelper");
const bcrypt = require("bcrypt");
const User = require("../../models/User");
const Vote = require("../../models/Vote");

exports.validateUser = [
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async value => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error("User with this email is already existed");
      }
      return true;
    }),
  check("name")
    .isLength({ min: 3, max: 10 })
    .withMessage("Name should have minimum length of 2"),
  check("password")
    .isLength({ min: 8, max: 12 })
    .withMessage("Password should have min and max length between 8 - 12")
    .matches(/\d/)
    .withMessage("Password should have at least one number")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password should have at least one special character"),
  check("confirmedPassword")
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Confirmed password does not match");
      }
      return true;
    }),
  (req, res, next) => {
    const result = validationResult(req);
    const user = getUserInfo(req.cookies);

    if (!result.isEmpty()) {
      return res.status(422).render("signup", { error: result.errors[0], user });
    }
    next();
  }
];

exports.validateLogin = [
  check("email")
    .isEmail()
    .withMessage("Invalid email address")
    .custom(async value => {
      const user = await User.findOne({ email: value });
      if (!user) {
        throw new Error("Email is not existed.");
      }
      return true;
    }),
  check("password")
    .custom(async (value, { req }) => {
      const user = await User.findOne({ email: req.body.email });
      const isMatched = await bcrypt.compare(value, user.password);
      if (!isMatched) {
        throw new Error("Password is incorrect.");
      }
      return true;
    }),
  (req, res, next) => {
    const result = validationResult(req);
    const user = getUserInfo(req.cookies);

    if (!result.isEmpty()) {
      return res.status(422).render("login", { error: result.errors[0], user });
    }
    next();
  }
];

exports.validateCreatingVote = [
  check("title")
    .isLength({ min: 1})
    .withMessage("Title must be required."),
  check("expiration_date")
    .custom(value => {
      const today = format(new Date(), "yyyy-MM-dd'T'HH:mm");
      if (value < today) {
        throw new Error("Date and time must be later than today");
      }
      return true;
    }),
  check("option_title")
    .isLength({ min: 1 })
    .withMessage("Option title must be required")
    .custom(value => {
      if (!Array.isArray(value) || value.length < 2) {
        throw new Error("Add more options (at least 2)");
      }
      return true;
    }),
  (req, res, next) => {
    const result = validationResult(req);
    const user = getUserInfo(req.cookies);

    if (!result.isEmpty()) {
      return res.status(422).render("votings-new", { error: result.errors[0], user });
    }

    next();
  }
];

exports.validateCastingVote = [
  check("options")
    .custom(async (value, { req }) => {
      const { id } = req.params;
      const user = getUserInfo(req.cookies);
      const userInfo = await User.findOne({ email: user.email });
      const isCasted = userInfo.casted_votes.find(vote => vote.toString() === id);

      if (value === undefined) {
        throw new Error("You should choice at least one option");
      }

      if (isCasted) {
        throw new Error("Already voted");
      }

      return false;
    }),
  async (req, res, next) => {
    const result = validationResult(req);
    const user = getUserInfo(req.cookies);
    const { id } = req.params;
    const vote = await Vote.findById(id).populate("author", "name");

    if (!result.isEmpty()) {
      return res.status(422).render("vote-page", { error: result.errors[0], user, vote });
    }

    next();
  }
];
