const express = require('express');
const lessMiddleware = require('less-middleware');
const logger = require('morgan');
const { setSession } = require('./routes/middlewares/auth');

const indexRouter = require('./routes/index');
const signupRouter = require('./routes/signup');
const votingsRouter = require('./routes/votings');

const app = express();
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/app', {
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() { console.log('connected') });

app.set('views', 'views');
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(lessMiddleware('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
setSession(app);

app.use('/', indexRouter);
app.use('/signup/', signupRouter);
app.use('/votings', votingsRouter);


app.use((err, req, res, next) => {
  if (err.status === 401) {
    res.render('login', { title: 'Invalid email or wrong password' })
  }
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
