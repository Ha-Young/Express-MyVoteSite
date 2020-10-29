const bcrypt = require('bcrypt');
const validator = require('validator');
const mongoose = require('mongoose');
const ALPHABET = require('../constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    validate: [validator.isEmail, 'Please provide a valid form of an email.'],
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
      message:
        'Please make 5 to 10 digits password using both alphabets and numbers.',
    },
  },
  // passwordConfirm: {
  //  type: String,
  //   validator:  //디비에 넣지 않을 건데 유효성 검사를 위해서 스키마를 넣는건 이상한가요?
  createdVoting: Array,
});

userSchema.pre('save', async function (next) {
  try {
    // console.log(this.isModified('password'), 'isM');

    const encrypted = await bcrypt.hash(
      this.password,
      Number(process.env.SALT)
    );

    this.password = encrypted;
    this.passwordConfirm = undefined;
    next();
  } catch (err) {
    next(err); //500error
  }
});

userSchema.pre('save', async function (next) {
  const checkDuplication = await User.find({ email: this.email });

  if (checkDuplication.length) {
    const err = new Error(
      'Other user is already using the provied email, Please use another email.'
    );
    err.errors = { email: { message: err.message } };
    throw err;
  }
});

userSchema.methods.verifyPassword = async (plainPassword, encrypted) => {
  const result = await bcrypt.compare(plainPassword, encrypted);

  if (!result) {
    const err = new Error('Password is not correct.');
    err.password = { message: err.message };
    throw err;
  }
  return result;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
