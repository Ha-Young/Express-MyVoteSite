const Vote = require('../models/Vote');

const VoteService = {
  getContents: async (voteId, userId) => {
    try {
      const item = await Vote.findOne({ _id: voteId });
      let authority;
      const currentMillisecond = new Date().getTime();
      const returnObj = {
        authorId: item.authorId,
        voteId: item._id,
        voteTitle: item.title,
        voteDescription: item.description,
        voteChoice: item.choiceList,
        voteExpiredDate: item.expiredDate,
      };

      if (userId && String(item.authorId) === String(userId)) {
        authority = true;
      } else{
        authority = false;
      }

      if (!authority && currentMillisecond < item.expiredDate) {
        return returnObj;
      } else {
        const voteResult = [];

        for (let i = 0; i < item.choiceList.length; i++) {
          const countVote = item.participationList.filter(arg => String(arg.choice) === String(i)).length;
          voteResult[i] = countVote;
        }

        return {
          ...returnObj,
          voteResult: voteResult,
        };
      }
    } catch (error) {
      throw error;
    }
  },
  create: async item => {
    try {
      return await Vote.create(item);
    } catch (error) {
      throw error;
    }
  },
  getInProgress: async () => {
    try {
      const millisecond = new Date().getTime();
      return await Vote.find().gt('expiredDate', millisecond);
    } catch (error) {
      throw error;
    }
  },
  getExpired: async () => {
    try {
      const millisecond = new Date().getTime();
      return await Vote.find().lte('expiredDate', millisecond);
    } catch (error) {
      throw error;
    }
  },
  getMyVoting: async userId => {
    try {
      return await Vote.find({ authorId: userId });
    } catch (error) {
      throw error;
    }
  },
  setVoting: async (votingId, userId, choice) => {
    try {
      const filter = {
        _id: votingId
      };
      const voteItem = await Vote.findOne(filter);
      const result = voteItem.participationList.filter(obj => String(obj.userId) === String(userId)).length;

      if (!result) {
        const updateItem = {
          userId: userId,
          choice: choice,
        };
        const updateArray = [ ...voteItem.participationList, updateItem ];
        await Vote.findOneAndUpdate(filter, { participationList: updateArray }, { new: true });

        return true;
      }

      return false;
    } catch (error) {
      throw error;
    }
  },
  deleteVoting: async votingId => {
    try {
      const filter = {
        _id: votingId,
      };
      await Vote.findOneAndDelete(filter);
    } catch (error) {
      throw error;
    }
  },
};

module.exports = VoteService;