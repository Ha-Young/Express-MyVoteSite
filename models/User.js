const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const defaultUserImgUrl = 'https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required'],
    validate: {
      validator: (email) => email.match(/^([\w-]+@([\w-]+\.)+[\w-]{2,4})?$/),
      message: 'please enter a valid email',
    },
  },
  avatarUrl: { type: String, default: defaultUserImgUrl },
  githubId: { type: String },
  password: { type: String },
  completedVotes: [{ type: mongoose.Schema.Types.ObjectID, ref: 'Vote' }],
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
    throw new Error(error);
  }
}

module.exports = mongoose.model('User', userSchema);
