const mongoose = require('mongoose');
const { Schema } = mongoose;

const pollSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  authorname: {
    type: String,
    required: true,
  },
  authorid: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  expirydate: {
    type: Schema.Types.Mixed,
    required: true,
  },
  options: [
    {
      name: { type: Schema.Types.Mixed, required: true },
      count: {
        type: Number,
        default: 0,
        required: true,
      },
    },
  ],
});

module.exports = mongoose.model('Poll', pollSchema);
