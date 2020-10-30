const { format, } = require('date-fns');

const Voting = require('./model/Voting');
const DEFAULT_CALLBACK = require('../../utils/defaultCallback');

class VotingService {
  addOpenState(voting) {
    const temp = voting;
    temp.openState = voting.expiration_date >= format(new Date(), 'yyyy-MM-dd');

    return temp;
  }

  async getVotings(callback) {
    if (!callback) callback = DEFAULT_CALLBACK;

    try {
      const votings = await Voting.find().populate('creator').sort({ expiration_date: 1, }).lean();
      const votingsWithState = votings.map(this.addOpenState);

      callback(null, votingsWithState);

      return votingsWithState;
    } catch (err) {
      callback(err);
    }
  }

  async getVotingsByUserId(id, callback) {
    if (!callback) callback = DEFAULT_CALLBACK;

    try {
      const votings = await Voting.find({ creator: id, }).populate('creator').sort({ expiration_date: 1, }).lean();
      const votingsWithState = votings.map(this.addOpenState);

      callback(null, votingsWithState);

      return votingsWithState;
    } catch (err) {
      callback(err);
    }
  }

  async getVotingByVotingId(id, callback) {
    if (!callback) callback = DEFAULT_CALLBACK;

    try {
      const voting = await Voting.findById(id).populate('creator', { nickname: 1, }).lean();
      const votingWithState = this.addOpenState(voting);

      callback(null, votingWithState);

      return votingWithState;
    } catch (err) {
      callback(err);
    }
  }

  async createVoting(form, callback) {
    if (!callback) callback = DEFAULT_CALLBACK;

    try {
      const result = await Voting.create(form);

      callback(null, result);

      return result;
    } catch (err) {
      callback(err);
    }
  }

  async deleteVoting({ userId, votingId, }, callback) {
    if (!callback) callback = DEFAULT_CALLBACK;

    try {
      const { creator, } = await Voting.findById(votingId, { creator: 1, }).lean();

      if (userId !== creator.toString()) {
        throw Error('🔥 user id is not same with creator id');
      }

      const result = await Voting.findByIdAndDelete(votingId);

      callback(null, result);
      return result;
    } catch (err) {
      callback(err);
    }
  }

  checkIfUserVoted({ userId, voting, }, callback) {
    if (!callback) callback = DEFAULT_CALLBACK;

    try {
      const result = voting.polls.find((poll) => {
        return poll.voted_users.find((user) => {
          return user._id.toString() === userId.toString();
        });
      });

      callback(null, result);
    } catch (err) {
      callback(err);
    }
  }

  async vote({ pollId, userId, }, callback) {
    if (!callback) callback = DEFAULT_CALLBACK;

    try {
      const result = await Voting.updateOne(
        { 'polls._id': pollId, },
        { $addToSet: { 'polls.$[poll].voted_users': userId, }, },
        {
          arrayFilters: [{ 'poll._id': pollId, },],
        });

      callback(null, result);
    } catch (err) {
      callback(err);
    }
  }

  async exists(query, callback) {
    if (!callback) callback = DEFAULT_CALLBACK;

    try {
      const result = await Voting.exists(query);

      callback(null, result);

      return result;
    } catch (err) {
      callback(err);
    }
  }
}

module.exports = VotingService;
