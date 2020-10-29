const mongoose = require('mongoose');
const User = require('./usersModel');

const selectOptionsSchema = new mongoose.Schema({
  option: String,
  votedUsers: Array,
});

const votingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      validate: [
        {
          validator: function (title) {
            while (title.includes(' ')) {
              title = title.replace(' ', '');
            }
            if (!title.length) return false;
          },
          message: 'Using only space is not allowed for the Vote Title.',
        },
        {
          validator: function (title) {
            const converted = Number(title);
            if (!Number.isNaN(converted)) return false;
          },
          message: 'Using only number is not allowed for the Vote Title.',
        },
      ],
    },
    selectOptions: {
      type: [selectOptionsSchema],
      validate: {
        validator: function (selectOptions) {
          if (selectOptions.length < 2) return false;

          const filtered = selectOptions.filter(
            (selectOption) => selectOption.option
          );
          console.log(filtered, 'in SO val');
          if (filtered.length < 2) return false;
        },
        message: 'Please write more than 2 select options.',
      },
    },
    description: String,
    expireDate: Date,
    creator: Object,
  },
  {
    timestamps: { createdAt: 'created_at' },
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

votingSchema.virtual('isContinuing').get(function () {
  const presentTime = new Date().toISOString();
  const expireDate = this.expireDate.toISOString();

  return expireDate > presentTime;
});

votingSchema.methods.sperateOption = async (id) => {
  const max = await Voting.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) },
    },
    {
      $unwind: '$selectOptions',
    },
  ]);

  // console.log(max, '/:id route method middleware in findResult');
  return max;
};

const Voting = mongoose.model('Voting', votingSchema);

module.exports = Voting;
