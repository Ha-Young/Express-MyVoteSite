const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  is_google_loggedin: {
    type: Boolean
  },
  password: {
    type: String
  },
  casted_votes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vote"
  }]
});

userSchema.pre("save", async function(next) {
  const user = this;

  if (user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;
      next();
    } catch (err) {
      next(err);
    }
  }
});

module.exports = mongoose.model("User", userSchema);
