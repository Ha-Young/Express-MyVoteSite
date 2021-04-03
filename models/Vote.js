const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');
const { getRandomImage } = require('../util/getRandomImage');

const voteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'title is required.'],
  },
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'creatorId is required.'],
  },
  expiredAt: {
    type: Date,
    required: [true, 'expire date is required.'],
  },
  options: {
    type: Object,
    required: [true, 'options are required.'],
  },
  creatorName: {
    type: String,
    required: [true, 'creator name is required.'],
  },
  isVotable: {
    type: Boolean,
    default: true,
  },
  creatorImgUrl: {
    type: String,
  },
  winner: {
    type: String,
  },
  imgUrl: {
    type: String,
    default: getRandomImage(),
  },
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
    return options[acc] > options[cur] ? acc : cur;
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
