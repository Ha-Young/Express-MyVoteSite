const $formSubmitButton = document.querySelector('.form-submit-button');
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

    if (responseBody.error) {
      window.location.href = '/login';
    } else {
      window.location.href = `/votings/${$formSubmitButton.dataset.votingid}`;
    }

  } catch (err) {
    console.log(err);
  }
}
