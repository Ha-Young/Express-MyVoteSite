const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const optionSchema = new Schema({
  title: String,
  voted_user: [{type: Schema.Types.ObjectId, ref: 'User'}]
}, { _id: false });

const voteSchema = new Schema({
  user_id: {type: Schema.Types.ObjectId, ref: 'User'},
  title: {
    type: String,
    required: [true, 'Title required'],
    trim: true
  },
  created_at: Date,
  options: [optionSchema]
});

module.exports = mongoose.model('Vote', voteSchema);
