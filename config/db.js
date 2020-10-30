const mongoose = require('mongoose');

mongoose.connect(
  process.env.NODE_ENV === 'production'
    ? process.env.DB_PRODUCTION_ADDRESS
    : process.env.DB_LOCAL_ADDRESS,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    dbName: 'voting-platform-toggo'
  }
);

const db = mongoose.connection;

db.once('open', function () {
  console.log(`[DB] connected - env: ${process.env.NODE_ENV}`);
});

db.on('error', function (err) {
  console.error(err);
});
