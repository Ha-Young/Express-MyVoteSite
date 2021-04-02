const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    maxLength: 15,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minLength: 5,
    required: true,
  },
  created_votes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Vote",
    default: []
  }
});

UserSchema.methods.verifyPassword = async (plainPassword, encodedPassword) => {
  const result = await bcrypt.compare(plainPassword, encodedPassword);
  return result;
}

module.exports = mongoose.model("User", UserSchema);
