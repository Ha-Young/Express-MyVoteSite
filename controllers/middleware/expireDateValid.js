module.exports = (req, res, next) => {
  try {
    const year = req.body.year;
    const month = req.body.month;
    const day = req.body.day;
    const hour = req.body.hour;
    const expireDate = new Date(year, month, day, hour).toISOString();
    const present = new Date().toISOString();

    if (expireDate < present) {
      throw new Error('expire date should be later than present time');
    }

    req.body.expireDate = expireDate;
    next();
  } catch (err) {
    console.log(err, 'unvalid expiredate');
    next(err);
  }
};
