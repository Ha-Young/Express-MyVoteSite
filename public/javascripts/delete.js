const deleteForm = document.querySelector(".voting-delete-form");
const votingContent = document.querySelector(".voting-content");
const votingField = document.querySelector(".voting-field");

async function requestDeleteVoting(ev) {
  ev.preventDefault();

  const { baseURI } = ev.target;

  try {
    const response = await fetch(baseURI, { method: "DELETE" });
    const { user } = await response.json();
    
    const message = document.createElement("div");
    message.textContent = `${user}의 투표가 삭제되었습니다.`;

    votingField.removeChild(votingContent);
    votingField.appendChild(message);
  } catch (error) {
    console.error(error);
  }
}

deleteForm?.addEventListener("submit", requestDeleteVoting);
