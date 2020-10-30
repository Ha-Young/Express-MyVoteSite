const { MESSAGE } = require('../../constants/views');
const {
  INPUT_TWO_OR_MORE_OPTIONS,
  INPUT_EXPIRATION_DATE,
  INPUT_EXPIRATION_DATE,
} = require('../../constants/messages');

function validateVote(req, res, next) {
  const data = req.body;
  const { options } = data;
  const expires_at = `${data['expiration-date'][0]} ${data['expiration-date'][1]}`;

  if (options.length < 2) {
    res.status(200).render(MESSAGE, {
      message: INPUT_TWO_OR_MORE_OPTIONS
    });

    return;
  }

  if (Date.parse(expires_at) <= Date.now()) {
    res.status(200).render(MESSAGE, {
      message: INPUT_EXPIRATION_DATE
    });

    return;
  }

  const cache = {};

  for (const option of options) {
    if (cache.hasOwnProperty(option)) {
      res.status(200).render(MESSAGE, {
        message: INPUT_EXPIRATION_DATE
      });

      return;
    }

    cache[option] = true;
  }

  next();
}

module.exports = validateVote;
