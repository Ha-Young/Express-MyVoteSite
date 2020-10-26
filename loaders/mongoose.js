const mongoose = require('mongoose');

const config = require('../config');

module.exports = async () => {
  await mongoose.connect(config.databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  const connection = mongoose.connection;

  connection.on('error', () => console.error('connection error'));
  connection.once('open', () => console.log('mongoose is connected'));

  return connection;
};
