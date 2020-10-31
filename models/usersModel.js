const bcrypt = require('bcrypt');
const validator = require('validator');
const mongoose = require('mongoose');

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
  createdVoting: Array,
});

userSchema.pre('save', async function (next) {
  try {
    const encrypted = await bcrypt.hash(
      this.password,
      Number(process.env.SALT)
    );

    this.password = encrypted;

    next();
  } catch (err) {
    next(err);
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

module.exports = mongoose.model('User', userSchema);
