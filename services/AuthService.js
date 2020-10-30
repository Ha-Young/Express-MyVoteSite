const { UserService, } = require('./database');
const DEFAULT_CALLBACK = require('../utils/defaultCallback');
const validator = require('../utils/validator');

class AuthService extends UserService {
  async signUpUser({ email, password, nickname, }, callback) {
    if (!callback) callback = DEFAULT_CALLBACK;

    try {
      await validator.signUpForm({ email, password, nickname, });

      const result = await this.createUser({ email, password, nickname, });

      callback(null, result);

      return result;
    } catch (err) {
      callback(err);
    }
  }

  async loginUser({ email, password, }, callback) {
    if (!callback) callback = DEFAULT_CALLBACK;

    try {
      await validator.loginForm({ email, password, });

      const result = await this.findUserByEmail({ email, });

      callback(null, result);

      return result;
    } catch (err) {
      callback(err);
    }
  }
}

module.exports = AuthService;
