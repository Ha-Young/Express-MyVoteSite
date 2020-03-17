const mongoose = require('mongoose');
const dbURL = process.env.DB_URL;

mongoose.set('useCreateIndex', true);

mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoose connected!');
});
