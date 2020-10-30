const bcrypt = require('bcrypt');

const User = require('./model/User');
const DEFAULT_CALLBACK = require('../../utils/defaultCallback');

const SALT_ROUND = 10;

class UserService {
  async findUserByEmail({ email, }, callback) {
    if (!callback) callback = DEFAULT_CALLBACK;

    try {
      const result = await User.findOne({ email, });

      callback(null, result);

      return result;
    } catch (err) {
      callback(err);
    }
  }

  async createUser({ email, password, nickname, }, callback) {
    if (!callback) callback = DEFAULT_CALLBACK;

    try {
      const bcryptPassword = await bcrypt.hash(password, SALT_ROUND);
      const result = await User.create({ email, password: bcryptPassword, nickname, });

      callback(null, result);

      return result;
    } catch (err) {
      callback(err);
    }
  }

  async verifyPassword({ email, password, }, callback) {
    if (!callback) callback = DEFAULT_CALLBACK;

    try {
      const user = await User.findOne({ email, }, { _id: 0, password: 1, });
      const result = await bcrypt.compare(password, user.password);

      callback(null, result);

      return result;
    } catch (err) {
      callback(err);
    }
  }

  async exists(query, callback) {
    if (!callback) callback = DEFAULT_CALLBACK;

    try {
      const result = await User.exists(query);

      callback(null, result);

      return result;
    } catch (err) {
      console.error('🔥 user service: exists', err);
      throw Error(err);
    }
  }
}

module.exports = UserService;
