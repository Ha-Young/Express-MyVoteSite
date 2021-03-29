const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "이메일을 입력해주세요"],
  },
  password: {
    type: String,
    required: [true, "비밀번호를 입력해주세요"],
  },
  _salt: {
    type: String,
    required: [true, "salt is required"],
  },
  user_name: {
    type: String,
    required: [true, "사용자 이름(별명)을 입력해주세요"],
  },
  votings: [{
    type: mongoose.ObjectId,
    ref: "Vote",
  }],
}, { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

module.exports = mongoose.model("User", UserSchema);
