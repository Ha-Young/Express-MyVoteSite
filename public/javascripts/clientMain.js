const loginButton = document.querySelector('#login');
const logoutButton = document.querySelector('#logout');
const myVotingsButton = document.querySelector('#my-votings');

loginButton.addEventListener('click', () => {
  location.assign('/login');
});

logoutButton.addEventListener('click', () => {
  location.assign('/logout');
});

myVotingsButton.addEventListener('click', () => {
  location.assign('/my-votings');
});
