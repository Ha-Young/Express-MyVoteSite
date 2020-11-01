const mongoose = require('mongoose');

const oid = mongoose.Schema.Types.ObjectId;
const VoteSchema = new mongoose.Schema({
  authorId: {
    type: oid,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: String,
  choiceList: Array,
  participationList: Array,
  expiredDate: {
    type: Number,
    required: true,
  }
},{
  timestamps: true,
});

module.exports = mongoose.model('Vote', VoteSchema);

