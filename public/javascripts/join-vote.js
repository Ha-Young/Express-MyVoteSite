const $password = document.getElementById('password');
const $confirmPassword = document.getElementById('confirm-password');

$confirmPassword.addEventListener('keyup', () => {
  if ($password.value !== $confirmPassword.value) {
    $confirmPassword.style.backgroundColor = 'rgb(255,235,233)';
  } else {
    $confirmPassword.style.backgroundColor = 'rgb(208,255,236)';
  }
});
