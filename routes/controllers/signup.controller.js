const User = require('../../models/User');

exports.renderSignUp = (req, res, next) => {
  return res.status(200).render('signup');
};

exports.createUser = async (req, res, next) => {
  const { username, id, password } = req.body;
  const userData = {
    username: username,
    id: id,
    password: password
  };

  try {
    await User.create(userData);

    return res.redirect('/login');
  } catch (err) {
    err.status = 400;

    next(err);
  }
};
