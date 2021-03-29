const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const { ObjectId } = Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "User must have a name"],
    trim: true,
    maxlength: [30, "User name must have less or equal than 40 characters"],
    minlength: [1, "User name must have more or equal than 1 characters"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "User must have a email"],
    trim: true,
    validate: [validator.isEmail, "Invalid Email Style"],
  },
  password: {
    type: String,
    required: [true, "User must have a login password"],
    minlength: [8, "Password must have more or equal than 8 characters"],
  },
  createVotings: {
    type: [ObjectId],
    ref: "Voting",
  },
  participateVoting: {
    type: [ObjectId],
    ref: "Voting",
  },
});

UserSchema.methods.comparePassword = function(plainPassword, cb) {
  bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
