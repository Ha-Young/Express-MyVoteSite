(function () {
  const buttonDeleteVote = document.querySelector(".button-delete-vote");
  const formDeleteVote = document.querySelector(".form-delete-vote");
  const message = document.querySelector(".message");

  if (!buttonDeleteVote) return;
  async function deleteVote(e) {
    e.preventDefault();

    const currentUrl = buttonDeleteVote.formAction;

    try {
      const response = await fetch(currentUrl, {
        method:"DELETE",
      });

      const result = await response.json();
      const {success} = result;

      if (success) {
        message.textContent = "투표가 정상적으로 삭제되었습니다";
      }
    } catch {
      window.location.replace("/");
    }
  }

  formDeleteVote.addEventListener("submit", deleteVote);
})();
