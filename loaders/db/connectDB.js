const mongoose = require('mongoose');

const clientPromise = mongoose.connect(process.env.MONGODB_ATLAS, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}).then(result => result.connection.getClient());

function checkDB() {
  mongoose.connection.on('error', () => {
    console.log("MongoDB Atlas database connected failure!!");
  });
  mongoose.connection.once("open", () => {
    console.log("🔥🌏🔥 MongoDB Atlas database connected successfully!");
  });
}

module.exports = dbLoader = {
  checkDB,
  clientPromise,
};
