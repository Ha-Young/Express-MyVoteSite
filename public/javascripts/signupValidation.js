const checkEmailValidity = email => {
  const regEmail = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

  if (regEmail.test(email)) return true;
  return false;
};
const checkPasswordValidity = password => {
  const num = password.search(/[0-9]/g);
  const english = password.search(/[a-z]/ig);
  const special = password.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

  if(password.length < 10 || password.length > 20){
    return "10자리 ~ 20자리 이내로 입력해주세요.";
   }else if(password.search(/\s/) != -1){
    return "비밀번호는 공백 없이 입력해주세요.";
   }else if( (num < 0 && english < 0) || (english < 0 && special < 0) || (special < 0 && num < 0) ){
    return "영문,숫자, 특수문자 중 2가지 이상을\n혼합하여 입력해주세요.";
   }

   return true;
};
const checkInputValueValidity = e => {
  if (e.currentTarget.value === null || e.currentTarget.value === '') {
    $accountError.textContent = '';
    e.currentTarget.style.border = 'initial';

    return false;
  }
  if (e.currentTarget.id === 'email') {
    if (checkEmailValidity(e.currentTarget.value)) {
      $accountError.textContent = '';
      e.currentTarget.style.border = 'initial';

      return true;
    } else {
      $accountError.textContent = '유효하지 않은 이메일 주소입니다.';
      e.currentTarget.style.border = '2px solid red';

      return false;
    }
  } else if (e.currentTarget.id === 'name') {
    if (e.currentTarget.value === null || e.currentTarget.value === '') {
      $accountError.textContent = '이름을 반드시 입력해 주세요';
      e.currentTarget.style.border = '2px solid red';

      return false;
    } else {
      $accountError.textContent = '';
      e.currentTarget.style.border = 'initial';

      return true;
    }
  } else if (e.currentTarget.id === 'password') {
    const result = checkPasswordValidity(e.currentTarget.value);

    if (result !== true) {
      $accountError.textContent = result;
      e.currentTarget.style.border = '2px solid red';

      return false;
    } else {
      $accountError.textContent = '';
      e.currentTarget.style.border = 'initial';

      return true;
    }
  } else if (e.currentTarget.id === 'password-confirm') {
    if (e.currentTarget.value !== data.password) {
      $accountError.textContent = '비밀번호가 일치하지 않습니다.';
      e.currentTarget.style.border = '2px solid red';
    } else {
      $accountError.textContent = '';
      e.currentTarget.style.border = 'initial';
    }

    return false;
  }
};
