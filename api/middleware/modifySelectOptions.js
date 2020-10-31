module.exports = (req, res, next) => {
  try {
    const selectOptions = req.body.selectOptions;

    const temp = [];

    selectOptions.reduce(
      (acc, selectOption) => {
        acc.option = selectOption;
        temp.push(acc);
        return { votedUsers: [] };
      },
      { votedUsers: [] }
    );
    req.body.selectOptions = temp;
    next();
  } catch (err) {
    next(err);
  }
};
