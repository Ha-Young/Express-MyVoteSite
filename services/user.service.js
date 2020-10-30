const User = require('../models/User');

class UserService {
  async registerUser(email, password, username) {
    const newUserData = new User({
      email,
      password,
      username,
      votings: [],
    });

    try {
      await User.create(newUserData);

      return;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = UserService;
