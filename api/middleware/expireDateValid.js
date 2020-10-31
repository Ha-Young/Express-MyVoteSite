module.exports = (req, res, next) => {
  try {
    const expireDate = req.body.expireDate;
    const present = new Date().toISOString();

    if (expireDate < present) {
      const err = new Error('Expire date should be later than present time');
      err.errors = { expireDate: { message: err.message } };
      throw err;
    }

    req.body.expireDate = expireDate;
    next();
  } catch (err) {
    res.render('voting/newVoting', { err: err.errors });
  }
};
