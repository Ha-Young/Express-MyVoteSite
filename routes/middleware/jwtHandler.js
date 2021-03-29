const jwt = require("jsonwebtoken");
const passport = require("passport");
const dotenv = require("dotenv");
const createError = require("http-errors");
const errorMessage = require("../../constants/errorMessage");

dotenv.config();

exports.signToken = function (req, res, next) {
  console.log("innnnnnnn!");
  console.log("login user is", req.user);
  const loggedUser = req.user;
  jwt.sign(
    loggedUser.toJSON(),
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
    (err, token) => {
      if (err) {
        const createdError = createError(500, errorMessage.SERVER_ERROR);
        return next(createdError);
      }
      return res
        .cookie("jwt", token, {
          httpOnly: true,
        })
        .status(200)
        .redirect("/");
    }
  );
};
