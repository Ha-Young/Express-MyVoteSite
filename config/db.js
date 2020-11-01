const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
  dbName: 'voting-platform-toggo'
});

const db = mongoose.connection;

db.once('open', function () {
  console.log(`[DB] connected`);
});

db.on('error', function (err) {
  console.error(err);
});
