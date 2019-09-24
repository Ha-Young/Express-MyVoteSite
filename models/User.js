const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const findOrCreate = require('mongoose-findorcreate');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
  },
  profile_img_url: {
    type: String,
    default: 'https://image.flaticon.com/icons/svg/74/74472.svg'
  }
}, {
  timestamps: true
});

// userSchema.plugin(findOrCreate);
const SALT_ROUNDS = 10;

userSchema.pre('save', async function(next) {
  try {
    const user = this;
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.validatePassword = async function(password) {
  try {
    const user = this;
    const isValidPassword = await bcrypt.compare(password, user.password);
    return isValidPassword;
  } catch (error) {
    next(error);
  }
};

module.exports = mongoose.model('User', userSchema);
