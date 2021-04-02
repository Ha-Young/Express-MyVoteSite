const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const defaultUserImgUrl = 'https://ccbg.boun.edu.tr/sites/ccbg.boun.edu.tr/files/default_images/default-user-icon-4.jpg';

const voteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creatorId: { type: mongoose.Schema.Types.ObjectId, required: true },
  creatorName: { type: String, required: true },
  expiredAt: { type: Date, required: true },
  options: { type: Object, required: true },
  winner: { type: String },
  imgUrl: { type: String },
  creatorImgUrl: { type: String, default: defaultUserImgUrl},
  isVotable: { type: Boolean, default: true },
  completedVotes: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Vote' }],
}, {
  timestamps: true,
});

voteSchema.plugin(findOrCreate);

voteSchema.statics.updateIsVotable = async function() {
  const currentDate = new Date();

  const filter = {
    'isVotable': true, 
    'expiredAt': { '$lte': currentDate },
  };

  const update = {
    '$set': {
      'isVotable': false,
    },
  };

  try {
    await this.updateMany(filter, update);
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

voteSchema.methods.makeResult = async function() {
  const options = this.options;

  const biggestOption = Object.keys(options).reduce((acc, cur) => {
    return options[acc] > options[cur] ? acc : cur
  });

  this.winner = biggestOption;

  try {
    await this.save();
    return this;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

module.exports = mongoose.model('Vote', voteSchema);
