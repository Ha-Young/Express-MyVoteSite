
const $ref = document.querySelector('.ref').innerHTML;
const $form = document.querySelector('.voting-body-form');

$form.addEventListener('submit', async (e) => {

  e.preventDefault();
  const data = e.target.option.value;
  try {
    console.log($ref, 'in clickVoteButton js file')
    const response = await fetch(`http://localhost:3000/votings/${$ref}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });

    if (response.ok) {
      console.log('ok');
      let json = await response.json();
      window.location.href = `http://localhost:3000/votings/${$ref}`
      console.log(json);
    }

  } catch (err) {
    console.log('err', err);
  }
});
