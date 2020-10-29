const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const bodyparser = require('body-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const express = require('express');
const userRoute = require('./routes/userRoute');
const votingRoute = require('./routes/votingRoute');
require('./loaders/db');

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(`${__dirname}/public`));

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
  })
);

app.use('/', userRoute);
app.use('/votings', votingRoute);

app.use((err, req, res, next) => {
  console.log('Global error', err);
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  err.status = err.status || 500;
});

module.exports = app;
