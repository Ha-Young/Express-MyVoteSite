const createVoteButton = document.querySelector('.create-votes');
const loginButton = document.querySelector('.login');
const logoutButton = document.querySelector('.logout');
const signupButton = document.querySelector('.signup');

if (createVoteButton) {
  createVoteButton.addEventListener('click', () => {
    location.assign(location.origin + '/votings/new');
  });
}

if (loginButton) {
  loginButton.addEventListener('click', () => {
    location.assign(location.origin + '/auth/login');
  });
}

if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    location.assign(location.origin + '/auth/logout');
  });
}

signupButton.addEventListener('click', () => {
  location.assign(location.origin + '/signup');
});
