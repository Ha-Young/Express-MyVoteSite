exports.votingStatus = {
  EXPIRED: 'EXPIRED',
  INPROGRESS: 'INPROGRESS'
};
exports.SALT_ROUNDS = 10;

exports.EMAIL_RULE = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
exports.IMG_URL_RULE = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
