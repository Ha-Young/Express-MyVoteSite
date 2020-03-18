const bcrypt = require('bcrypt');

const errors = require('../lib/errors');
const Users = require('../models/Users');

exports.registerUser = async (req, res, next) => {
  const { username, firstname, lastname, email, password, gender } = req.body;

  try {
    const user = await Users.findOne({ email });

    if (!user) {
      bcrypt.hash(password, 12, async (err, hashedPassword) => {
        if (err) {
          return next(new errors.HashGenerationError(err.message));
        }

        const counter = await Users.estimatedDocumentCount();

        await Users.create({
          user_id: counter + 1,
          username,
          firstname,
          lastname,
          email,
          password: hashedPassword,
          gender
        });
      });

      return res.redirect('/auth/login');
    }

    next(new errors.DuplicateUserError('Duplicated user.'));
  } catch(err) {
    next(new errors.GeneralError(err.message));
  }
};
