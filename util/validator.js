const { check, validationResult } = require("express-validator");
const User = require("../models/User");

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
    .isLength({ min: 3 })
    .withMessage("Name should have minimum length of 3"),
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

    if (!result.isEmpty()) {
      return res.status(422).render("signup", { error: result.errors[0] });
    }
    next();
  }
];
