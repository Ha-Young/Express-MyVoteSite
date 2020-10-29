const User = require('../../models/User');

exports.registerNewUser = async (req, res, next) => {
  const { email, password, username } = req.body;

  const newUserData = new User({
    email,
    password,
    username,
    votings: [],
  });

  User.create(newUserData, (err, user) => {
    if (err) {
      next(err);

      return;
    }

    res.status(302).redirect('/login');
  });
};

