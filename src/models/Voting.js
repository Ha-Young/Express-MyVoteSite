const mongoose = require("mongoose");
const { Schema } = mongoose;

const votingSchema = new Schema({
  title: {
    type: String,
    require: true,
  },
  postedBy: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      index: true,
      require: true,
    },
    username: {
      type: String,
      ref: "User",
      require: true,
    },
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
    selector: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    }],
  }],
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  }],
});

votingSchema.pre(/^find/, async function(next) {
  await Voting.updateMany({ expiration: { $lte: new Date() }}, { progress: false });

  next();
});

const Voting = mongoose.model("Voting", votingSchema);

module.exports = Voting;
