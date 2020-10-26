const mongoose = require('mongoose');

module.exports = () => {
  const SECRET_URL = process.env.MONGO_URL;

  mongoose.connect(SECRET_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
};