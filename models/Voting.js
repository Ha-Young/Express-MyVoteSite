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
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "User",
  },
  voter: {
    type: Object,
  },
  expirationTime: {
    type: Date,
    require: true,
  },
  options: {
    type: Map,
    validate: [validateOptionsField, "{PATH} options must be at least two."],
  },
  isAbleSelectMultipleOptions: {
    type: Boolean,
    require: true,
  },
});

module.exports = mongoose.model("Voting", votingSchema);
