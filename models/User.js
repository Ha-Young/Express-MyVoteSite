const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
 
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  voted: [
    {
      type: mongoose.ObjectId,
      ref: 'Voting',
    }
  ],
});

userSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.comparePassword = async (candidatePassword) => {
  const salt = await bcrypt.genSalt(saltRounds);
  const hash = await bcrypt.hash(candidatePassword, salt);
  return await bcrypt.compare(candidatePassword, hash);
};

module.exports = mongoose.model('User', userSchema);
