const db = require('mongoose');

db.set('useFindAndModify', false);
db.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

db.connection
  .on('error', err => console.error(`connection error: ${err}`))
  .once('open', () => console.log('database connected'));

module.exports = db;
