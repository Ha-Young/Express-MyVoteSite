const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const defaultUserImgUrl = 'https://www.seekpng.com/png/detail/428-4287240_no-avatar-user-circle-icon-png.png';
const VALID_EMAIL_REGEX = /^([\w-]+@([\w-]+\.)+[\w-]{2,4})?$/;

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'email is required'],
    validate: {
      validator: (email) => VALID_EMAIL_REGEX.test(email),
      message: 'please enter a valid email',
    },
    trim: true,
  },
  avatarUrl: {
    type: String,
    default: defaultUserImgUrl,
  },
  completedVotes: [{
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Vote',
  }],
  githubId: {
    type: String,
  },
  password: {
    type: String,
    trim: true,
  },
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
    'completedVotes': {
      '$elemMatch': {
        '$eq': voteId,
      }
    },
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
