const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const voteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creatorId: { type: mongoose.Schema.Types.ObjectId, required: true },
  creatorName: { type: String, required: true },
  expiredAt: { type: Date, required: true },
  isVotable: { type: Boolean, default: true },
  options: { type: Object, required: true },
  winner: { type: String },
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
    
  }
}

voteSchema.methods.makeResult = async function() {
  const options = this.options;

  const biggestOption = Object.keys(options).reduce((acc, cur) => options[acc] > options[cur] ? acc : cur);

  this.winner = biggestOption;

  try {
    await this.save();
    return this;
  } catch (error) {

  }
}

module.exports = mongoose.model('Vote', voteSchema);
