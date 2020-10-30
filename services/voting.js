const Voting = require('../models/Voting');
const User = require('../models/User');

module.exports = class VotingServices {
  constructor () {
  }

  async findVoting (votingDTO) {
    const votings = await Voting.find(votingDTO);

    return votings;
  }

  async findUserVotings (username) {
    const result = await (await User.findOne({ username }).populate('voted'));

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
    }
  }

  async deleteVoting (votingId) {
    // 삭제하려는 투표에 투표한 유저들의 정보
    const voters = await Voting.findOne({ _id: votingId }).populate('voters');
    // 그들이 투표한 전체 투표 정보 목록에서 삭제하려는 투표의 아이디를 삭제(..;)
    console.log(voters);
    voters.voters.forEach(async (voter) => {
      console.log(voter.voted)
      await voter.voted.pull({ _id: votingId });
      console.log(voter.voted)
      // await voter.save();
    });

    console.log('after removing votes from list...', voters);

  }
};
