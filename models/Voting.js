const mongoose = require("mongoose");

const validateOptionsField = (options) => {
  return options.length >= 2;
};

const votingSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
  },
  writer: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  voter: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
    }],
  },
  expirationTime: {
    type: Date,
    require: true,
  },
  options: {
    type: [{
      name: { type: String, require: true },
      count: { type: Number, },
    }],
    validate: [validateOptionsField, "{PATH} options must be at least two."],
  },
  isAbleSelectMultipleOptions: {
    type: Boolean,
    require: true,
  },
});

module.exports = mongoose.model("Voting", votingSchema);
