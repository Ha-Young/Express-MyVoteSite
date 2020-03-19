const createError = require('http-errors')
const User = require('../models/user');
const bcrypt = require('bcrypt');

module.exports = async (req,res, next) => {
  try {
    const { email }  = req.body;
    const user = await User.findOne({ email });
    if (user) {
      throw(createError(409, "The email already exists"));
    }

    const password = await bcrypt.hash(req.body.password, 10);
    await new User({ email, password }).save();
    next();
  } catch(e) {
    next(e);
  }
};
