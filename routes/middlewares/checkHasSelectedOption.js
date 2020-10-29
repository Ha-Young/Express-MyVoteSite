function checkHasSelectedOption(req, res, next) {
  if (req.body.selectedOptionValue === null) {
    res.json({
      result: 'select',
      message: '선택하세요',
    });

    return;
  }

  next();
}

module.exports = checkHasSelectedOption;
