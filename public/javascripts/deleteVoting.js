const $deleteButton = document.querySelector(".voting-delete-btn");

if ($deleteButton) {
  $deleteButton.addEventListener("click", handleDeleteBtnClick);
}

async function handleDeleteBtnClick(e) {
  try {
    e.preventDefault();

    const originPath = window.location.origin;
    const votingPath = window.location.pathname;
    const totalPath = `${originPath}${votingPath}`;

    const rawResponse = await fetch(
      totalPath,
      { method: "DELETE",
        headers: { "Content-Type": "application/json" }
      }
    );
    const content = await rawResponse.json();

    if (content.result === "voting deleted") {
      window.location.href = "/";
    }
  } catch (error) {
    console.warn(error);
  }
}
