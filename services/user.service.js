const User = require('../models/User');

class UserService {
  async getUser(id) {
    try {
      const user = await User.findById(id);

      return user;
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateUser(id, userData) {
    try {
      await User.findByIdAndUpdate(
        id,
        userData,
        { new: true }
      );

      return;
    } catch (err) {
      throw new Error(err);
    }
  }

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
