function checkHasSelectedOption(req, res, next) {
  if (req.body.selectedOptionValue === null) {
    res.status(200).render('failure', {
      message: '선택한 항목이 없습니다'
    });

    return;
  }

  next();
}

module.exports = checkHasSelectedOption;
