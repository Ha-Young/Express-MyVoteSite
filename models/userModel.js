const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const { Schema } = mongoose;
const {
  Types: { ObjectId },
} = Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "이름을 입력하세요."],
    trim: true,
    maxlength: [30, "이름은 2글자에서 30글자 이내 여야 합니다."],
    minlength: [2, "이름은 2글자에서 30글자 이내 여야 합니다."],
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
    required: [true, "비밀번호를 한번 더 입력해주세요."],
    validate: {
      validator: function(confirmPassword) {
        return this.password === confirmPassword;
      },
      message: "비밀번호가 일치하지 않습니다.",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  createdVotings: {
    type: [ObjectId],
    ref: "Voting",
    default: [],
  },
  votedVotings: {
    type: [ObjectId],
    ref: "Voting",
    default: [],
  },
});

UserSchema.pre("save", async function(next) {
  if (!this.isModified("password")) {
    return next();
  }

  const salt = await bcrypt.genSalt(parseInt(process.env.BCRYPT_SALT, 10));
  this.password = await bcrypt.hash(this.password, salt);
  this.passwordConfirm = undefined;

  next();
});

UserSchema.pre("save", (next) => {
  if (!this.isModified("password") || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now() - 1000;
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

  return false;
};

UserSchema.methods.createPasswordResetToken = () => {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
