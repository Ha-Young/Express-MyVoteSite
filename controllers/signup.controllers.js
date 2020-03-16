const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const errors = require('../lib/errors');
const User = require('../models/Users');

exports.registerUser = async (req, res, next) => {
  const { username, firstname, lastname, email, password, gender } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      await bcrypt.hash(password, 12, async (err, hashedPassword) => {
        if (err) {
          return next(new errors.HashGenerationError(err.message));
        }

        const newUser = new User({
          username,
          firstname,
          lastname,
          email,
          password: hashedPassword,
          gender
        });

        await newUser.save();
        return res.redirect('/login');
      });
    } else {
      next(new errors.DuplicateUserError('Duplicated user.'));
    }
  } catch(err) {
    console.log(err); // mongoose에서 findOne에서 발생한 에러.
  }
};
