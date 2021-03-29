const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  name: { type: String, maxlength:20, require: true },
  email: { type: String, require: true, unique: true, index: true, },
  password: { type: String, },
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    try {
      const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
      user.password = await bcrypt.hash(user.password, salt);

      next();
    } catch (err) {
      return next(err);
    }
  }
});

module.exports = mongoose.model("User", userSchema);
