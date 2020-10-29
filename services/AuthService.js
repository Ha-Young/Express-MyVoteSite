const User = require('../models/User');
const bcrypt = require('bcrypt');

const { createAction, SUCCESS, ERROR } = require('./ActionCreator');

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
        return createAction(ERROR, '00');
        // return createAction('failed-user-exists', {
        //   message: 'The user already exists'
        // });
      }

      const saltRounds = 10;
      const generatedhash = await bcrypt.hash(this.password, saltRounds);
      const newUser = await User.create({
        email: this.email,
        name: this.name,
        password: generatedhash
      });

      return createAction(SUCCESS, newUser);
      // return createAction('succeed', newUser);
    } catch (error) {
      throw error;
    }
  }

  async signIn() {
    try {
      const user = await User.findOne({ email: this.email });
      if (!user) {
        return createAction(ERROR, '01');
        // return createAction('failed-no-user', {
        //   message: 'No user exists'
        // });
      }

      const isAuthorized = await bcrypt.compare(this.password, user.password);
      if (!isAuthorized) {
        return createAction(ERROR, '02');
        // return createAction('failed-password-mismatch', {
        //   message: `Passwords don't match`
        // });
      }

      return createAction(SUCCESS, user);
      // return createAction('success', user);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = AuthService;
