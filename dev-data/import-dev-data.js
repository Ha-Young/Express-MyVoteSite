const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Voting = require("./../models/votingModel");

dotenv.config();

const DB = process.env.MONGO_URI.replace(
  "<PASSWORD>",
  process.env.MONGO_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log("DB connection successful!"));

// READ JSON FILE
const votings = JSON.parse(
  fs.readFileSync(`${__dirname}/mockVoting.json`, "utf-8")
);

// IMPORT DATA INTO DB
const importData = async () => {
  try {
    await Voting.create(votings);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Voting.deleteMany();
    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}
