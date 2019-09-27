const mongoose = require("mongoose");
const ObjectId = require("mongoose").Schema.Types.ObjectId;

const voteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  host: {
    type: ObjectId,
    ref: "User"
  },
  expiration: {
    type: Date,
    required: true
  },
  options: [
    {
      people: [{ type: ObjectId, ref: "User" }],
      title: { type: String, required: true }
    }
  ]
});

module.exports = mongoose.model("Vote", voteSchema);
