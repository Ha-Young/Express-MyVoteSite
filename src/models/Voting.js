import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const optionSchema = new Schema({
  _id: false,
  title: {
    type: String,
    unique: true,
    required: true
  },
  count: {
    type: Number,
    default: 0
  }
});

const votingSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  organizer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  option_list: {
    type: [optionSchema],
    required: true
  },
  expired_at: {
    type: Date,
    required: true
  }
}, {
  timestamps: true
});

export default model('Voting', votingSchema);
