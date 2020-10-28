const Voting = require('../models/Voting');

module.exports = class VotingServices {
  constructor () {
  }

  async findVoting (votingDTO) {
    const result = await Voting.find(votingDTO);

    return result;
  }

  async createVoting (votingDTO) {
    const { subject, description, expireTo, candidates } = votingDTO;

    const result = await Voting.create({
      subject,
      description,
      expiredAt: new Date(+new Date() + expireTo * 60 * 60 * 1000),
      candidates
    });

    return result;
  }
};
