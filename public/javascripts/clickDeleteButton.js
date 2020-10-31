const $ref = document.querySelector('.ref').innerHTML;
const $deleteButton = document.querySelector('.delete-button');

$deleteButton.addEventListener('click', async () => {
  try {
    const response = await fetch(`http://localhost:3000/votings/${$ref}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ $ref }),
    });

    if (response.ok) {
      window.location.href = `http://localhost:3000/`;
    }
  } catch (err) {
    console.log('err', err);
  }
});
