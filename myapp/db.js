const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

try {
  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('mongodb connected');
} catch (err) {
  next(err);
}
