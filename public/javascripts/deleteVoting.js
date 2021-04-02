const $deleteButton = document.querySelector('.delete-button');

$deleteButton.addEventListener('click', handleDeleteButtonClick);

async function handleDeleteButtonClick (e) {
  e.preventDefault();

  try {
    const response = await fetch(`/votings/delete/${$deleteButton.dataset.votingid}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      }
    });

    const responseBody = await response.json();

    if (responseBody.error) {
      window.location.href = `/error/${responseBody.error}`;
    } else {
      window.location.href = `/`;
    }
  } catch (err) {
    window.location.href = '/error/500';
  }
}
