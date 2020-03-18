const createVoteButton = document.querySelector('.create-votes');
const loginButton = document.querySelector('.login');
const signupButton = document.querySelector('.signup');

createVoteButton.addEventListener('click', () => {
  location.assign(location.origin + '/votings/new');
});

if (loginButton) {
  loginButton.addEventListener('click', () => {
    location.assign(location.origin + '/login');
  });
}

signupButton.addEventListener('click', () => {
  location.assign(location.origin + '/signup');
});
