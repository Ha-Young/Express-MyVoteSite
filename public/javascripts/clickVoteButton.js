const $ref = document.querySelector('.ref').innerHTML;

const $vote = document.querySelector('.vote');
$vote.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = e.target.selectOption.value;
  try {
    console.log('consle why doesntwork');
    const response = await fetch(`http://localhost:3001/votings/${$ref}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });

    if (response.ok) {
      console.log('ok');
      let json = await response.json();
      console.log(json);
    }
  } catch (err) {
    console.log('err', err);
  }
});
