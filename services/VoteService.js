const Vote = require('../models/Vote');
const User = require('../models/User');

const checkExpire = require('../utils/checkExpire');

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
    } catch (error) {
      throw error;
    }
  }

  static async findVote(id) {
    try {
      const vote = await Vote.findById(id).populate('author', 'name');
      if (!vote) {
        return { type: 'error', payload: { message: 'Cannot found the vote' } };
      }
      return { type: 'success', payload: vote };
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

      if (!checkExpire(targetExpire)) {
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
        return { type: 'success', payload: { message: 'Succeed voting!' } };
      }

      return { type: 'error', payload: { message: 'The vote is expired' } };
    } catch (error) {
      throw error;
    }
  }
}

module.exports = VoteService;
