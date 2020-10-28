const votingButton = document.querySelector('.votingButton');

votingButton.addEventListener('click', async () => {
  const { id } = event.target;
  const optionInput = document.getElementsByName('option');
  let data = {};

  for (let i = 0; i < optionInput.length; i++) {
    if(optionInput[i].checked) {
      data.option = optionInput[i].value;
    }
  }

  try {
    const response = await fetch(`http://localhost:3000/votings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();

  } catch (err) {
    console.error(err);
  }
});
