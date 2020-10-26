const mongoose = require('mongoose');

const mongodbError = require('../services/createError')('DATABASE');

const uri = process.env.MONGODB_URI;

module.exports = () => {
  mongoose.connect(uri, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }, (err) => {
    if (err) throw mongodbError;
  });

  mongoose.connection.on('error', (err) => {
    if (err) throw mongodbError;
  });

  mongoose.connection.once('open', (err) => {
    if (err) throw mongodbError;

    console.log('mongodb is connected...');
  });
};
