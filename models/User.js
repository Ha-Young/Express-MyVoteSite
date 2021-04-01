const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  avatarUrl: { type: String },
  githubId: { type: String },
  password: { type: String },
  completedVotes: [{ type: mongoose.Schema.Types.ObjectID, ref: "Vote" }],
}, {
  timestamps: true,
});

userSchema.plugin(findOrCreate);

userSchema.statics.addCompletedVotesById = async function(userId, voteId) {
  try {
    const user = await this.findById(userId);
    user.completedVotes.push(voteId);

    await user.save();
  } catch (error) {
    throw new Error(error);
  }
}

// TODO : delete me.

userSchema.statics.deleteCompletedVotes = async function(voteId) {
  const filter = {
    'completedVotes': { '$elemMatch': { '$eq': voteId } },
  };

  const update = {
    '$pull': {
      'completedVotes': voteId,
    },
  };

  try {
    await this.updateMany(filter, update);
  } catch (error) {

  }
}

module.exports = mongoose.model("User", userSchema);
