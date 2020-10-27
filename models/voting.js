const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const votingSchemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const VotingListSchema = new Schema({
  listTitle: { type: String, required: true, trim: true },
  votedNumber: { type: Number, default: 0 },
});

const VotingSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    creator: { type: String, required: true },
    votingLists: { type: [VotingListSchema], required: true },
    expired_date: { type: String, required: true },
    expired_time: { type: String, required: true },
    participants: [{ type: Schema.Types.ObjectId }],
    isProgressed: { type: Boolean, default: true },
  },
  votingSchemaOptions
);

module.exports = mongoose.model('Voting', VotingSchema);
