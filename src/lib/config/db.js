import mongoose from 'mongoose';

export default () => {
  const db = mongoose.connection;

  mongoose.connect(process.env.MONGODB_ATLAS_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  });

  db.once('open', () => console.log('✔️  MongoDB Connected'));
  db.on('error', e => console.error('❌  MongoDB Connection Error ', e));
};
