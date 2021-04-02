const $logoutButton = document.querySelector('.logout');

$logoutButton.addEventListener('click', handleLogout);

function handleLogout (e) {
  e.preventDefault();

  document.cookie = 'access_token=; max-age=-1';

  window.location.href = '/';
}
