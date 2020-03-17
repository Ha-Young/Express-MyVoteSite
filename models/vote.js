import mongoose from "mongoose";

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  options: [
    {
      title: { type: String, required: true },
      received: {
        type: [{
          type: mongoose.Types.ObjectId,
          ref: 'User'
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
