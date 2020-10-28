
const deleteButton = document.querySelector('.deleteButton');

deleteButton.addEventListener('click', async event => {
  const { id } = event.target;
  try {
    await fetch(`http://localhost:3000/votings/${id}`, {
      method: 'DELETE'
    });

    location.assign('http://localhost:3000/');
  } catch (err) {
    console.error(err);
  }
});


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
    await fetch(`http://localhost:3000/votings/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    location.assign('http://localhost:3000/');
  } catch (err) {
    console.error(err);
  }

});
