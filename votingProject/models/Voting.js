const mongoose = require("mongoose");
const ObjectId = require("mongoose").Types.ObjectId;

const votingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  created_by: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  expired_date: {
    type: Date,
    required: true
  },
  options: [
    {
      title: { type: String, required: true },
      people: [{ type: ObjectId, ref: "User" }]
    }
  ]
});

module.exports = mongoose.model("Voting", votingSchema);
