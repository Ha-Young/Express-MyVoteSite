const mongoose = require('mongoose');

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

module.exports = mongoose.model('Voting', votingSchema);
