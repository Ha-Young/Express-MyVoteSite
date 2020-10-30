const mongoose = require('mongoose');

// create voting Schema

const votingSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },

  options: [
    {
      text: {
        type: String,
        required: true,
      },

      count: {
        type: Number,
        default: 0,
      },

      voters: [Number],
    },

  ],

  voters: [Number],

  date: {
    type: Date,
    required: true,
  },

  creatorProfilId: {
    type: String,
    required: true,
  },

  userName: {
    type: String,
    required: true,
  },

  profileId: {
    type: Number,
    required: true,
  },

  isExpire: {
    type: Boolean,
    required: true,
  },

  canReVote: {
    type: Boolean,
    default: false,
  },
});

votingSchema.pre('save', (next) => {
  console.log('pre on..');
  try {
    if (!this.createAt) {
      this.createAt = new Date();
    }

    next();
  } catch (err) {
    next(err);
  }
});

// votingSchema.virtual('isExpired').get(() => {
//   // this.date.getTime() <= new Date().getTime()
//   console.log('virtual isExpired called..');
//   console.log('this:', this);
//   console.log('current date: ', new Date());
// });

votingSchema.methods.verifyExpireDate = function () {
  // console.log('this.date: ', this.date.getTime());
  return this.date.getTime() <= new Date().getTime();
};

votingSchema.post('save', (next) => {
  console.log('create db success');
});
module.exports = mongoose.model('Voting', votingSchema);
