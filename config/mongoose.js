const mongoose = require('mongoose');

module.exports = () => {
  const SECRET_URL = process.env.MONGO_URL;

  mongoose.connect(SECRET_URL, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};