const mongoose = require("mongoose");

// const solvedProblemSchema = require("./subSchema/SolvedProblem");
// const findOrCreate = require("mongoose-findorcreate");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    trim: true,
    required: true,
  },
  votingsCreatedByMe: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Voting",
    default: [],
  }
}, { timestamps: true });



// userSchema.plugin(findOrCreate);
module.exports = mongoose.model("User", userSchema);
