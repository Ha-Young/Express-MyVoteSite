function validateVote(req, res, next) {
  const data = req.body;
  const { options } = data;
  const expires_at = `${data['expiration-date'][0]} ${data['expiration-date'][1]}`;

  if (options.length < 2) {
    res.status(200).render('message', {
      message: '선택지를 두 개 이상 입력하세요'
    });

    return;
  }

  if (Date.parse(expires_at) <= Date.now()) {
    res.status(200).render('message', {
      message: '투표 만료 시각을 확인하세요'
    });

    return;
  }

  const cache = {};

  for (const option of options) {
    if (cache.hasOwnProperty(option)) {
      res.status(200).render('message', {
        message: '중복 선택지가 있습니다'
      });

      return;
    }

    cache[option] = true;
  }

  next();
}

module.exports = validateVote;
