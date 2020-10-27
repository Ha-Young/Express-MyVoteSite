const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;

module.exports = () => {
  mongoose.connect(uri, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (err) => {
    if (err) throw new Error(err);
  });

  mongoose.connection.on('error', (err) => {
    if (err) throw new Error(err);
  });

  mongoose.connection.once('open', (err) => {
    if (err) throw new Error(err);

    console.log('mongodb is connected...');
  });
};
