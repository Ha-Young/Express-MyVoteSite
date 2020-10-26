const mongoose = require('mongoose');

const db = mongoose.connection;

db.on('connected', () => {
  console.log('db is on');
});

db.on('error', (err) => {
  console.error('error case', err);
});

db.on('disconnected', () => {
  console.log('mongodb disconnected');
});

(async () => {
  try {
    await mongoose.connect(process.env.ATLAS_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
  } catch (err) {
    console.error('db init process', err);
  }
})();
