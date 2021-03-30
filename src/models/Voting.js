const mongoose = require("mongoose");
const { Schema } = mongoose;

const votingSchema = new Schema({
  title: {
    type: String,
    lowercase: true,
    require: true,
    unique: true,
    index: true,
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
  progressing: {
    type: Boolean,
    default: true,
    require: true,
  },
  options: [{
    title: {
      type: String,
      unique: true,
      require: true,
    },
    count: {
      type: Number,
      default: 0,
      require: true,
    }
  }],
  paticipant: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
    unique: true,
  }],
});

module.exports = mongoose.model("Voting", votingSchema);
