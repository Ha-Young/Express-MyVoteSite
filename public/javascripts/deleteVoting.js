const $deleteButton = document.querySelector('.delete-button');
$deleteButton.addEventListener('click', handleDeleteButtonClick);

async function handleDeleteButtonClick (e) {
  e.preventDefault();

  try {
    await fetch(`/votings/delete/${$deleteButton.dataset.votingid}`, {
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
