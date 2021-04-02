const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  participated_votings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "voting"
    }
  ],
  created_votings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "voting"
    }
  ]
});

User.pre("save", async function (next) {
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

module.exports = mongoose.model("user", User);
