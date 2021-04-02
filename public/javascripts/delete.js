const deleteForm = document.querySelector(".voting-delete-form");
const votingMiniBoard = document.querySelector(".voting-detail-board-mini");
const votingBoard = document.querySelector(".voting-detail-board");

async function requestDeleteVoting(ev) {
  ev.preventDefault();

  const { baseURI } = ev.target;

  try {
    const response = await fetch(baseURI, { method: "DELETE" });
    const { user } = await response.json();
    
    const message = document.createElement("div");
    message.textContent = `${user}의 투표가 삭제되었습니다.`;

    votingBoard.removeChild(votingMiniBoard);
    votingBoard.appendChild(message);
  } catch (error) {
    console.error(error);
  }
}

deleteForm.addEventListener("submit", requestDeleteVoting);
