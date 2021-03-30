const mongoose = require("mongoose");
const data = require("../models/voting_mockup.json");

const sampleSchema = new mongoose.Schema({
  author: { type: String },
  title: { type: String },
  descritpion: { type: String },
  votingItem: [{ item: { type: String }, count: { type: Number } }],
  voters: [mongoose.Schema.Types.ObjectId],
  //   postTime: { type: String, default: Date.now },
  //   dueTime: { type: String, default: Date.now },
});

const Sample = mongoose.model("Sample", sampleSchema);

async function makeSampleMongoDB() {
  for (let i = 0; i < data.length; i++) {
    console.log("...");
    await Sample.create(data[i]);
  }
}

module.exports = {
  makeSampleMongoDB,
  Sample,
};
