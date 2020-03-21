const bcrypt = require("bcrypt");

const errors = require("../lib/errors");
const Users = require("../models/Users");

exports.registerUser = async (req, res, next) => {
  const { username, firstname, lastname, email, password } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      bcrypt.hash(password, 12, async (err, hashedPassword) => {
        if (err) {
          return next(new errors.HashGenerationError(err.message));
        }

        await Users.create({
          username,
          firstname,
          lastname,
          email,
          password: hashedPassword,
        });
      });

      return res.redirect("/auth/login");
    }

    next(new errors.DuplicateUserError("Duplicated user exists."));
  } catch(err) {
    next(new errors.GeneralError(err.message));
  }
};
