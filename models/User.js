const mongoose = require('mongoose');
const findOneOrCreate = require('mongoose-find-one-or-create');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  votingList: Array,
  createList: Array,
},{
  timestamps: true,
});
UserSchema.plugin(findOneOrCreate);
UserSchema.methods.comparePassword = function (inputPassword, cb) {
  if (inputPassword === this.password) return cb(null, true);
  return cb('error');
};

module.exports = mongoose.model('User', UserSchema);
