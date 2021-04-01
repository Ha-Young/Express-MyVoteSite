const mongoose = require("mongoose");
const moment = require("moment");

const User = require("./User");

const Voting = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  creator_username: {
    type: String,
    required: true,
  },
  due_date: {
    type: String,
    default: moment().format("YYYY-MM-DD hh:mm:ss"),
  },
  status: {
    type: String,
    enum: ["PROCEEDING", "CLOSED"],
    default: "PROCEEDING",
  },
  candidates: [
    {
      name: {
        type: String,
        required: true,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  ],
});

Voting.post("deleteOne", async function (document) {
  const votingId = this.getFilter()["_id"];
  const creatorId = this.getFilter()["creator"];

  await User.updateMany(
    { _id: creatorId },
    { $pull: { created_votings: votingId } });

  await User.updateMany(
    {},
    { $pull: { participated_votings: votingId } }
  );
});

module.exports = mongoose.model("voting", Voting);
