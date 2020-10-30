const Count = require('../../models/Count');

const defalultTextItemCounts = 3;

function validateLogin(req, res, next) {
  if (!req.user || !Object.values(req.user).length) {
    return res.redirect('/login');
  }
  next();
}

async function validateText(
  {
    body: { texts, subject },
  },
  res,
  next,
) {
  let addCount = 0;
  const count = await Count.findOne({});

  if (!count) {
    await Count.create({ addCount: 0 });
  } else {
    addCount = await Count.findOne({});
    addCount = addCount.addCount;
  }

  if (!subject) {
    return res.render('newVote', {
      notificationMessage: {
        invalidText: '제목을 입력해주세요',
        invalidDate: null,
      },
      textItemCount: defalultTextItemCounts + addCount,
    });
  }

  if (texts.filter((text) => !!text).length < 2) {
    return res.render('newVote', {
      notificationMessage: {
        invalidText: '두개 이상의 항목을 작성해주세요.',
        invalidDate: null,
      },
      textItemCount: defalultTextItemCounts + addCount,
    });
  }

  next();
}

async function validateDate(
  {
    body: { date, time },
  },
  res,
  next,
) {
  const fullDate = date.split('-').concat(time.split(':'));

  if (fullDate[1] === '01') {
    fullDate[1] = 12;
  } else {
    fullDate[1] -= 1;
  }

  const userDate = new Date(...fullDate).getTime();
  const currentDate = new Date().getTime();

  if (userDate <= currentDate) {
    const count = await Count.findOne({});

    return res.render('newVote', {
      notificationMessage: {
        invalidText: null,
        invalidDate: '만기일을 미래로 다시 설정해주세요',
      },
      textItemCount: defalultTextItemCounts + count.addCount,
    });
  }

  return next();
}

exports.validateLogin = validateLogin;
exports.validateText = validateText;
exports.validateDate = validateDate;
