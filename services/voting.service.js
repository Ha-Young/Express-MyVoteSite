const Voting = require('../models/Voting');
const dayjs = require('dayjs');
const { FULL_DATE_KOREAN } = require('../constants/');

class VotingService {
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
}

module.exports = VotingService;
