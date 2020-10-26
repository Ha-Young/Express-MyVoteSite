const User = require('../../models/User');
const bcrypt = require('bcrypt');

exports.renderSignup = (req, res, next) => {
  res.render('signup');
};

exports.getInfo = async(req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const existUser = await User.findOne({ email: email });

    if (existUser) {
      return res.render('join', { error: '존재하는 email 입니다' });
    }
    const hash = await bcrypt.hash(password, 12);
    User({
      name,
      email,
      password: hash,
    }).save();

    return res.redirect('/login');
  } catch (err) {
    next(err);
  }
};
