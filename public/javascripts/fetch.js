const $formSubmitButton = document.querySelector('.form-submit-button');
  const $seleteButton = document.querySelector('.delete-button');
  $formSubmitButton.addEventListener('click', handleSubmitButtonClick);
  $seleteButton.addEventListener('click', handleDeleteButtonClick);

  async function handleSubmitButtonClick (e) {
    e.preventDefault();

    const selected_option = document.querySelector('input[name="option"]:checked').value;

    try {
      await fetch(`/votings/${$formSubmitButton.dataset.votingid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          option: selected_option
        })
      });

      window.location.href = `/votings/${$formSubmitButton.dataset.votingid}`;
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDeleteButtonClick (e) {
    e.preventDefault();

    try {
      await fetch(`/votings/delete/${$seleteButton.dataset.votingid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        }
      });

      window.location.href = '/';
    } catch (err) {
      console.log(err);
    }
  }
