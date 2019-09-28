const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');
const lessMiddleware = require('less-middleware');
const logger = require('morgan');
const MongoDBStore = require('connect-mongodb-session')(session);

const indexRouter = require('./routes/index');
const votesRouter = require('./routes/votes');

require('dotenv').config();

const app = express();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/vote', {
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('vote DB connected!!!');
});

const store = new MongoDBStore({
  uri: 'mongodb://localhost:27017/vote',
  collection: 'mySessions'
});

store.on('error', function (error) {
  console.error(error);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({
  secret: process.env.SESSION_SECRET_KEY,
  cookie: { maxAge: 3600000 * 7 * 24 },
  store: store,
  resave: true,
  saveUninitialized: true,
}));

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use('/', indexRouter);
app.use('/votings', votesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error();
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error', {
    errorStatus: err.status,
    userName: '',
    message: err.status === 404 ? 'Page Not found' : 'Internal Server Error'
  });
});

module.exports = app;
