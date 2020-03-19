const deleteButton = document.querySelector('.deleteButton');
if (deleteButton) {
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
    
      throw new Error()
    } catch(e) {
      location.href = 'http://localhost:4000/error';
    }
  });
}
