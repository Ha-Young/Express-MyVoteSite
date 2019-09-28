
var $email = document.querySelector('input[name="email"]');
var $password = document.querySelector('input[name="password"]');
var $pwConfirm = document.querySelector('input[name="password_confirm"]');
var $name = document.querySelector('input[name="name"]');
var $form = document.querySelector('.form-main');

var PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/;
var EMAIL_REGEX = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
var NAME_REGEX = /^[가-힣]{2,4}|[a-zA-Z]{2,20}$/;

onKeyupValidate($email, EMAIL_REGEX);
onKeyupValidate($password, PASSWORD_REGEX);
onKeyupValidate($name, NAME_REGEX);
onKeyupPwConfirmation($password, $pwConfirm);
onSubmitValidate($form, $email, $password, $pwConfirm, $name);

function onKeyupValidate (elem, regex) {
  elem.addEventListener('keyup', function (e) {
    var target = e.currentTarget;
    var val = target.value;
    var $info = target.parentElement.querySelector('.info-txt');

    if (!regex.test(val)) {
      $info.classList.add('warn-txt');
    } else {
      $info.classList.remove('warn-txt');
    }
  });
}

function onKeyupPwConfirmation (pw, pwConfirm) {
  pwConfirm.addEventListener('keyup', function (e) {
    var target = e.currentTarget;
    var $info = target.parentElement.querySelector('.info-txt');

    if (pw.value === target.value) {
      $info.classList.remove('warn-txt');
    } else {
      $info.classList.add('warn-txt');
    }
  });
}

function onSubmitValidate (form, email, password, pwConfirm, name) {
  form.addEventListener('submit', function (e) {
    var isEmailValid = EMAIL_REGEX.test(email.value);
    var isPwValid = PASSWORD_REGEX.test(password.value);
    var isPwConfirmValid = password.value === pwConfirm.value;
    var isNameValid = NAME_REGEX.test(name.value);

    if (!isEmailValid) {
      email.focus();
      e.preventDefault();
      return;
    }
    if (!isPwValid) {
      password.focus();
      e.preventDefault();
      return;
    }
    if (!isPwConfirmValid) {
      pwConfirm.focus();
      e.preventDefault();
      return;
    }
    if (!isNameValid) {
      name.focus();
      e.preventDefault();
      return;
    }
  });
}
