const User = require('../models/User');

class UserService {
  constructor({ displayName, email }) {
    this.displayName = displayName;
    this.email = email;
  }

  async signup({ password }) {
    const { displayName, email } = this;
    const newUser = await User({ displayName, email });
    await User.register(newUser, password);
    return newUser;
  }

  static async getUserById(userId) {
    const user = await User.findById(userId);
    return user;
  }
}

module.exports = UserService;
