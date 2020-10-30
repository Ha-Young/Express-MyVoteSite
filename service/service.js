const Voting = require('../models/Voting');
const User = require('../models/User');
const { isExpiration } = require('../utils');


class VotingService {
  async getVotinDetails(votingId, user) {
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

    return { voting, isCreator, options, isVoter }
  }
}


//error...
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

  async getVotings(userId) {
    const { votings } = await User.findOne({ _id: userId }).populate('votings');

    for (let i = 0; i < votings; i++) {
      voting.isExpiration = isExpiration(voting.expirationDate);
    }

    return votings;
  }
}

module.exports = {
  UserService,
  VotingService,
};
