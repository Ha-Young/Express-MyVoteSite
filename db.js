const mongoose = require('mongoose');

module.exports = () => {
  function connect() {
    if (process.env.NODE_ENV !== 'production') {
      mongoose.set('debug', true);
    }

    mongoose.connect(
      process.env.MONGODB_URI || 'mongodb://localhost:27017/voting-platform',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000
      },
      function (err) {
        if (err) {
          console.error('mongodb connection error', err);
          return;
        }
        console.log('mongodb connected');
      }
    );
  };

  connect();
  mongoose.connection.on('disconnected', connect);
};
