const VALIDATION = 'VALIDATION';

const VALIDATION_ERROR_MESSAGE = 'Validation error';
const TITLE_DUPLICATE_ERROR_MESSAGE = 'Duplicated title. try another one';
const EMAIL_DUPLICATE_ERROR_MESSAGE = 'Duplicated email. try another one';
const NICKNAME_DUPLICATE_ERROR_MESSAGE = 'Duplicated nickname. try another one';
const EMAIL_NOT_EXIST_ERROR_MESSAGE = 'There is no email, please check again';
const EMAIL_FORM_ERROR_MESSAGE = 'E-mail is not a valid type';
const PASSWORD_FORM_ERROR_MESSAGE = 'Password is not a valid type';
const NICKNAME_FORM_ERROR_MESSAGE = 'Nickname should be contained at least 3 character';
const TITLE_FORM_ERROR_MESSAGE = 'Title should be contained at least 3 character';
const POLL_FORM_ERROR_MESSAGE = 'Poll should be contained at least 3 character';
const DATE_FORM_ERROR_MESSAGE = 'Should check date again. It is a past date';

const CANT_FIND_EMAIL = 'Can not foud your email. please check again';
const DIFF_PASSWORD = 'Password does not match';

/*
*  @ 앞에는 영어소문자 . _ % + - 만 허용
*  @ 골뱅이 필수
*  @ 뒤 . 앞에는 영어소문자 . - 만 허용
*  . 점 필수
*  . 뒤에는 영어소문자 2자리 이상
*/
const EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
//숫자 포함 8자 이상의 비밀번호
const PASSWORD_REGEX = /(?=.*\d)(?=.*[a-z]).{8,}/;

const SALT_ROUND = 10;

module.exports = {
  VALIDATION,
  VALIDATION_ERROR_MESSAGE,
  TITLE_DUPLICATE_ERROR_MESSAGE,
  EMAIL_DUPLICATE_ERROR_MESSAGE,
  NICKNAME_DUPLICATE_ERROR_MESSAGE,
  EMAIL_NOT_EXIST_ERROR_MESSAGE,
  EMAIL_FORM_ERROR_MESSAGE,
  PASSWORD_FORM_ERROR_MESSAGE,
  NICKNAME_FORM_ERROR_MESSAGE,
  TITLE_FORM_ERROR_MESSAGE,
  POLL_FORM_ERROR_MESSAGE,
  DATE_FORM_ERROR_MESSAGE,
  CANT_FIND_EMAIL,
  DIFF_PASSWORD,
  EMAIL_REGEX,
  PASSWORD_REGEX,
  SALT_ROUND,
};
