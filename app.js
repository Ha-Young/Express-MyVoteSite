require('dotenv').config();
const createError = require('http-errors')
const express = require('express');
const path = require('path');
// const bodyParser = require('body-parser');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const signupRouter = require('./routes/signup');
const authRouter = require('./routes/auth');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');


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

app.use('/users', usersRouter);
app.use('/signup', signupRouter);
app.use('/auth', authRouter);
app.use('/', indexRouter);





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

app.listen(process.env.PORT || 3000, () => {
  console.log(`connected to port ${process.env.PORT}`)
});

module.exports = app;
