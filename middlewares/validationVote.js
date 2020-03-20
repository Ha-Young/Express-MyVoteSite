const error = require('../libs/error');

const validationVote = (req, res, next) => {
  const {
    title,
    expired,
    options
  } = req.body;

  try {
    if (!title.trim()) {
      req.flash('invalid', '투표제목을 작성해주세요.');
      return res.redirect('/voting/new');
    }

    if (title.length > 30) {
      req.flash('invalid', '제목은 공백포함 30자이하만 작성가능합니다.');
      return res.redirect('/voting/new');
    }

    if (!options.every(option => option.trim())) {
      req.flash('invalid', '옵션은 최소 2개이상 작성해주세요.');
      return res.redirect('/voting/new');
    }

    if (!options.every(option => option.length <= 20)) {
      req.flash('invalid', '옵션은 공백포함 20자이하만 작성가능합니다.');
      return res.redirect('/voting/new');
    }

    expired.splice(1, 1, expired[1] - 1);
    const inputDate = new Date(...expired).toISOString();
    const currentDate = new Date().toISOString();

    if (currentDate.toString() > inputDate.toString()) {
      req.flash('invalid', '종료시간은 현재시간보다 과거로 설정할 수 없습니다.');
      return res.redirect('/voting/new');
    }

    res.locals.expired = inputDate;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = validationVote;
