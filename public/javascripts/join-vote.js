const $password = document.getElementById('password');
const $confirmPassword = document.getElementById('confirm-password');

$confirmPassword.addEventListener('keyup', () => {
  if ($password.value !== $confirmPassword.value) {
    $confirmPassword.style.backgroundColor = 'rgb(255, 157, 157)';
  } else {
    $confirmPassword.style.backgroundColor = '#fff';
  }
});
