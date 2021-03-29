const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  id: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    require: true,
  },
  votings: [{
    type: mongoose.Schema.Types.ObjectId
  }],
  hash: {
    type: String,
    require: true,
  },
  salt: {
    type: String,
    require: true,
  },
});

mongoose.model("User", userSchema);
