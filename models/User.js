const mongoose = require('mongoose');
const { Schema, Types: { ObjectId } } = mongoose;
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
    },
    voted: [ {
      type: ObjectId,
      ref: 'Voting'
    } ]
  },
  { timestamps: true }
);

userSchema.pre('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (plaintext, callback) {
  return callback(null, bcrypt.compareSync(plaintext, this.password));
};

module.exports = mongoose.model('User', userSchema);
