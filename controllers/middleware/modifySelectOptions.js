module.exports = (req, res, next) => {
  try {
    console.log(req.body, 'db');
    const selectOptions = req.body.selectOptions;
    const temp = [];

    selectOptions.reduce(
      (acc, selectOption) => {
        acc.option = selectOption;
        temp.push(acc);
        return { count: 0 };
      },
      { count: 0 }
    );
    req.body.selectOptions = temp;
    next();
  } catch (err) {
    console.log(err, 'unvalid expiredate');
    next(err);
  }
};
