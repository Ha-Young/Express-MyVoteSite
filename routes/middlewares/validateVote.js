const { MESSAGE } = require('../../constants/views');
const {
  INPUT_TWO_OR_MORE_OPTIONS,
  INPUT_EXPIRATION_DATE,
  DUPLICATES,
} = require('../../constants/messages');
const { EXPIRATION_DATE } = require('../../constants');

function validateVote(req, res, next) {
  const data = req.body;
  const { options } = data;
  const expires_at = `${data[EXPIRATION_DATE][0]} ${data[EXPIRATION_DATE][1]}`;

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
        message: DUPLICATES
      });

      return;
    }

    cache[option] = true;
  }

  next();
}

module.exports = validateVote;
