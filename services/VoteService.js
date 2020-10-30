const Vote = require('../models/Vote');
const User = require('../models/User');

const { createAction } = require('./ActionCreator');
const { SUCCESS, ERROR } = require('../config/constants');
const checkExpiration = require('../utils/checkExpiration');

class VoteService {
  constructor(vote) {
    this.title = vote.title;
    this.expireAt = vote.expireAt;
    this.itemList = vote.itemList;
  }

  async createNewVote(user) {
    try {
      const newVote = await Vote.create({
        title: this.title,
        author: user._id,
        expireAt: this.expireAt,
        candidateList: this.itemList.map((item) => {
          return {
            title: item,
            count: 0
          };
        })
      });

      const updatedUser = await User.findByIdAndUpdate(user._id, {
        $push: { myVoteList: newVote._id }
      });

      updatedUser.save();

      return createAction(SUCCESS);
    } catch (error) {
      throw error;
    }
  }

  static async getVotings() {
    try {
      const votingList = await Vote.find().populate('author', 'name');
      return votingList;
    } catch (error) {
      throw error;
    }
  }

  static async findVote(id) {
    try {
      const vote = await Vote.findById(id).populate('author', 'name');
      if (!vote) {
        return createAction(ERROR, '10');
      }
      return createAction(SUCCESS, vote);
    } catch (error) {
      throw error;
    }
  }

  static async deleteVote(id) {
    try {
      await Vote.deleteOne({ _id: id });
    } catch (error) {
      throw error;
    }
  }

  static async castVote(id, user, body) {
    try {
      const vote = await Vote.findById(id);
      const targetItem = vote.candidateList.find((item) => item.title === body.item);
      const targetExpire = vote.expireAt;

      if (checkExpiration(targetExpire)) {
        return createAction(ERROR, '11');
      }

      const newCount = (targetItem.count += 1);

      await Vote.updateOne(
        { _id: id, 'candidateList.title': body.item },
        {
          $push: { participatedUser: user._id },
          $set: {
            'candidateList.$.count': newCount
          }
        }
      );

      return createAction(SUCCESS);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = VoteService;
