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
    const $modal = document.createElement("div");
    $modal.className = "modal";
    $modal.innerText = "투표가 종료됐어요 🤭";
    document.body.appendChild($modal);
    setTimeout(() => location.reload(), 1500);
    return;
  }

  const options = [];
  voteBoxes.forEach(option => {
    if (option.checked) options.push(option.name);
  });

  if (!options.length) {
    event.preventDefault();
    const $warningBox = document.createElement("div");
    $warningBox.className = "warning-box";
    $warningBox.innerText = "투표할 항목을 선택해주세요 🤏";

    $voteBtn.parentNode.insertBefore($warningBox, $voteBtn.nextSibling);
    setTimeout(() => {
      $voteBtn.parentNode.removeChild($warningBox);
    }, 1000);
    return;
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
  const $modal = document.createElement("div");
  $modal.className = "modal";
  $modal.innerText = message;
  document.body.appendChild($modal);
  setTimeout(() => {
    switch (result) {
      case "success":
      location.reload();

      break;
      case "fail":
        document.body.removeChild($modal);

        break;
      default:
        location.replace("/");
    }
  }, 1500);
});

if ($deleteBtn) {
  $deleteBtn.addEventListener("click", async () => {
      const response = await fetch(
        location.href,
        { method: "DELETE", redirect: "follow" },
      );

      if (response.ok) location.assign("/");
  });
}
