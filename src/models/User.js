const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    required: true,
    validate: {
      validator: function (el) {
        return el.match(/^([\w-]+@([\w-]+\.)+[\w-]{2,4})?$/);
      },
      message: "Invalid email",
    },
  },
  username: {
    type: String,
    required: true,
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
