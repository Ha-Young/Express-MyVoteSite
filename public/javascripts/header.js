const logoutButton = document.querySelector(".logout-button");

const ACCESS_TOKEN = "accessToken";
const REFRESH_TOKEN = "refreshToekn";

const handleLogoutButtonClick = async (e) => {
  try {
    fetch("/login", {
      headers: {
        "Content-Type": "application/json"
      },
      method: "delete",
    });
  } catch (err) {
    document.cookie = ACCESS_TOKEN + "=; Max-Age=-1";
    document.cookie = REFRESH_TOKEN + "=; Max-Age=-1";
  } finally {
    window.location.reload();
  }
};

if (logoutButton) {
  logoutButton.addEventListener("click", handleLogoutButtonClick);
}
