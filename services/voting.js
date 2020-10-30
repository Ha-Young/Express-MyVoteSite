const User = require('../models/User');
const Voting = require('../models/Voting');

const { convertToVotingObject } = require('../util/voting');

class VotingService {
  constructor(id) {
    this.id = id;
  }

  async get() {
    const voting = await Voting.findById(this.id);
    return voting;
  }
  async create(userId, userInputs) {
    const newVotingObject = convertToVotingObject(userId, userInputs);

    const newVoting = await Voting.create(newVotingObject);
    const currentUser = await User.findById(userId);

    currentUser.myVotings.addToSet(newVoting._id);
    await currentUser.save();

    this.id = newVoting._id;
    return newVoting;
  }

  async delete() {
    const deletedVoting = await Voting.findByIdAndDelete(this.id);
    const createdBy = await User.findById(deletedVoting.createdBy);

    createdBy.myVotings.pull(deletedVoting._id);
    await createdBy.save();

    return { deletedVoting, createdBy };
  }

  async vote(userId, optionId) {
    const voting = await this.get();
    const added = voting.voters.addToSet(userId);
    await voting.save();

    const selectedOption = voting.options.find(
      option => option._id.toString() === optionId
    );

    if (added) {
      selectedOption.count += 1;
      await voting.save();
    }

    return { voting, selectedOption };
  }

  static async getAll(sortingBy) {
    let sortingCondition = {};

    if (sortingBy) {
      sortingCondition = { [sortingBy]: -1 };
    }

    const votings = await Voting.find().sort(sortingCondition).populate('createdBy');

    return votings;
  }

  static async byUserId(userId, sortingBy) {
    const user = await User.findById(userId).populate('myVotings');
    const votings = user.myVotings;

    if (sortingBy) {
      votings.sort((a, b) => b[sortingBy] - a[sortingBy]);
    }

    return votings;
  }
}

module.exports = VotingService;
