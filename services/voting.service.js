const Voting = require('../models/Voting');
const User = require('../models/User');
const dayjs = require('dayjs');
const { FULL_DATE_KOREAN } = require('../constants/');
const UserService = require('./user.service');
const userService = new UserService();

class VotingService {
  async getVoting(id) {
    try {
      const voting = await Voting.findById(id);
      return voting;
    } catch (err) {
      throw new Error(err);
    }
  }

  async createVoting(title, created_by, expires_at, options) {
    const newVotingData = new Voting({
      title,
      created_by,
      expires_at,
      options,
    });

    Voting.create(newVotingData, async (err, data) => {
      if (err) {
        throw new Error(err);
      }

      try {
        const newVotingId = data._id;
        const currentUser = await userService.getUser(data.created_by);

        currentUser.votings.push(newVotingId);

        userService.updateUser(currentUser._id, currentUser);
      } catch (err) {
        throw new Error(err);
      }
    });
  }

  async deleteVoting(id) {
    try {
      await Voting.findByIdAndDelete(id);
    } catch (err) {
      throw new Error(err);
    }
  }

  async getDetails(votingId, userId) {
    let isUserCreator = false;
    let isExpired = false;
    let currentUsersPick = null;

    try {
      const voting = await Voting.findById(votingId);
      const expirationDate = Date.parse(voting.expires_at);
      const formattedExpirationDate = dayjs(expirationDate).format(FULL_DATE_KOREAN);

      if (userId === voting.created_by.toString()) {
        isUserCreator = true;
      }

      if (expirationDate < Date.now()) {
        isExpired = true;
      }

      for (const option of voting.options) {
        for (const voter of option.voters) {
          if (voter.toString() === userId) {
            currentUsersPick = option.content;
          }
        }
      }

      return {
        voting,
        isUserCreator,
        isExpired,
        formattedExpirationDate,
        currentUsersPick,
      };
    } catch (err) {
      throw new Error(err);
    }
  }

  async updateVoting(id, votingData) {
    try {
      await Voting.findByIdAndUpdate(
        id,
        votingData,
        { new: true }
      );

      return;
    } catch (err) {
      throw new Error(err);
    }
  }
}

module.exports = VotingService;
