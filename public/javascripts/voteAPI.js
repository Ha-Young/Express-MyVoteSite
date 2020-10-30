(function () {
  const castVoteForm = document.getElementById('form-cast-vote');
  const castingButton = document.getElementById('submit-casting-vote');
  const deleteButton = document.getElementById('submit-delete-vote');

  if (deleteButton) {
    deleteButton.addEventListener('click', handleDeleteVote);
  }

  if (!castVoteForm || !castingButton) return;
  castVoteForm.addEventListener('submit', handleSubmitCastingVote);

  function handleDeleteVote({ target }) {
    const targetRoute = '/votings/delete';
    let targetURI = target.baseURI.split('/votings');
    targetURI = targetURI[0] + targetRoute + targetURI[1];

    fetch(targetURI, {
      method: 'DELETE'
    })
      .then((res) => {
        window.location.replace('/');
      })
      .catch((err) => {
        window.location.replace('/');
      });
  }

  function handleSubmitCastingVote(e) {
    e.preventDefault();

    const { target } = e;
    const targetURI = castingButton.formAction;
    const list = Array.from(target);
    let selectedItem;

    list.pop();
    list.forEach((item) => {
      if (item.checked) selectedItem = { item: item.value };
    });

    fetch(targetURI, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(selectedItem)
    })
      .then((res) => {
        console.log(res);
        if (res.redirected) {
          window.location.replace(res.url);
        } else {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
})();
