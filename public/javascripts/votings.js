const $voteBoxContainer = document.getElementById("vote-box-container");
const $voteBoxes = document.getElementsByClassName("vote-box");
const $voteBtn = document.getElementById("vote-submit");
const $expire = document.getElementById("expire-date");
const $deleteBtn = document.getElementById("delete-vote");
const $queryVoter = document.getElementById("query-voter");

const voteBoxes = [...$voteBoxes];
const expireAt = Date.parse($expire.dataset.expire);

document.cookie = "";

$voteBoxContainer.addEventListener("input", async (event) => {
  if (!$queryVoter) {
    document.cookie = `lastHref=${location.href}; path=/`;
    return location.replace("/login");
  }
  voteBoxes.forEach(voteBox => {
    const isDuplicated
      = voteBox.name !== event.target.name
      && voteBox.checked;

    if (isDuplicated) voteBox.checked = false;
  })
});

$voteBtn.addEventListener("click", async (event) => {
  if (expireAt <= Date.now()) {
    event.preventDefault();
    alert("투표가 종료됐어요 😥");
    return window.location.reload();
  }

  const options = [];
  voteBoxes.forEach(option => {
    if (option.checked) options.push(option.name);
  });

  if (!options.length) {
    event.preventDefault();
    return alert("선택해야 투표할 수 있어요!");
  }

  const response = await fetch(
    location.href,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(options),
    },
  );
  const { result, message } = await response.json();

  alert(message);

  if (result === "success") location.reload();

});

if ($deleteBtn) {
  $deleteBtn.addEventListener("click", async () => {
    if (confirm("정말 투표를 삭제 하실건가요? 🤔")) {

      const response = await fetch(
        location.href,
        { method: "DELETE", redirect: "follow" },
      );

      if (response.ok) location.replace("/");
    }

  });
}