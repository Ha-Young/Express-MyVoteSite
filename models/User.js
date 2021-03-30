const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const User = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  created_votings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "voting",
    },
  ],
});

User.pre("save", async function (next) {
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

module.exports = mongoose.model("user", User);
