exports.validationEmail = function(userEmail) {
  const emailRegex = new RegExp("([\\w-\\.]+)@((?:[\\w]+\\.)+)([a-zA-Z]{2,4})");

  if (!emailRegex.test(userEmail)) {
    return "아이디는 이메일 형식으로 입력해주세요";
  }
}

exports.validationPassword = function(password) {
  const passwordRegex = new RegExp("^(?=.*[0-9])(?=.*[a-zA-z]).{8,15}$");

  if (!passwordRegex.test(password)) {
    return "비밀번호는 영문, 숫자 조합으로 8~15자리로 입력해주세요";
  }
}
