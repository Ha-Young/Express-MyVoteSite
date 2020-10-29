const bcrypt = require('bcrypt');
const User = require('../../models/User');

exports.renderSignup = (req, res, next) => {
  res.render('signup');
};

exports.saveUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 12);

    await User({ name, email, password: hash }).save();

    return res.redirect('/login');
  } catch (err) {
    next(err);
  }
};
