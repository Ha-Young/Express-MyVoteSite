const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  title: {
    type: String
  },
  selectOptions: {
    type: Array,
    validate: {
      validator: function () {
        return this.selectOptions.length > 1
      },
      message: 'selectOptions should more than 2'
    }
  },
  expireDate: Date
});

const Voting = mongoose.model('Voting', userSchema);

module.exports = Voting;