const $voteForm = document.getElementById("vote-form");
const $voteBoxes = document.getElementsByClassName("vote-box");
const $voteBtn = document.getElementById("vote-submit");
const $expire = document.getElementById("expire-date");

const voteBoxes = [...$voteBoxes];
const expireAt = Date.parse($expire.dataset.expire);

$voteForm.addEventListener("input", (event) => {
  voteBoxes.forEach(voteBox => {
    const isDuplicated
      = voteBox.name !== event.target.name
      && voteBox.checked;

    if (isDuplicated) voteBox.checked = false;
  })
});

$voteBtn.addEventListener("click", (event) => {
  if (expireAt <= Date.now()) {
    event.preventDefault();
    return window.location.reload();
  }

  const isVoted = voteBoxes.some((voteBox) => voteBox.checked);

  if (!isVoted) {
    event.preventDefault();
    alert("선택해야 투표할 수 있어요!");
  }
});

