const $logoutButton = document.querySelector('.logout');

$logoutButton.addEventListener('click', handleLogout);

function handleLogout () {
  document.cookie = 'access_token=; Max-Age=0';
  console.log(document.cookie)
  window.location.href = '/';
}
