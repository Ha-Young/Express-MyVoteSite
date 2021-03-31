// const $homeLogo = document.querySelector(".header__logo");

const $optionMyVotings = document.querySelector(".myVotings");
// const $optionVotedVotings = document.querySelector(".votedVotings");
// const $optionProfile = document.querySelector(".profile");
// const $optionLogout = document.querySelector(".logout");

// const $votingList = document.querySelector("votings");

$optionMyVotings.addEventListener("click", () => {
  const Http = new XMLHttpRequest();
  const url = "/my-votings";

  Http.open("GET", url);
  Http.send();
});
