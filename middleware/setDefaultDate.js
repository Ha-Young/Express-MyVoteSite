const { format, } = require('date-fns');

const setDefalutDate = (req, res, next) => {
  const date = format(new Date(), 'yyyy-MM-dd');

  res.locals.defaultDate = date;
  next();
};

module.exports = setDefalutDate;
