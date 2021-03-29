const mongoose = require("mongoose");
const moment = require("moment");

const Voting = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
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

module.exports = mongoose.model("voting", Voting);
