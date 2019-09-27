var PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{6,}$/;
var EMAIL_REGEX = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
var NAME_REGEX = /^[가-힣]{2,4}|[a-zA-Z]{2,20}$/;

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

function onKeyupCheckLength (elem, max) {
  elem.addEventListener('keyup', function (e) {
    var target = e.currentTarget;
    var targetLen = target.value.trim().length;
    var $info = target.parentElement.querySelector('.info-txt');

    if (targetLen > max || targetLen < 1) {
      $info.classList.add('warn-txt');
    } else {
      $info.classList.remove('warn-txt');
    }
  });
}

function onBlurAddZero (elem) {
  elem.addEventListener('blur', function (e) {
    var targetVal = e.currentTarget.value;

    if (targetVal.length < 2) {
      e.currentTarget.value = '0' + targetVal;
    } else {
      e.currentTarget.value = targetVal.slice(0, 2);
    }
  });
}
