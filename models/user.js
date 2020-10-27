const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const UserSchema = new Schema(
  {
    email: { type: String, unique: true, required: true, trim: true },
    password: { type: String, unique: true, required: true, trim: true },
    username: { type: String, unique: true, required: true, trim: true },
    voting: [Schema.Types.ObjectId],
  },
  schemaOptions
);

module.exports = mongoose.model('User', UserSchema);
