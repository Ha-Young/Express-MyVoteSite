const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const votingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  isCanceled: {
    type: Boolean,
    default: false,
  },
  expireDate: {
    type: String,
    required: true,
  },
  createdBy: { type: Schema.Types.ObjectId, ref: "user" },
  voters: [{ type: Schema.Types.ObjectId, ref: "user" }],
  options: [
    {
      name: {
        type: String,
        required: true,
      },
      voteCount: {
        type: Number,
        default: 0,
      },
    },
  ],
});

module.exports = mongoose.model("voting", votingSchema);
