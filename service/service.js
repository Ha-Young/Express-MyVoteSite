const User = require('../models/User');

class UserService {
  async Signup(user) {
    const userRecord = await User({
      name: user.name,
      email: user.email,
      password: user.password
    }).save();
    console.log('success');
    return userRecord;
  }
}

module.exports = UserService;
// await User({ name, email, password: hash }).save();