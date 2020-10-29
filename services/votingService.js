const dateFormat = require('dateformat');
const isVotingExpired = require('../utils/isVotingExpired');

module.exports = class VotingService {
  constructor(votingModel, userModel) {
    this.votingModel = votingModel;
    this.userModel = userModel;
  }

  async getAllVotingData() {
    let votingData;

    try {
      votingData = await this.votingModel.find().lean();
    } catch (error) {
      throw new Error(error);
    }

    votingData.forEach((currentVotingData) => {
      currentVotingData.isVotingClosed = isVotingExpired(currentVotingData);
      currentVotingData.expiredTime = dateFormat(
        currentVotingData.expiredTime,
        'yyyy-mm-dd h:MM'
      );
    });

    return votingData;
  }

  async getVotingDetailData(votingId, userId, username) {
    let votingData;

    try {
      votingData = await this.votingModel.findById(votingId);
    } catch (error) {
      next(error);
    }

    const filteredVotingData = {
      title: votingData.title,
      creator: votingData.creator,
      votingId: votingData._id,
      votingLists: votingData.votingLists,
      expiredTime: votingData.expiredTime,
    };

    filteredVotingData.isUserCreator = username === votingData.creator;
    filteredVotingData.isVotingClosed = isVotingExpired(filteredVotingData);
    filteredVotingData.expiredTime = dateFormat(
      filteredVotingData.expiredTime,
      'yyyy-mm-dd h:MM'
    );
    filteredVotingData.isUserParticipated = votingData.participants.includes(
      userId && userId.toString()
    );

    return filteredVotingData;
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
      throw new Error(error);
    }
  }

  async deleteVotingData(votingId, userId) {
    try {
      await this.votingModel.findByIdAndDelete(votingId);
    } catch (error) {
      throw new Error(error);
    }

    try {
      await this.userModel.findByIdAndUpdate(userId, {
        $pull: { votings: votingId },
      });
    } catch (error) {
      throw new Error(error);
    }
  }
};
