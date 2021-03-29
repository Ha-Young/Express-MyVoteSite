const mongoose = require('mongoose');

function dbLoader() {
  mongoose.connect(process.env.MONGODB_ATLAS, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  }).then(n => n.connection.getClient());

  mongoose.connection.on('error', () => {
    console.log("MongoDB Atlas database connected failure!!");
  });

  mongoose.connection.once("open", () => {
    console.log("🔥🌏🔥 MongoDB Atlas database connected successfully!");
  });
}

module.exports = dbLoader;
