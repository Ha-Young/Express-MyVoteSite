const $searchBar = document.querySelector(".search-bar input");
const $header = document.querySelector(".header");
const $toggleButton = document.querySelector('.dark-light');

const makeSearchBarNarrow = () => {
  $header.classList.remove("wide");

  $searchBar.removeEventListener("blur", makeSearchBarNarrow);
  $searchBar.addEventListener("focus", makeSearchBarWide);
};

const makeSearchBarWide = () => {
  $header.classList.add("wide");

  $searchBar.removeEventListener("focus", makeSearchBarWide);
  $searchBar.addEventListener("blur", makeSearchBarNarrow);
};

const handleToggleButtonClick = () => {
  document.body.classList.toggle('light-mode');
};

const init = () => {
  $toggleButton.addEventListener('click', handleToggleButtonClick);
  $searchBar.addEventListener("focus", makeSearchBarWide);
};

init();
