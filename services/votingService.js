const { ERROR } = require('../constants/');

module.exports = class VotingService {
  constructor(votingModel, userModel) {
    this.votingModel = votingModel;
    this.userModel = userModel;
  }

  async getAllVotingData() {
    try {
      const votingData = await this.votingModel.find().lean();
      return votingData;
    } catch (error) {
      console.log(error);
      throw new Error(ERROR.SERVER);
    }
  }

  async getMyVotingData(userId) {
    try {
      const { votings } = await this.userModel
        .findById(userId)
        .populate('votings')
        .lean();

      return votings;
    } catch (error) {
      console.log(error);
      throw new Error(ERROR.SERVER);
    }
  }

  async getVotingDetailData(votingId) {
    try {
      const votingData = await this.votingModel.findById(votingId);
      return votingData;
    } catch (error) {
      console.log(error);
      throw new Error(ERROR.SERVER);
    }
  }

  async updateVotingDetail(votingId, userId, listId) {
    try {
      await this.votingModel.findOneAndUpdate(
        { _id: votingId, 'votingLists._id': listId },
        {
          $addToSet: {
            participants: userId,
            'votingLists.$.voter': userId,
          },
        }
      );
    } catch (error) {
      console.log(error);
      throw new Error(ERROR.SERVER);
    }
  }

  async deleteVotingData(votingId, userId) {
    try {
      await this.votingModel.findByIdAndDelete(votingId);
    } catch (error) {
      console.log(error);
      throw new Error(ERROR.SERVER);
    }

    try {
      await this.userModel.findByIdAndUpdate(userId, {
        $pull: { votings: votingId },
      });
    } catch (error) {
      console.log(error);
      throw new Error(ERROR.SERVER);
    }
  }

  async createVotingData(votingData, userId) {
    let newVoting;

    try {
      newVoting = await this.votingModel.create(votingData);
    } catch (error) {
      console.log(error);
      throw new Error(ERROR.SERVER);
    }

    try {
      await this.userModel.findByIdAndUpdate(userId, {
        $push: { votings: newVoting._id },
      });
    } catch (error) {
      console.log(error);
      throw new Error(ERROR.SERVER);
    }
  }
};
