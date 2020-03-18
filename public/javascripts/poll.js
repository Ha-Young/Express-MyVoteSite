const deleteButton = document.querySelector('.deleteButton');
if (deleteButton) {
  console.log(deleteButton)
  deleteButton.addEventListener('click', async(e) => {
    e.preventDefault();
    const pollId = deleteButton.dataset.pollid;
    const url = `http://localhost:4000/votings/${pollId}`;
    try {
      const response = await fetch(url, {
        method: 'delete',
        body: JSON.stringify({ pollId }),
        headers: new Headers({
        'Content-Type': 'application/json',
        }),
      });
      
      if (response.ok) {
        return location.href = 'http://localhost:4000';
      }

      // throw Error(response.statusText);
    } catch(e) {
      console.log(e)
    }
  });
}

// const form = document.querySelector('.votForm');

// form.addEventListener('submit', async (e) => {
//   e.preventDefault();
//   const choice = document.querySelector('input:checked').value;

//   console.log(typeofform.dataset.answers);
//   const url = `http://localhost:4000/votings/${form.dataset.pollid}`;
//   const result = { value: choice };
  // try {
  //   console.log(222222222222222)
  //   fetch(url, {
  //     method: 'post',
  //     body: JSON.stringify(result),
  //     headers: new Headers({
  //       'Content-Type': 'application/json',
  //     }),
  //   }).then(res => {
  //     // location.href='/login';
  //   });
  // } catch(e) {
  //   console.log(e);
  // }
// });

