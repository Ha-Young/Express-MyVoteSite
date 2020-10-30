const { SELECT } = require('../../constants');
const { CHOOSE } = rerequire('../../constants/messages');

function checkHasSelectedOption(req, res, next) {
  if (req.body.selectedOptionValue === null) {
    res.json({
      result: SELECT,
      message: CHOOSE,
    });

    return;
  }

  next();
}

module.exports = checkHasSelectedOption;
