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
    // isExpired: { // virtual
    //   type: Boolean,
    //   default: false,
    // },
    // creator: String, // virtual
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

votingSchema.virtual('host', async function (cb) {
  console.log(this._id, 'vote id in host virtual');
  const [host] = await User.find({ createdVoting: { $eq: this._id } });
  console.log(host.email, 'host virtual');
  if (host) cb(host.email);

  cb(null);
});

// votingSchema.virtual('host').get(async function () {
//   console.log(this._id, 'vote id in host virtual');
//   const [host] = await User.find({ createdVoting: { $eq: this._id } });
//   console.log(host.email, 'host virtual');
//   return host.email;
// });

votingSchema.methods.findMax = async (id) => {
  const max = await Voting.aggregate([
    {
      $match: { _id: new mongoose.Types.ObjectId(id) },
    },
    {
      $unwind: '$selectOptions',
    },
    {
      $group: {
        _id: null,
        max: { $max: '$selectOptions.count' },
      },
    },
  ]);
  return max[0];
};

const Voting = mongoose.model('Voting', votingSchema);

module.exports = Voting;
