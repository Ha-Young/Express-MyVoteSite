const createError = require('http-errors');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const lessMiddleware = require('less-middleware');
const passport = require('passport');
const session = require('express-session');
const passportConfig = require('./passport');
passportConfig(passport);
const flash = require('connect-flash');
const path = require('path');
const logger = require('morgan');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const votingRouter = require('./routes/votings');
const app = express();

// dotenv requring in only development env

if (process.env.NODE_ENV === 'development') {
  const dotenv = require('dotenv');
  dotenv.config({
    path: './.env'
  });
}

// mongoose setup

mongoose.connect(process.env.MONGOOSE_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// mongoose connecton

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('We are connected!');
});

// view engine setup
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(
  session({
    secret: 'cat runner',
    resave: true,
    saveUninitialized: true
  })
);

app.use(flash());

//input passport to req
app.use(passport.initialize());
// save passport info to session
app.use(passport.session());

// routers
app.use('/', indexRouter);
app.use('/auth', authRouter);

// app.use('/users', usersRouter);
app.use('/votings', votingRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
