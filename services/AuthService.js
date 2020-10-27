const User = require('../models/User');
const bcrypt = require('bcrypt');

class AuthService {
  constructor(user) {
    this.name = user.name;
    this.email = user.email;
    this.password = user.password;
    this.passwordConfirmation = user.passwordConfirmation;
  }

  static saltRounds = 10;

  async signUp() {
    try {
      if (!this.name || this.password !== this.passwordConfirmation) {
        return createAction('failed-password-confirm', {
          message: 'Password confirmation failed'
        });
      }

      const user = await User.findOne({ email: this.email });
      if (user) {
        return createAction('failed-user-exists', {
          message: 'The user already exists'
        });
      }

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
