const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "이름을 입력하세요."],
    trim: true,
    maxlength: [30, "이름은 1글자 ~ 30글자여야 합니다."],
    minlength: [1, "이름은 1글자 ~ 30글자여야 합니다."],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "이메일 주소를 입력하세요."],
    trim: true,
    validate: [validator.isEmail, "유효하지 않은 메일 주소입니다."],
  },
  password: {
    type: String,
    required: [true, "비밀번호를 입력하세요."],
    minlength: [8, "비밀번호는 8글자 이상이어야 합니다."],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "비밀번호를 한 번 더 입력해주세요."],
    validate: {
      validator: (val) => this.password === val,
      message: "비밀번호가 일치하지 않습니다.",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  createVotings: {
    type: [ObjectId],
    ref: "Voting",
    default: [],
  },
  participateVotings: {
    type: [ObjectId],
    ref: "Voting",
    default: [],
  },
});

UserSchema.pre("save", async (next) => {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(process.env.BCRYPT_SALT);
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;

  next();
});

UserSchema.methods.comparePassword = async (loginPassword, savedPassword) => {
  return await bcrypt.compare(loginPassword, savedPassword);
};

UserSchema.methods.changedPasswordAfter = (JWTTimestamp) => {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  // means not changed
  return false;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
