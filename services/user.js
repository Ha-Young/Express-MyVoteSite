const mongoose = require('mongoose');
const User = require('../models/User');

module.exports = class UserServices {
  constructor () {
  }

  async getUser (username) {
    const user = await User.findOne({ username });

    return user;
  }

  async hasVoted (userId, votingId) {
    const user = await User.findOne({ _id: userId });

    const result = user.voted.includes(votingId);

    return result;
  }

  async createUser (userDTO) {
    const isUser = await this.getUser(userDTO.username);

    if (isUser) {
      return {
        isFailed: true,
        errorMsg: 'User is already registered!'
      };
    }

    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      username: userDTO.username,
      password: userDTO.password
    });

    const result = await user.save();

    return result;
  }

  async authenticate (userDTO) {
    const user = await this.getUser(userDTO.username);

    if (!user) {
      return {
        isFailed: true,
        message: 'No user'
      };
    }

    let result;

    user.comparePassword(userDTO.password, (err, match) => {
      if (!match) {
        result = {
          isFailed: true,
          message: 'Wrong password'
        };
      } else {
        result = {
          isFailed: false,
          userData: user
        };
      }
    });

    return result;
  }
};
