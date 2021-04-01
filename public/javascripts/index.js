// const $homeLogo = document.querySelector(".header__logo");

// const $optionMyVotings = document.querySelector(".myVotings");
// const $optionVotedVotings = document.querySelector(".votedVotings");
// const $optionProfile = document.querySelector(".profile");
const $optionLogout = document.querySelector(".logout");

// const $votingList = document.querySelector("votings");

$optionLogout.addEventListener("click", () => {
  fetch(`/users/logout`, {
    method: "POST",
  }).then((res) => window.location.reload("/users/login"));
});
