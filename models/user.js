const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true, unique: true },
    password: { type: String, unique: true, required: true },
  },
  schemaOptions
);

module.exports = mongoose.model('User', UserSchema);
