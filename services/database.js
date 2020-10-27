const User = require('../model/User');

class Database {
  async createUser({ email, password, nickname, }) {
    try {
      return await User.create({ email, password, nickname, });
    } catch (err) {
      return new Error(err);
    }
  }
}

module.exports = () => {
  return new Database();
};
