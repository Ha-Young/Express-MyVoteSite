const $ref = document.querySelector('.ref').innerHTML;
const $deleteButton = document.querySelector('.delete-button');

$deleteButton.addEventListener('click', async (e) => {
  try {
    console.log($ref, 'in delete');
    const response = await fetch(`http://localhost:3000/votings/${$ref}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ $ref }),
    });

    if (response.ok) {
      console.log('ok');
      let json = await response.json();
      window.location.href = `http://localhost:3000/`;
    }
  } catch (err) {
    console.log('err', err);
  }
});
