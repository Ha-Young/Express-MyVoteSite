const mongoose = require('mongoose');

const config = require('../config');

const mongooseLoader = () => {
  mongoose.connect(config.databaseURL, config.mongoose);

  const connection = mongoose.connection;

  connection.on('error', () => console.error('connection error'));
  connection.once('open', () => console.log('mongoose is connected'));

  return connection;
};

module.exports = mongooseLoader;
