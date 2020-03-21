exports.STATUS = {
  PROCEED: 'PROCEED',
  EXPIRED: 'EXPIRED'
};

exports.SALT_ROUNDS = 10;
exports.EMAIL_RULE = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
exports.NAME_RULE = /^[a-zA-Z]{2,10}|[가-힣]{2,6}$/;
