const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const createError = require("http-errors");
const errorMessage = require("../../constants/errorMessage");

dotenv.config();

exports.signToken = function (req, res, next) {
  const loggedUser = req.user;
  jwt.sign(
    loggedUser.toJSON(),
    process.env.JWT_SECRET_KEY,
    { expiresIn: "1d" },
    (err, token) => {
      if (err) {
        console.log(err.message);
        const createdError = createError(500, errorMessage.SERVER_ERROR);
        return next(createdError);
      }
      return res
        .cookie("jwt", token, {
          httpOnly: true,
        })
        .status(200)
        .redirect("/votings");
    }
  );
};
