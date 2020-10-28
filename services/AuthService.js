const User = require('../models/User');
const bcrypt = require('bcrypt');

const AUTH_ERROR_CODE = {
  EA_0: {
    value: 'EA_0',
    message: 'The user already exists'
  },
  EA_1: {
    value: 'EA_1',
    message: 'No user exists'
  },
  EA_2: {
    value: 'EA_2',
    message: `Passwords don't match`
  }
};

class AuthService {
  constructor(user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.passwordConfirmation = user.passwordConfirmation;
  }

  async signUp() {
    try {
      const user = await User.findOne({ email: this.email });
      if (user) {
        return createAction('failed-user-exists', {
          message: 'The user already exists'
        });
      }

      const saltRounds = 10;
      const hash = await bcrypt.hash(this.password, saltRounds);
      const newUser = await User.create({
        email: this.email,
        name: this.name,
        password: hash
      });

      return createAction('succeed', newUser);
    } catch (error) {
      throw error;
    }
  }

  async signIn() {
    try {
      const user = await User.findOne({ email: this.email });
      if (!user) {
        return createAction('failed-no-user', {
          message: 'No user exists'
        });
      }

      const isAuthorized = await bcrypt.compare(this.password, user.password);
      if (!isAuthorized) {
        return createAction('failed-password-mismatch', {
          message: `Passwords don't match`
        });
      }

      return createAction('success', user);
    } catch (error) {
      throw error;
    }
  }
}

function createAction(type, payload) {
  return { type, payload };
}

module.exports = AuthService;
