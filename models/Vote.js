const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const connection = mongoose.createConnection(process.env.MONGODB_URL);

autoIncrement.initialize(connection);

const votesSchema = new mongoose.Schema({
  id: { type: Number },
  title: { type: String },
  creator: { type: String },
  voteOptions: [{ voteOption: { type: String }, voteResult: { type: Number, default: 0 } }],
  voteUser: [{ type: String }],
  dueDate: { type: Date, default: Date.now },
  isFinish: { type: String }
});

votesSchema.plugin(autoIncrement.plugin, {
  model:'Vote',
  field: 'id',
  startAt: 0,
  increment: 1
});

module.exports = mongoose.model('Vote', votesSchema);
