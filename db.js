import mongoose from 'mongoose';

const db = mongoose.connection;

mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
});

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('DB connected.'));
