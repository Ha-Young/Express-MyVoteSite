const mongoose = require('mongoose');

const VoteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  finish_date: { type: Date, required: true },
  status: {
    type: String,
    enum: ['inprogress', 'finished'],
    required: true
  },
  options: [{
    type: String,
    validate: {
      validator: function () {
        return (this.options > 1);
      },
      message: props => `${props.value}'s minimum array size is (2)`
    },
    required: true
  }]
});

module.exports = mongoose.model('Vote', VoteSchema);
