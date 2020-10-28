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
    votings: [{type: Schema.Types.ObjectId, ref: 'Voting'}],
  },
  schemaOptions
);

module.exports = mongoose.model('User', UserSchema);
