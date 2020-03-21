const createError = require('http-errors');

const regPatterns = {
  texts: /^[a-z\d\ㄱ-ㅎ|ㅏ-ㅣ|가-힣.!?~' ']{1,20}$/i,
};

module.exports = (body) => {
  if (!regPatterns.texts.test(body.topic)) {
    throw(createError(422, "Topic is not acceptable"));
  }

  if (!regPatterns.texts.test(body.answer1) || !regPatterns.texts.test(body.answer2)) {
    throw(createError(422, "Answer is not acceptable"));
  }
};
