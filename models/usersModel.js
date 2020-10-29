const bcrypt = require('bcrypt');
const validator = require('validator');
const mongoose = require('mongoose');
const ALPHABET = require('../constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid email.'],
  },
  password: {
    type: String,
    required: true,
    min: 5,
    validate: {
      validator: function (password) {
        const regex = new RegExp(/^[a-zA-Z0-9]{5,10}$/);
        return regex.test(password);
      },
      message: 'Please make 5 to 10 digits password using both alphabets and numbers.'
    },
  },
  // passwordConfirm: {
  //  type: String,
  //   validator:  //디비에 넣지 않을 건데 유효성 검사를 위해서 스키마를 넣는건 이상한가요?
  createdVoting: Array,
});

const User = mongoose.model('User', userSchema);

userSchema.pre('save', async function (next) {
  console.log('pre')
  try {
    // console.log(this.isModified('password'), 'isM');

    const encrypted = await bcrypt.hash(this.password, Number(process.env.SALT));

    this.password = encrypted;
    this.passwordConfirm = undefined;
    next();
  } catch (err) {
    next(err);
  }
});

userSchema.pre('save', async function (next) {
  console.log('pre 2nd')
  try {

    const checkDuplication = await User.findById(this._id);
    console.log(checkDuplication, 'chD')
  } catch (err) {
    console.log(err, 'pre 2nd')
  }

})


userSchema.methods.verifyPassword = async (plainPassword, encrypted) => {
  return await bcrypt.compare(plainPassword, encrypted);
};

module.exports = User;
