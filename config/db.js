const mongoose = require('mongoose');

const db = mongoose.connection;
const port = process.env.PORT;

mongoose.connect(
  `mongodb+srv://theyyyzzz3:1234@cluster0.r2mjk.mongodb.net/votingPlatform?retryWrites=true&w=majority`,
  {
    dbName: 'votingPlatform',
    useNewUrlParser: true,
    useCreateIndex:true,
    useUnifiedTopology: true,
    useFindAndModify: false
  }
);

db.on('error', () => console.log('mongoDB-error'));
db.once('open', () => console.log('mongoDB-connected'));
