(function () {
  const castVoteForm = document.getElementById('form-cast-vote');
  const castingButton = document.getElementById('submit-casting-vote');

  if (!castVoteForm || !castingButton) return;

  castVoteForm.addEventListener('submit', handleSubmitCastingVote);

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
