const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const Voting = require("./Voting");

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
  const user = this;
  const hash = await bcrypt.hash(this.password, 10);

  this.password = hash;
  next();
});

// User.post("updateOne", removeLinkedDocuments);

// async function removeLinkedDocuments(document) {
//   console.log(document);
//   await Voting.deleteOne({ _id: { $in: document.created_votings } });
// }

module.exports = mongoose.model("user", User);
