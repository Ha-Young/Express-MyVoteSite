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
      currentVotingData.isVotingClosed = isVotingExpired(
        currentVotingData.expiredTime
      );

      currentVotingData.expiredTime = dateFormat(
        currentVotingData.expiredTime,
        'yyyy-mm-dd h:MM'
      );
    });

    return votingData;
  }

  async getmyVotingData(userId) {
    let myVotingData;

    try {
      const { votings } = await this.userModel
        .findById(userId)
        .populate('votings')
        .lean();

      myVotingData = votings;
    } catch (error) {
      next(error);
    }

    myVotingData.forEach((currentVotingData) => {
      currentVotingData.isVotingClosed = isVotingExpired(
        currentVotingData.expiredTime
      );

      currentVotingData.expiredTime = dateFormat(
        currentVotingData.expiredTime,
        'yyyy-mm-dd h:MM'
      );
    });

    return myVotingData;
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
    filteredVotingData.isVotingClosed = isVotingExpired(
      filteredVotingData.expiredTime
    );

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

  async createVotingData(votingData, userId, username) {
    const {
      vote_title: votingTitle,
      vote_list: votingLists,
      vote_expired_time: votingExpiredTime,
    } = votingData;

    const mappedVotingLists = votingLists
      .filter((votingList) => votingList !== '')
      .map((votingList) => {
        return { listTitle: votingList };
      });

    const newVotingData = {
      title: votingTitle,
      creator: username,
      votingLists: mappedVotingLists,
      expiredTime: votingExpiredTime,
    };

    let newVoting;

    try {
      newVoting = await this.votingModel.create(newVotingData);
    } catch (err) {
      res.redirect(`${routes.votings}${routes.failure}`);
      return;
    }

    try {
      await this.userModel.findByIdAndUpdate(userId, {
        $push: { votings: newVoting._id },
      });
    } catch (err) {
      next(err);
      return;
    }
  }
};
