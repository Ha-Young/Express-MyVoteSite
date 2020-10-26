const mongoose = require('mongoose');

mongoose.connect(process.env.ATLAS_DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

db.on('error', error => console.error(`connection error: ${error}`));
db.once('open', () => {
  console.log('Connected to database');
});
