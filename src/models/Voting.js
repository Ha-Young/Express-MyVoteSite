const mongoose = require("mongoose");
const { Schema } = mongoose;
const { checkExpiration } = require("../utils/validates");

const votingSchema = new Schema({
  title: {
    type: String,
    require: true,
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
    count: {
      type: Number,
      default: 0,
      require: true,
    }
  }],
  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    index: true,
    unique: true,
  }],
});

votingSchema.post(/^find/, (docs, next) => {
  if (Array.isArray(docs)) {
    docs.forEach(doc => {
      if (!checkExpiration(new Date(doc.expiration))) {
        doc.progress = false;
      }
    });
  } else {
    if (!checkExpiration(new Date(docs.expiration))) {
      docs.progress = false;
    }
  }

  next();
});

module.exports = mongoose.model("Voting", votingSchema);
