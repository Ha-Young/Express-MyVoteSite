const mongoose = require('mongoose');

const option = {
  createdAt: 'created_at',
  updatedAt: 'updated_at',
};
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
    unique: true,
  },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  }
}, option);

module.exports = mongoose.model('User', userSchema);
