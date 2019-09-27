const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;
const { EMAIL_RULE, IMG_URL_RULE, SALT_ROUNDS } = require('./constants/constants');

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    match: [ EMAIL_RULE, 'Please fill a valid email address']
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    minlength: 6,
    maxlength: 16,
    required: true,
    trim: true
  },
  profile_img_url: {
    type: String,
    trim: true,
    match: [ IMG_URL_RULE, 'Please fill a valid Image Url'],
    default: 'https://image.flaticon.com/icons/svg/74/74472.svg'
  }
}, {
  timestamps: true
});

userSchema.pre('save', async function(next) {
  try {
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hash = await bcrypt.hash(this.password, salt);
    this.password = hash;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.methods.validatePassword = async function(password) {
  const isValidPassword = await bcrypt.compare(password, this.password);
  return isValidPassword;
};

module.exports = mongoose.model('User', userSchema);
