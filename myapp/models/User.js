const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: [true, "이름을 입력하세요"] },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
