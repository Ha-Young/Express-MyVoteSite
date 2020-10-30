const Voting = require('../models/Voting');
const User = require('../models/User');
const { isExpiration } = require('../utils');
const createError = require('http-errors');

class VotingService {
  async findAllVotings() {
    try {
      const votings = await Voting.find();
      if (!votings) {
        return createError(400, constants.ERROR_MESSAGE_REQUEST_FAIL);
      }
      for (let i = 0; i < votings.length; i++) {
        votings[i].isExpiration = isExpiration(votings[i].expirationDate);
      }
      return votings;
    } catch (err) {
      return err;
    }
  };

  async createVoting({ userId, userName, votingTitle, expirationDate, options }) {
    try {
      const optionObject = options.map(option => { return { option } });
      const voting = {
        createdBy: userId,
        userName: userName,
        votingTitle,
        expirationDate,
        options: optionObject,
      };

      const saveVoting = await Voting(voting).save();
      return saveVoting;
    } catch (err) {
      return err;
    }
  }
  async getVotinDetails(votingId, user) {
    try {
      const voting = await Voting.findOne({ _id: votingId });
      const { options } = voting.populate('options');

      if (!voting || !options) {
        return createError(400, constants.ERROR_MESSAGE_REQUEST_FAIL);
      }

      voting.isExpiration = isExpiration(voting.expirationDate);

      let isCreator;
      let userId;
      let isVoter;

      if (!user) {
        userId = null;
      } else {
        userId = user._id
        isCreator = voting.createdBy.equals(userId);
        options.map(option => {
          if (option.voters.includes(userId)) {
            isVoter = true;
          }
        });
      }

      return { voting, isCreator, options, isVoter };
    } catch (err) {
      return err;
    }
  }

  async updateVoter(userId, optionId) {
    try {
      const { ok } = await Voting.updateOne(
        { 'options._id': optionId },
        { $addToSet: { 'options.$[option].voters': userId } },
        { arrayFilters: [{ 'option._id': optionId }] }
      );

      return !!ok;
    } catch (err) {
      return err;
    }
  }

  async deleteVoting(votingId) {
    try {
      await Voting.findByIdAndDelete(votingId);
    } catch (err) {
      return err;
    }
  }
}

class UserService {
  async signUp(user) {
    await User(
      {
        name: user.name,
        email: user.email,
        password: user.hash
      })
      .save();
  }

  async updateUserVoting(userId, votingId) {
    const userObj = await User.findOne({ _id: userId });

    userObj.votings.push(votingId);
    if (!userObj) {
      return createError(400, constants.ERROR_MESSAGE_REQUEST_FAIL);
    }
    const isUpdate = await User(userObj).save();

    return isUpdate;
  }

  async getUserVotings(userId) {
    const { votings } = await User.findOne({ _id: userId }).populate('votings');

    for (let i = 0; i < votings.length; i++) {
      votings[i].isExpiration = isExpiration(votings[i].expirationDate);
    }

    return votings;
  }

  async deleteUserVotings(userId, votingId) {
    try {
      const { ok } = await User.update(
        { _id: userId },
        { $pull: { 'votings': votingId } }
      );

      return !!ok;
    } catch (err) {
      return err;
    }
  }
}

module.exports = {
  UserService,
  VotingService,
};
