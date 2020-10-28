const logoutButton = document.querySelector('#logout');

logoutButton.addEventListener('click', () => {
  location.assign('/logout');
});
