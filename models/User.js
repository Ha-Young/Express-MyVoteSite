const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  // 유저가 새롭게 만들어지거나, 패스워드가 변경되었을 때에만 해싱
  if (!this.isModified('password')) {
    return next();
  }

  // 해싱
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};

module.exports = mongoose.model('User', userSchema);
