import mongoose from 'mongoose';

const db = mongoose.connection;

mongoose.connect('mongodb://localhost/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('DB connected.'));
