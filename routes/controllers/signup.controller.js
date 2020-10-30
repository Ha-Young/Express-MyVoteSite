const bcrypt = require('bcrypt');
const UserService = require('../../service/service');
const userService = new UserService();

exports.renderSignup = (req, res, next) => {
  res.render('signup');
};

exports.signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const hash = await bcrypt.hash(password, 12);

    await userService.signUp({ name, email, hash });

    return res.redirect('/login');
  } catch (err) {
    next(err);
  }
};
