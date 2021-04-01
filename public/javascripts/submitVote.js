(function () {
  const formSubmitVote = document.querySelector(".form-submit-vote");
  const buttonSubmitVote = document.querySelector(".button-submit-vote");
  const message = document.querySelector(".message");

  async function submitVote(e) {
    e.preventDefault();

    const currentUrl = buttonSubmitVote.formAction;
    const targetList = Array.from(e.target);

    let option;

    targetList.forEach(item => {
      if (item.checked) {
        option = { id: item.value };
      }
    });

    try {
      const response = await fetch(currentUrl, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(option)
      });

      const result = await response.json();
      const {success, participated} = result;

      if (participated) {
        window.location.replace("/");
      }

      if (success) {
        message.textContent = "투표해주셔서 감사합니다";
      }
    } catch {
      window.location.replace("/");
    }
  }

  formSubmitVote.addEventListener("submit", submitVote);
})();
