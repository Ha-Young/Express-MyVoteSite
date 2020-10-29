/*
*  @ 앞에는 영어소문자 . _ % + - 만 허용
*  @ 골뱅이 필수
*  @ 뒤 . 앞에는 영어소문자 . - 만 허용
*  . 점 필수
*  . 뒤에는 영어소문자 2자리 이상
*/
exports.EMAIL_REGEX = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
//숫자 포함 8자 이상의 비밀번호
exports.PASSWORD_REGEX = /(?=.*\d)(?=.*[a-z]).{8,}/;
