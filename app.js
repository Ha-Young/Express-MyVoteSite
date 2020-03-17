require('dotenv').config();
const createError = require('http-errors')
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');

const indexRouter = require('./routes/index');
const signupRouter = require('./routes/signup');
const authRouter = require('./routes/auth');
const votingRouter = require('./routes/votings');

require('./config/passport')(passport);

mongoose.connect(
  process.env.DB_URI, 
  { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true }, 
  () => {
    console.log('connected to mongodb');
  }
);

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));


app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use('/signup', signupRouter);
app.use('/auth', authRouter);
app.use('/', indexRouter);
app.use('/votings', votingRouter);

app.use(function(req, res, next) {
  console.log(1111111)
  next(createError(404));
});


app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`connected to port ${process.env.PORT}`)
});

module.exports = app;
