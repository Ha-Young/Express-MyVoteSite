import mongoose from 'mongoose';

const schema = mongoose.Schema({
  subject: {
    type: String,
    required: true
  },
  options: [
    {
      value: { type: String, required: true },
      voter: {
        type: [{
          type: mongoose.Types.ObjectId,
          ref: 'User',
          unique: true
        }],
        default: []
      }
    }
  ],
  created_at: {
    type: Date,
    default: Date.now,
    required: true
  },
  expirated: {
    type: Date,
    required: true
  },
  creator: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

const Vote = mongoose.model('Vote', schema);

export default Vote;
