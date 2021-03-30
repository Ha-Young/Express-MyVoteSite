const mongoose = require("mongoose");
const { Schema } = mongoose;

const votingSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  expiration: {
    type: Date,
    require: true,
  },
  progress: {
    type: Boolean,
    default: true,
    require: true,
  },
  options: [{
    title: {
      type: String,
      require: true,
    },
    count: {
      type: Number,
      default: 0,
      require: true,
    }
  }],
  paticipants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
    unique: true,
  }],
});

module.exports = mongoose.model("Voting", votingSchema);
