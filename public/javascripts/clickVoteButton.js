const $ref = document.querySelector('.ref').innerHTML;

const $vote = document.querySelector('.vote');
$vote.addEventListener('submit', async (e) => {
  // e.preventDefault();
  const data = e.target.selectOption.value;
  console.log('ref', $ref);
  try {
    const putRequest = await fetch(`http://localhost:3000/votings/${$ref}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });
  } catch (err) {
    console.log('err', err);
  }
});
