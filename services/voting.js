const Voting = require('../models/Voting');
const User = require('../models/User');
const mongoose = require('mongoose');

module.exports = class VotingServices {
  constructor () {
  }

  async findVoting (votingDTO) {
    const votings = await Voting.find(votingDTO);

    return votings;
  }

  async findUserVotedVotings (username) {
    const result = await User.findOne({ username }).populate('voted');

    return result;
  }

  async createVoting (votingDTO) {
    const { subject, author, description, expireTo, candidates } = votingDTO;

    const result = await Voting.create({
      subject,
      author,
      description,
      expiredAt: new Date(+new Date() + expireTo * 60 * 60 * 1000),
      candidates
    });

    return result;
  }

  async updateVoting (votingId, candidateId, voterId) {
    const user = await User.findOne({ _id: voterId });

    if (user.voted.includes(votingId)) {
      return {
        hasVoted: true,
      };
    }

    const voting = await Voting.findOne({ _id: votingId });

    const candidate = voting.candidates.find(candidate => {
      if (candidate.id === candidateId) {
        return candidate;
      }
    });

    candidate.voters.addToSet(voterId);
    voting.voters.addToSet(voterId);
    await voting.save();

    user.voted.addToSet(votingId);
    await user.save();

    return {
      hasVoted: false,
      success: true
    };
  }

  async deleteVoting (votingId) {
    try {
      const result = await Voting.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(votingId) } },
        { $unwind: { path: '$candidates' } },
        { $unwind: { path: '$candidates.voters' } },
        { $group: { _id:"$_id",  voters: { $push: "$candidates.voters" } } },
      ]);

      const [ { voters } ] = result;

      for (let voterId of voters) {
        const user = await User.findOne({ _id: voterId });
        await user.voted.pull({ _id: votingId });
        await user.save();
      }

      const deletedDocument = await Voting.findOneAndDelete({ _id: votingId });

      return deletedDocument;
    } catch (err) {
      console.log(err);
    }
  }
};
