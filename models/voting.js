const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const votingSchemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const VotingListSchema = new Schema({
  listTitle: { type: String, required: true, trim: true },
  voter: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

const VotingSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    creator: { type: String, required: true },
    votingLists: { type: [VotingListSchema], required: true },
    expiredTime: { type: Date, required: true },
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  votingSchemaOptions
);

module.exports = mongoose.model('Voting', VotingSchema);
