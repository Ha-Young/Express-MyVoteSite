require('dotenv').config();
const mongoose = require('mongoose');
const db = mongoose.connection;

mongoose.connect(process.env.DB, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true
});

db.on('error', () => console.log('Connection error'));
db.once('open', () => console.log('Conneted mongoDB'));
