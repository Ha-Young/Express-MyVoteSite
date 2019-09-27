function showPassword() {
  var $input = document.querySelector('#password-input');
  if ($input.type === 'password') {
    $input.type = 'text';
  } else {
    $input.type = 'password';
  }
}
