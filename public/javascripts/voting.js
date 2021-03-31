const indexLinkButton = document.querySelector(".index-link-button");

const handleIndexLinkButton = (e) => {
  window.location.href = "/";
};

indexLinkButton.addEventListener("click", handleIndexLinkButton);
