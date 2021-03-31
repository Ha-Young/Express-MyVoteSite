const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const voteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  creatorId: { type: mongoose.Schema.Types.ObjectId, required: true },
  creatorName: { type: String, required: true },
  expiredAt: { type: Date, required: true },
  isVotable: { type: Boolean, default: true },
  // TODO: minimum options length is 2
  // options: [{
  //   name: { type: String },
  //   count: { type: Number },
  // }],
  options: { type: Object, required: true },
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
    '$set': { 'isVotable': false },
  };

  try {
    await this.updateMany(filter, update);
  } catch (error) {
    
  }
}

module.exports = mongoose.model('Vote', voteSchema);
