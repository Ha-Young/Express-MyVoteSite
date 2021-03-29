const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const votingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isFinished: {
    type: Boolean,
    default: false,
  },
  expireDate: {
    type: Date.now,
    default: Date.now,
  },
  createdBy: [{ type: Schema.Types.ObjectId, ref: "user" }],
  options: [
    {
      name: {
        type: String,
        required: true,
      },
      voteCount: {
        type: Number,
        required: true,
      },
      selectedBy: [{ type: Schema.Types.ObjectId, ref: "user" }],
    },
  ],
});

module.exports = mongoose.model("voting", votingSchema);
