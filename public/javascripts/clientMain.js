const logoutButton = document.querySelector('#logout');
const myVotingsButton = document.querySelector('#my-votings');

logoutButton.addEventListener('click', () => {
  location.assign('/logout');
});

myVotingsButton.addEventListener('click', () => {
  location.assign('/my-votings');
});
