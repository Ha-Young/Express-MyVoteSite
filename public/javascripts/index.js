const logoutBtn = document.querySelector(".logout-btn");
const logoutWrapper = document.querySelector(".logout-wrapper");

logoutBtn.addEventListener("click", () => {
  document.cookie = "access_token" + '=; Max-Age=0';

  logoutWrapper.removeChild(logoutBtn);
});
