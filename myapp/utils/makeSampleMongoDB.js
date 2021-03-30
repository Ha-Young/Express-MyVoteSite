const mongoose = require("mongoose");

const sampleSchema = new mongoose.Schema({
  // id: { type: mongoose.Schema.Types.ObjectId },
  //   id: Number,
  author: { type: String },
  title: { type: String },
  descritpion: { type: String },
  votingItem: [{ item: { type: String }, count: { type: Number } }],
  voters: [mongoose.Schema.Types.ObjectId],
  postTime: { type: String, default: Date.now },
  dueTime: { type: String, default: Date.now },
});

const Sample = mongoose.model("Sample", sampleSchema);

async function makeSampleMongoDB() {
  for (let i = 0; i < 5; i++) {
    console.log("...");
    await Sample.create({ id: 3 });
  }
}

module.exports = {
  makeSampleMongoDB,
  Sample,
};
