const $formSubmitButton = document.querySelector('.form-submit-button');
const $alreadyVotedAlert = document.querySelector('.hidden');
$formSubmitButton.addEventListener('click', handleSubmitButtonClick);

async function handleSubmitButtonClick (e) {
  e.preventDefault();

  const selected_option = document.querySelector('input[name="option"]:checked').value;

  try {
    const response = await fetch(`/votings/${$formSubmitButton.dataset.votingid}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        option: selected_option
      })
    });

    const responseBody = await response.json();

    if (responseBody.error === "이미 투표했습니다.") {
      return $alreadyVotedAlert.classList.remove('hidden');
    } else if (responseBody.error) {
      window.location.href = `/error/${responseBody.error}`;
    } else {
      window.location.href = `/votings/${$formSubmitButton.dataset.votingid}`;
    }

  } catch (err) {
    window.location.href = '/error/500';
  }
}
